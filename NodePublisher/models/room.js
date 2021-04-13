const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: Number
    },
     available: {
         type: Boolean,
         default: true
     },
    reservertionName: {type: String}
})

module.exports = mongoose.model('Room', roomSchema);