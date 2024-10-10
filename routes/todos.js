const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth"); // Import auth middleware

let todos = []; // In-memory storage for todos

// Apply the authentication middleware to all /todos routes
router.use(authenticateToken);

// GET all todo items
router.get("/", (req, res) => {
  res.json(todos);
});

// POST to create a new todo item
router.post("/", (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT to update a todo by id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed || todo.completed;
  res.json(todo);
});

// DELETE a todo by id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
