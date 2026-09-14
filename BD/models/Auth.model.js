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
    }
})

const Auth = mongoose.model("Auth", AuthSchema);
module.exports = Auth;