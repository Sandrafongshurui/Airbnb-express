const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,           
    },
    password: {
        type: String,
        required: true
    },
    about_me: {
        type: String,
        required: true,
        default: "-"
    },
    image: {
        type: String,
        default: "-"
    }

},
{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User