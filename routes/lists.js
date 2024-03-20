var express = require('express');
var router = express.Router();
var listsCtrl = require('../controllers/lists')
/* GET users listing. */

router.get('/new', listsCtrl.new)

router.get('/:id', listsCtrl.show)

router.get('/', listsCtrl.index)

router.post('/', listsCtrl.create)

router.delete('/:id', listsCtrl.deleteList)

router.put('/:id', listsCtrl.update)

module.exports = router;