const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
	
const itemSchema = new mongoose.Schema({
    listID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'shoppingList', 
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
    }, 
    category: {
        type: String,
        enum: ['Home & Living 🏠', 'Food 🍔', 'Clothing 🧦', 'other'],
        default: 'Food',
        required: true
    }
});

const today = new Date();

// Calculate the date for the day before today
const dayBeforeToday = new Date(today);
dayBeforeToday.setDate(today.getDate() - 1);

const shoppingListSchema = new mongoose.Schema({
    listName: {
        type: String, 
        required: true 
    }, 
    dueDate: {
    type: Date,
    default: today,
    min: dayBeforeToday
    },
    location: {
        type: String,
        enum: ['Harris Teeter', 'Walmart', 'Target', 'Trader Joe\'s', 'Aldi', 'Lidl', 'World Market', 'Patel Brothers', 'other'],
        default: 'Lidl'
    },
    
    items: [itemSchema]
    }, );


// module.exports = mongoose.model('ShoppingList', shoppingListSchema)
module.exports = {
    List : mongoose.model('shoppingList', shoppingListSchema),
    Item : mongoose.model('item', itemSchema)
    }