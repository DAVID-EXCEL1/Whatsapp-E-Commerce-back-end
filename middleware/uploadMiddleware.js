const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const safeName = file.originalname.replace(/\s+/g, "-");
        cb(null, Date.now() + "-" + safeName);
    },
});

const upload = multer({ storage });

module.exports = upload;