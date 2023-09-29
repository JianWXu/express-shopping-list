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
  try {
    if (!req.body) {
      throw new ExpressError("Please enter a shopping list item", 400);
      const newItem = { name: req.body.name, price: req.body.price };
      items.push(newItem);
      res.status(201).json(newItem);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:name", function (req, res) {
  if (!req.body) {
    throw new ExpressError("Please enter a shopping list item", 400);
    const item = items.find((i) => (i.name = req.params.name));
    item.name = req.body.name;
    item.price = req.body.price;
    res.status(200).json(item);
  }
});

router.delete("/:name", function (req, res) {
  if (!items[req.params.name]) {
    throw new ExpressError("Please enter a valid shopping list item", 404);
    const item = items.findIndex((i) => (i.name = req.params.name));
    items.splice(item, 1);
    res.json({ message: "deleted" });
  }
});

module.exports = router;
