const Auth = require("../models/Auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/mail");

const dotenv = require("dotenv");
dotenv.config();

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

    sendEmail({
      to: email,
      subject: "New Account created",
      html: "<h1>Welcome to my platform </h1>",
    });
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

    const secret = process.env.JWT_SECRET;
    const userID = { id: authUser._id };
    const token = jwt.sign(userID, secret, { expiresIn: "7d" });

    sendEmail({
      to: email,
      subject: "Login Notification",
      html: "<h1>Welcome back </h1>",
    });
    res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    console.error(error);
  }
}

async function getProfile(req, res) {
  try {
    const user = req.user._id;
    const findProfile = await Auth.findById(user).select("-password");

    if (!findProfile) {
      return res.status(403).send("Unauthorized Sign In please");
    }

    res.status(200).json({ message: "user fetched successfully", findProfile });
  } catch (error) {
    console.error(error);
  }
}

async function uploadData(req, res) {
 try {
   const user = req.user._id;

   if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image file",
    });
  }

  const ImageUrl = req.file.path;

  console.log(ImageUrl)
  const findProfile = await Auth.findByIdAndUpdate(
    user,
    { image: ImageUrl },
    { new: true },
  );

  if (!findProfile) {
    return res.status(403).send("Unauthorized Sign In please");
  }

  return res.status(200).json({message: "Profile image uploaded successfully", data: {imageUrl: findProfile.ImageUrl}});
 } catch (error) {
  console.error(error)
 }

}

module.exports = { register, login, getProfile, uploadData };
