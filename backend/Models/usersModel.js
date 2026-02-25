const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
       // unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    }
},{timestamps:true})

userSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model('user', userSchema);