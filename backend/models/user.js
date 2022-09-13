const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
 
    createdat: {
        type: Date,
        default: Date.now
    }
})

const user = mongoose.model("user", UserModel);
module.exports = user;