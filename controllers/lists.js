const {List} = require('../models/list')

module.exports = {
    new: newList,
    create,
    index,
    show,
    deleteList,
    update
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
    // convert nowShowing's checkbox of nothing or "on" to boolean
    // req.body.completed = !!req.body.completed;
    // if (req.body.completed) req.body.completed = req.body.completed.split(/\s*,\s*/);
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
    try {
     const list = await List.create(req.body);
      res.redirect(`/lists/${list._id}`);
      // res.redirect(`/lists/new`);
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render('lists/new', { errorMsg: err.message });
    }
  }
 
  async function deleteList(req, res) {
    console.log('deleting')
    try {
        const list = await List.findById(req.params.id);
        req.body.listID = req.params.id
        if (!list) return res.redirect("/lists"); // Redirect to the list of lists if the list is not found
    
        await list.deleteOne(); // Delete the list
    
        res.redirect("/lists"); // Redirect to the list of lists or any appropriate page
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

async function update(req, res) {
  try {
    const list = await List.findByIdAndUpdate(
      {_id: req.params.id},
      // update object with updated properties
      req.body,
      // options object {new: true} returns updated doc
      {new: true}
    );
    await list.save()
    return res.redirect(`/lists/${list._id}`);
  } catch (e) {
    console.log(e.message);
    return res.redirect('/lists');
  }
}