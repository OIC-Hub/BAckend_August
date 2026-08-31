const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.get("/home", (req, res) => {
    res.send("Hello world")
})

app.get("/about", (req, res) => {
    res.send("About page")
})

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
} )