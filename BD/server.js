const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.route")
const productRoute = require("./routes/product.route")
const AuthRoute = require('./routes/auth.route')
const connectDB = require("./config/db")
const morgan = require("morgan")

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json())
app.use(morgan("dev"))

app.use("/", userRoute);
app.use("/", productRoute);
app.use('/', AuthRoute)

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