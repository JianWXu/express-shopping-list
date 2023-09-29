const express = require("express");
const ExpressError = require("./expressErrors");
const router = require("./routers");

const app = express();
const items = require("./fakeDB");

app.use(express.json());

// directory for /item routers
app.use("/items", router);

// 404 handler

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

app.use(function (error, req, res, next) {
  let status = error.status || 500;
  let message = error.message;

  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
