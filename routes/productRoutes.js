const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")
const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware")

// Add product
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        // console.log("BODY:", req.body);
        // console.log("FILE:", req.file);

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            stock: req.body.stock,
            image: req.file ? req.file.path : ""
        });

        console.log("IMAGE TO SAVE:", product.image);

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.log("UPLOAD ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});
// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete product

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.description = req.body.description || product.description;
        product.category = req.body.category || product.category;
        product.stock = req.body.stock || product.stock;
        product.image = req.file ? req.file.path : product.image;

        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router