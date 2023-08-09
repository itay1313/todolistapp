const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());

// Sample data
const todos = [
  {
    id: 1,
    title: "Sample Todo",
    description: "This is a sample todo item",
    completed: false
  },
  // Add more todos as needed
];

// Routes
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
