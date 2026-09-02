const express = require("express");
const route = express.Router();
const {addUser, getUsers} = require("../controller/user.controller")

route.post("/add", addUser)
route.get("/get", getUsers)

module.exports = route