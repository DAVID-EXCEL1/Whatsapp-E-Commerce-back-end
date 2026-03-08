const Admin = require("../models/adminModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(400).json({ message: "Admin not found" })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        console.log(token);
        

        res.json({
            message: "Login successful",
            token
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { loginAdmin }