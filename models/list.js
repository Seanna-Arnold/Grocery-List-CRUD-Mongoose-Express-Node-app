const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
	
const shoppingListSchema = new mongoose.Schema({
    listName: {
        type: String, 
        required: true 
    },

    category: {
        type: String,
        required: true
    }
});

// Define ListItem schema
const listItemSchema = new mongoose.Schema({
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

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);



module.exports = {
    ShoppingList,
    
};