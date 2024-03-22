const { List } = require('../models/list')

module.exports = {
  new: newList,
  create,
  index,
  show,
  deleteList,
  update,

}

async function show(req, res) {
  const list = await List.findById(req.params.id)
  console.log(list)
  res.render('lists/show', {
    title: 'List Details',
    list
  })
}

async function index(req, res) {
  const lists = await List.find({})
  res.render('lists/index', { title: 'All Lists', lists })
}

function newList(req, res) {
  res.render('lists/new', {
    title: 'Add List',
    errorMsg: ''
  })
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const list = await List.create(req.body);
    res.redirect(`/lists/${list._id}`);
  } catch (err) {
    console.log(err);
    res.render('lists/new', { errorMsg: err.message });
  }
}

async function deleteList(req, res) {
  console.log('deleting')
  try {
    const list = await List.findById(req.params.id);
    req.body.listID = req.params.id
    if (!list) return res.redirect("/lists"); // Redirect to the list if the list is not found

    await list.deleteOne(); // Delete the list

    res.redirect("/lists"); // Redirect to the list or any appropriate page
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}



async function update(req, res) {

  const list = await List.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/lists/${list._id}`);
}
