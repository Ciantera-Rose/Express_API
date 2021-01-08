const express = require("express");
const router = express.Router();

const Todos = require("../models/todoModel");

// GET
router.get("/todos", (req, res) => {
  Todos.find((err, todos) => {
    if (err) {
      res
        .status(404)
        .json({ message: "Todo not found error", error: `${err}` });
    } else {
      res.status(200).json(todos);
    }
  });
  //console.log(req);
  //res.end();
});

// POST

router.post("/todo", (req, res) => {
  const todo = new Todos(req.body);

  todo
    .save()
    .then((todo) => {
      const { _id, title, done } = todo;
      res.status(200).json({ id: _id, title, done });
    })
    .catch((err) => {
      res.status(400).json({ message: "unable to post", errors: `${err}` });
    });
});

module.exports = router;
