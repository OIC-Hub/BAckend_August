const express = require("express");
const route = express.Router();
const {register, login, getProfile} = require("../controller/auth.controller");
const isAuthenticated = require("../middleware/auth");

route.post("/register", register)
route.post("/login", login)
route.get("/profile", isAuthenticated, getProfile )


module.exports = route