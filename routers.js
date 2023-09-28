const express = require("express");
const router = new express.Router();

const items = require("./fakeDB");

// route for getting json of all shopping list items:

router.get("/", function (req, res) {
  return res.json(items);
});

// route for getting json of the shopping list item in param:

router.get("/:name", function (req, res) {
  let item = items.find((i) => i.name === req.params.name);
  return res.json(item);
});

module.exports = router;
