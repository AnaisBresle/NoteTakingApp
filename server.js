// Setting up Express module
const express = require("express");
const app = express();
const PORT = 3001;
app.use(express.json());

// Handle GET request at the root route
app.get("/", (req, res) => {
  res.send("Welcome to the simple Express app!");
});

// Handle POST request at the /echo route
app.post("/echo", (req, res) => {
  // Respond with the same data that was received in the request body
  res.json({ received: req.body });
});

// Wildcard route to handle undefined routes
app.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});