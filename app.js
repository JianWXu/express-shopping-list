const express = require("express");
const ExpressError = require("./expressErrors");
const router = require("./routers");

const app = express();
const items = require("./fakeDB");
const e = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// directory for get /item routers
app.use("/items", router);

// directory for post /items
app.post("/items", function (req, res, next) {
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

app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return notFoundError;
});

app.use(function (error, req, res, next) {
  let status = error.status || 500;
  let message = error.message;

  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
