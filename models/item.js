
const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    listID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ShoppingList', 
        required: true 
    },
    itemName: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        default: 1 
    },
    completed: { 
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model('Item', itemSchema)