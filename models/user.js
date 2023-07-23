const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role:{
        type: String,
        default: "basic",
        required: true
    },
})

const User = Mongoose.model("user", UserSchema)
module.exports = User