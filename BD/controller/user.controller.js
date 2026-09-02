const Data = require("../models/User.model");

function addUser(req, res){
   try {
     const { name, email } = req.body;

    if(!name || !email){
      return  res.status(403).send("Name and Email is required")
    }

    const newData = {
        id: Data.length + 1,
        name: name,
        email: email
    };

    Data.push(newData);
    res.status(201).send("User created successfully")
   } catch (error) {
    console.error(error)
   }
}

function getUsers(req, res){
    res.status(200).json({message: "users fetched successfully", Data});
}

module.exports = {addUser, getUsers};