const Auth = require("../models/Auth.model");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("All details required");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new Auth({
      name: name,
      email: email,
      password: hashPassword,
    });

    newUser.save();

    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.error(error);
  }
}

async function login(req, res) {
 try {
     const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("All details required");
  }

//   const authUser = await Auth.find({email: email});

const authUser = await Auth.findOne({ email }).select("+password");


  if (!authUser) {
    return res.status(404).send("Invalid email");
  }

  const comparePassword = await bcrypt.compare(password, authUser.password);

  if (!comparePassword) {
    return res.status(404).send("Invalid password");
  }

  res.status(200).json({ message: "Login successfully" });
 } catch (error) {
    console.error(error)
 }
}

module.exports = {register, login};
