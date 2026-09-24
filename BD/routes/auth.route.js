const express = require("express");
const route = express.Router();
const {register, login, getProfile, uploadData} = require("../controller/auth.controller");
const isAuthenticated = require("../middleware/auth");
const uploadGuard = require("../middleware/uploadGuard");

route.post("/register", register)
route.post("/login", login)
route.get("/profile", isAuthenticated, getProfile )

route.post("/upload", isAuthenticated, uploadGuard.single("image"), uploadData)


module.exports = route