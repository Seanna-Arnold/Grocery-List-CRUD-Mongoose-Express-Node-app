const {List, Item} = require('../models/list');

module.exports = {
  create,
  deleteItem
};

async function create(req, res) {
  const list = await List.findById(req.params.id);
    req.body.completed = !!req.body.completed;

    req.body.listID = req.params.id
    list.items.push(req.body);
    try {
      // Save any changes made to the list doc
      await list.save();
    } catch (err) {
      console.log(err);
    }
    
    res.redirect(`/lists/${list._id}`);
  }

  async function deleteItem(req, res) {
    try {
        const list = await List.findOne({'items._id': req.params.id});
        list.items.remove(req.params.id)
        await list.save()
        res.redirect(`/lists/${list._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error:");
    }
}