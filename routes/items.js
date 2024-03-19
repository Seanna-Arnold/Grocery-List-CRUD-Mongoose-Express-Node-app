const express = require('express');
const router = express.Router();
// You Do - Require the yet to be created addTicket controller 
var addItemCtrl = require('../controllers/items')

// You Do - Define the Route below
router.get('/lists/index', addItemCtrl.new)

module.exports = router;