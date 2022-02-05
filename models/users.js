const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    role: {
        type: Number,
        required: false,
        default: 0,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
    },
    channels: []
});

const User = mongoose.model('User', userSchema);
module.exports = User;
