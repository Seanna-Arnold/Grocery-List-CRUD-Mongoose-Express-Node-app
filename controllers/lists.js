const List = require('../models/list')
const Item = require('../models/item')

module.exports = {
    create,
    index,
    show,
    // new: newList,
    new: addItem
}


async function index(req, res) {
    const lists = await List.ShoppingList.find({})
    console.log(lists)
    res.render('lists/index', { title: 'All lists', lists })
}

async function show(req, res) {
    const list = await List.findById(req.params.id).populate('index')
    res.render('lists/new', {list, title: 'List'})
  }

// function newList(req, res) {
//     res.render('lists/new', {
//         title: 'Add List',
//         errorMsg: ''
//     })
// }

function addItem(req, res) {
  res.render('/lists/new', {
      title: 'Add List',
      errorMsg: ''
  })
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
      console.log(req.body)
    try {
      await List.create(req.body);
      res.redirect('/lists');
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render('lists/index', { errorMsg: err.message });
    }
  }



  