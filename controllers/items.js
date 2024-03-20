const {List, Item} = require('../models/list');

module.exports = {
  create,
  deleteItem
};

async function create(req, res) {
  const list = await List.findById(req.params.id);
    req.body.completed = !!req.body.completed;
    //We can push (or unshift) subdocs into Mongoose arrays
    req.body.listID = req.params.id
    list.items.push(req.body);
    try {
      // Save any changes made to the list doc
      await list.save();
    } catch (err) {
      console.log(err);
    }
    // Step 5:  Respond to the Request (redirect if data has been changed)
    res.redirect(`/lists/${list._id}`);
  }

  async function deleteItem(req, res) {
    console.log(req.params.id)
    try {
        const item = await Item.findById(req.params.id);
        // const item = await Item.find();
        console.log(item)
        if (!item) return res.redirect("/lists"); // Redirect to the item of items if the item is not found
    
        await item.deleteOne(); // Delete the item
    
        res.redirect("/lists"); // Redirect to the list of lists or any appropriate page
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}