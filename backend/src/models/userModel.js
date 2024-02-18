const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            trim: true,
            required: true,
        },
        fullName: {
            type: String,
            trim: true,
            default: 'Full Name',
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
