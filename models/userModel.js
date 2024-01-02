const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    
    password:{
        required: true,
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('users', dataSchema);
