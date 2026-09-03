const Data = require("../models/User.model");

function addUser(req, res){
   try {
     const { name, email } = req.body;

    if(!name || !email){
      return res.status(403).send("Name and Email is required")
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

function getOneUser(req, res){
 try {
   const {id} = req.params

  if(isNaN(id)){
   return res.status(400).send("Invalid ID")
  }

  const findOneUser = Data.find(e => e.id === Number(id));

  if(!findOneUser){
   return res.status(404).send("User not Found")
  }

  res.status(200).json({message: "user fetched successfully", findOneUser})
 } catch (error) {
  console.error(error)
 }
}

function updateUser(req, res){
 try {
   const {id} = req.params
  const {name} = req.body

   if(isNaN(id)){
   return res.status(400).send("Invalid ID")
  }

  const findAndUpdate = Data.find(e => e.id === Number(id));

 if(!findAndUpdate){
   return res.status(404).send("User not Found")
  }

  if(!name){
    return res.status(400).send("Name is required")
  }

 findAndUpdate.name = name;

res.status(200).json({message: "user updated successfully", findAndUpdate})
 } catch (error) {
  console.error(error)
 }

}

function removeUser(req, res) {
 try {
   const {id } = req.params

    if(isNaN(id)){
   return res.status(400).send("Invalid ID")
  }

  Data.filter(e => e.id !== Number(id))

  res.status(200).send("User deleted successfully")
 } catch (error) {
  console.error(error)
 }
}

module.exports = {addUser, getUsers, getOneUser, updateUser, removeUser};