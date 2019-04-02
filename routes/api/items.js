const express = require("express");
// create a router var & set it to express.Router() [ router is part of the express obj]
const router = express.Router();

// now need to bring our item model because we need  that to make query to find/save/update

//Item Model
const Item = require("../../model/Item");

// CREATE ROUTES

//@route GET api/items
// @desc GET all items
//@ access Public

router.get("/", (req, res) => {
  //fetch all items from the DB

  // Take the model and use the find method (->return a promise)
  Item.find()
    // we can sort  with mongoose - want to sort by date -1 = desc
    .sort({ date: -1 })
    // give the items fetch from the DB and then what we want to do with those items=>
    .then(items =>
      // this is a json api
      res.json(items)
    )
    .catch();
});

//@route  GET  api/items/:id
// @desc GET one item all items
//@ access Public

router.get("/:id", (req, res) => {
  //fetch all items from the DB

  // Take the model and use the find method (->return a promise)
  Item.findById(req.params.id)

    // give the items fetch from the DB and then what we want to do with those items=>
    .then(item =>
      // this is a json api
      res.json(item)
    )
    .catch();
});

//@route POST api/items
// @desc  create POST /an item
//@ access Public

router.post("/", (req, res) => {
  // Construct an obj to insert into the DB
  //Create const newItem & set it = to new Item() because Item is the name of our model

  //pass in an obj - all we need is the name -
  //the name is coming from the request - come in from the body of the request - we get that with [req.body.name]
  // using the bodyParser allows us to do this.
  //Date is automatically inserted

  const newItem = new Item({
    name: req.body.name
  });

  // once we have this const newItem set to a new item object
  // we can take that newItem var and  call .save() to save it to the DB
  // .save() =>promise based as well
  newItem
    .save()

    // give the item we are saving - fetch from the DB and then what we want to do with this item=> //

    .then(item => res.json(item))
    .catch();
});

//@route UPDATE api/items/:id
// @desc  update an item
//@ access Public

// placeholder :id for whatever we pass as an id
router.put("/:id", (req, res) => {
  //To update an item from the DB - need an unique ID
  //Get it from the url by passing req.params.id - this will actually fetch from the URI
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // .findById() then give a promise back

    //Give the actual item we are searching for from the DB  - no update yet - then what we want to do => is to update this item

    .then(item => res.json({ success: true }))

    // if pass id that does not exist it should get a promise reject
    .catch(err => res.status(404).json({ success: false }));
});

//@route DELETE api/items/:id
// @desc  delete  an item
//@ access Public

// placeholder :id for whatever we pass as an id
router.delete("/:id", (req, res) => {
  //To delete an item from the DB - need an unique ID
  //Get it from the url by passing req.params.id - this will actually fetch from the URI
  Item.findById(req.params.id)
    // .findById() then give a promise back

    //Give the actual item we are searching for from the DB  - no delete yet - then what we want to do => is to remove this item

    .then(item =>
      item
        .remove()
        // give a promise
        .then(() => res.json({ success: true }))
    )

    // if pass id that does not exist it should get a promise reject
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
