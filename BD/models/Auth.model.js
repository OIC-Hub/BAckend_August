const mongoose = require("mongoose")


const AuthSchema = new mongoose.Schema({
    name: {
        type: String
    },

    email:{
        type: String
    },

    password: {
        type: String
    },

    image: {
        type: String
    }
})

const Auth = mongoose.model("Auth", AuthSchema);
module.exports = Auth;