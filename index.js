const express = require("express")
const app = express()
const mongoose = require("mongoose")
const adminRoutes = require("./routes/adminRoutes")
const productRoutes = require("./routes/productRoutes")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const port = 3000 || process.env.PORT
const URI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

mongoose.connect(URI)
.then(() => {
    console.log("MongoDB connected")
})
    .catch((err) => {
        console.log(err)
    })


app.use("/api/admin", adminRoutes)
app.use("/api/products", productRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})