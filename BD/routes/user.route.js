const express = require("express");
const route = express.Router();
const {addUser, getUsers, getOneUser, updateUser, removeUser} = require("../controller/user.controller")

route.post("/add", addUser)
route.get("/get", getUsers)
route.get("/user/:id", getOneUser )
route.put("/user/:id", updateUser )
route.delete("/delete/:id", removeUser)


module.exports = route