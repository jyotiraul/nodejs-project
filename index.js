// index.js
console.log("Starting server...");
const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database (for simplicity)
let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Build a project", completed: false },
];

// Routes

// Get all to-dos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add a new to-do
app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  const newTodo = { id: todos.length + 1, task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a to-do
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completed } = req.body;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (task !== undefined) todo.task = task;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// Delete a to-do
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos.splice(index, 1);
  res.status(204).send(); // No content
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
