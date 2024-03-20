const express = require('express');
const router = express.Router();
// You Do - Require the yet to be created addTicket controller 
var addItemCtrl = require('../controllers/items')

// You Do - Define the Route below
router.post('/lists/:id/items', addItemCtrl.create)

router.delete('/items/:id', addItemCtrl.deleteItem)

module.exports = router;