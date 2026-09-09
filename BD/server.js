const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.route")
const productRoute = require("./routes/product.route")

const connectDB = require("./config/db")
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json())
app.use("/", userRoute);
app.use("/", productRoute);

// app.get("/home", (req, res) => {
//     res.send("Hello world")
// })

// app.get("/about", (req, res) => {
//     res.send("About page")
// })

connectDB();

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
} )