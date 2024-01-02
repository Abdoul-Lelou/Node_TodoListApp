const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({

    textTodo: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model('todo', dataSchema);
