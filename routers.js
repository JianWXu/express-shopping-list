const express = require("express");
const router = new express.Router();
const items = require("./fakeDB");
const ExpressError = require("./expressErrors");

// route for getting json of all shopping list items:

router.get("/", function (req, res) {
  return res.json(items);
});

// route for getting json of the shopping list item in param:

router.get("/:name", function (req, res) {
  let item = items.find((i) => i.name === req.params.name);
  return res.json(item);
});

router.post("/", function (req, res) {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  return res.status(201).json(newItem);
});

router.patch("/:name", function (req, res) {
  const item = items.find((i) => i.name === req.params.name);
  if (item === undefined) {
    throw new ExpressError("Please enter a valid shopping list item", 404);
  }
  item.name = req.body.name;
  item.price = req.body.price;
  return res.status(200).json(item);
});

router.delete("/:name", function (req, res) {
  const item = items.findIndex((i) => i.name === req.params.name);
  if (item === -1) {
    throw new ExpressError("Please enter a valid shopping list item", 404);
  }

  items.splice(item, 1);
  return res.json({ message: "deleted" });
});

module.exports = router;
