const multer  = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Tell Multer to store files in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hospital-app",   // folder name inside your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    // ↑ resize images to max 500x500 before storing — saves space
  },
});

// Create the Multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // max file size: 2MB
  },
});

module.exports = upload;