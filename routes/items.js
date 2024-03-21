const express = require('express');
const router = express.Router();
var addItemCtrl = require('../controllers/items')

router.post('/lists/:id/items', addItemCtrl.create)

router.delete('/items/:id', addItemCtrl.deleteItem)

module.exports = router;