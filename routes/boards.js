const express = require('express');
const router = express.Router();
// You Do - Require the yet to be created addTicket controller 
var addTicketCtrl = require('../controllers/boards')

// You Do - Define the Route below
router.get('/lists/new', addTicketCtrl.create)

module.exports = router;