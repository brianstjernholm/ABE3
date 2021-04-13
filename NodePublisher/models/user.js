const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
     password: {
         type: String,
         required: true
     },
    // firstName: {
    //     type: String,
    //     required: true
    // },
    // lastname: {
    //     type: String,
    //     required: true
    //},
    role: {
        type: String,
        default: 'basic',
        required: true
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User;