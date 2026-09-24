# Cloudinary — Uploading Files from Node.js + Express

---

## 1. What is Cloudinary?

**Cloudinary** is a cloud service that stores your images and files permanently and serves them to users anywhere in the world through a fast CDN (Content Delivery Network).

### Real Life Analogy ☁️
Think of Cloudinary like **Google Drive for your app's images**.

> Instead of saving a profile picture on your own server (which gets wiped when the server restarts), you upload it to Cloudinary. Cloudinary stores it permanently and gives you back a URL — like `https://res.cloudinary.com/your-cloud/image/upload/v1/avatar.jpg`. You save that URL to MongoDB and use it whenever you need to show the image.

Your server never holds the file. It receives it, hands it to Cloudinary, gets the URL back, and stores just the URL.

---

## 2. Why Not Just Save Files on Your Server?

This is the question every beginner asks. Here is why server storage is a bad idea in production:

```
Problem 1 — Files disappear on redeploy
  Render, Railway, and most cloud hosts reset the filesystem
  on every deployment. All uploaded files are wiped.

Problem 2 — Storage fills up fast
  Images and videos are large. Your server disk is small and shared.

Problem 3 — Slow delivery
  Your server is in one location. A user in Abuja downloading
  a file from a server in the US is slow. Cloudinary's CDN
  serves from the closest location to the user.

Problem 4 — No image processing
  Cloudinary can resize, crop, compress, and convert images
  automatically. Your server cannot.
```

**Cloudinary solves all four problems at once.**

---

## 3. How the Upload Flow Works

```
User selects a file
      ↓
Client sends it to your Express route
      ↓
Multer receives the file from the request
      ↓
multer-storage-cloudinary sends it to Cloudinary
      ↓
Cloudinary stores it and returns a URL
      ↓
Your controller saves the URL to MongoDB
      ↓
Response sent back to the client with the URL
```

You never write the file to disk. It goes straight from the request to Cloudinary.

---

## 4. Packages You Need

```bash
npm install multer cloudinary multer-storage-cloudinary
```

| Package | What it does |
|---|---|
| `multer` | Reads the file from the incoming request |
| `cloudinary` | Connects to your Cloudinary account |
| `multer-storage-cloudinary` | Tells Multer to send files to Cloudinary instead of local disk |

---

## 5. Cloudinary Account Setup

### Step 1 — Create a Free Account

Go to [cloudinary.com](https://cloudinary.com) and sign up. The free tier gives you **25GB storage** and **25GB bandwidth per month** — more than enough for learning and small projects.

### Step 2 — Get Your Credentials

After signing in, go to your **Dashboard**. You will see three values you need:

```
Cloud Name    → your unique identifier e.g. "dxyz123abc"
API Key       → a long number e.g. "874561239874"
API Secret    → a secret string e.g. "aBcDeFgHiJkLmN"
```

### Step 3 — Add to `.env`

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ Your API Secret is like a password. Never hardcode it. Never commit it to GitHub. Always keep it in `.env`.

---

## 6. Project Structure

```
project/
├── config/
│   └── cloudinary.js        ← Cloudinary configuration
├── middleware/
│   └── uploadMiddleware.js  ← Multer + Cloudinary storage setup
├── controllers/
│   └── uploadController.js  ← handles the upload route logic
├── routes/
│   └── uploadRoutes.js
├── .env
└── server.js
```

---

## 7. Configure Cloudinary

Create the Cloudinary config file. This connects your app to your Cloudinary account using your credentials from `.env`.

```js
// config/cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
```

You import this file anywhere you need to work with Cloudinary directly.

---

## 8. Set Up the Upload Middleware

This is where Multer and Cloudinary connect. `multer-storage-cloudinary` creates a custom Multer storage engine that sends files directly to Cloudinary instead of saving them locally.

```js
// middleware/uploadMiddleware.js
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
```

### Breaking Down the Options

| Option | What it does |
|---|---|
| `folder` | Where the file is stored inside Cloudinary — creates the folder if it doesn't exist |
| `allowed_formats` | Only accept these file types — rejects everything else |
| `transformation` | Automatically resize/crop the image on Cloudinary before saving |
| `fileSize` | Reject files larger than 2MB before they even reach Cloudinary |

---

## 9. Using the Middleware in a Route

`upload` is a middleware function. You add it directly to the route, between the path and the controller. It processes the file before your controller runs.

```js
// routes/uploadRoutes.js
const express = require("express");
const upload  = require("../middleware/uploadMiddleware");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

// upload.single("image") → expects one file with the field name "image"
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
```

### `upload.single()` vs `upload.array()` vs `upload.fields()`

| Method | When to use |
|---|---|
| `upload.single("fieldName")` | Upload exactly one file |
| `upload.array("fieldName", maxCount)` | Upload multiple files, same field |
| `upload.fields([...])` | Upload files from different fields at once |

For most cases — profile pictures, event images, doctor photos — you will use `upload.single()`.

---

## 10. Accessing the Uploaded File in Your Controller

After Multer + Cloudinary process the file, the result is available on `req.file`. The URL you need is at `req.file.path`.

```js
// controllers/uploadController.js
const asyncHandler = require("../utils/asyncHandler");

const uploadImage = asyncHandler(async (req, res) => {
  // If no file was sent
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image file",
    });
  }

  // req.file.path → the Cloudinary URL of the uploaded image
  const imageUrl = req.file.path;

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    url: imageUrl,
  });
});

module.exports = { uploadImage };
```

### What `req.file` Contains After Upload

```js
req.file = {
  fieldname:  "image",
  originalname: "photo.jpg",
  mimetype:   "image/jpeg",
  path:       "https://res.cloudinary.com/your-cloud/image/upload/v1234567/hospital-app/abc123.jpg",
  filename:   "hospital-app/abc123",
  size:       204800,
}
```

The one you care about most is `req.file.path` — that is the permanent Cloudinary URL you save to MongoDB.

---

## 11. Real Example — Doctor Profile Picture Upload

Here is a complete, realistic example — uploading a doctor's profile image and saving the URL to MongoDB.

```js
// controllers/doctorController.js
const Doctor       = require("../models/Doctor");
const AppError     = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// PUT /api/doctors/:id/photo
const uploadDoctorPhoto = asyncHandler(async (req, res, next) => {
  // 1. Check a file was actually sent
  if (!req.file) {
    return next(new AppError("Please upload an image", 400));
  }

  // 2. Find the doctor
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return next(new AppError("Doctor not found", 404));

  // 3. Save the Cloudinary URL to MongoDB
  doctor.image = req.file.path;
  await doctor.save();

  res.json({
    success: true,
    message: "Profile photo updated",
    image: doctor.image,
  });
});

module.exports = { uploadDoctorPhoto };
```

Route:

```js
// In doctorRoutes.js
const upload = require("../middleware/uploadMiddleware");
const { uploadDoctorPhoto } = require("../controllers/doctorController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.put(
  "/:id/photo",
  protect,
  restrictTo("admin", "doctor"),
  upload.single("image"),  // ← Multer + Cloudinary middleware runs here
  uploadDoctorPhoto        // ← then the controller runs with req.file ready
);
```

---

## 12. Testing in Postman

File uploads use `form-data` — not JSON. This is important.

```
Method:   PUT
URL:      http://localhost:3000/api/doctors/<doctor_id>/photo
Headers:  Authorization: Bearer <your_token>
          (DO NOT set Content-Type manually — Postman sets it automatically for form-data)

Body:
  → Select "form-data"
  → Add a key called "image"
  → Change the type from "Text" to "File" (hover over the key field)
  → Click "Select Files" and pick an image from your computer
```

Click Send. You should get back:

```json
{
  "success": true,
  "message": "Profile photo updated",
  "image": "https://res.cloudinary.com/your-cloud/image/upload/v1234567/hospital-app/abc123.jpg"
}
```

Open that URL in your browser — you will see your image served from Cloudinary.

---

## 13. Handling Upload Errors

Multer throws specific errors when something goes wrong — file too large, wrong format, etc. Handle them in your error middleware:

```js
// middleware/errorMiddleware.js
const multer = require("multer");

const errorHandler = (err, req, res, next) => {

  // File too large
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File is too large. Maximum size is 2MB.",
    });
  }

  // Wrong file format (thrown manually by Cloudinary storage)
  if (err.message && err.message.includes("format")) {
    return res.status(400).json({
      success: false,
      message: "Invalid file type. Only JPG, PNG, and WEBP are allowed.",
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;
```

---

## 14. Deleting Files from Cloudinary

When a user updates their photo, you should delete the old one from Cloudinary to avoid wasting storage. Use the `public_id` of the old image:

```js
const cloudinary = require("../config/cloudinary");

// The public_id is the filename without the extension
// e.g. URL: .../hospital-app/abc123.jpg → public_id: "hospital-app/abc123"

async function deleteFromCloudinary(imageUrl) {
  if (!imageUrl) return;

  // Extract public_id from the URL
  const parts    = imageUrl.split("/");
  const filename = parts[parts.length - 1]; // "abc123.jpg"
  const folder   = parts[parts.length - 2]; // "hospital-app"
  const publicId = `${folder}/${filename.split(".")[0]}`; // "hospital-app/abc123"

  await cloudinary.uploader.destroy(publicId);
}
```

Use it before saving a new image:

```js
// Before saving the new image URL, delete the old one
if (doctor.image) {
  await deleteFromCloudinary(doctor.image);
}

doctor.image = req.file.path;
await doctor.save();
```

---

## 15. Full `.env` Reference

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ✅ Checklist
- [ ] Created a free Cloudinary account and found the 3 credentials
- [ ] Added credentials to `.env` — never hardcoded
- [ ] Installed `multer`, `cloudinary`, and `multer-storage-cloudinary`
- [ ] Created `config/cloudinary.js` with `cloudinary.config()`
- [ ] Created `middleware/uploadMiddleware.js` with `CloudinaryStorage`
- [ ] Know the difference between `upload.single()`, `upload.array()`, `upload.fields()`
- [ ] Can access the uploaded file URL via `req.file.path`
- [ ] Saved the Cloudinary URL to MongoDB
- [ ] Tested the upload in Postman using `form-data`
- [ ] Added Multer error handling for file size and wrong format

## 💡 Practice Exercises

1. Add a profile picture upload to the patient registration flow — after a patient registers, they can upload a photo. Save the Cloudinary URL to the User model.
2. Build a `DELETE /api/doctors/:id/photo` route that removes the doctor's image from Cloudinary and sets `doctor.image` back to an empty string in MongoDB.
3. Update the doctor upload route so that if the doctor already has an image, the old one is deleted from Cloudinary before the new one is saved.
4. **Bonus:** Add a file type check inside the `CloudinaryStorage` params — if someone tries to upload a PDF or video, reject it with a clear error message before it even reaches Cloudinary.
