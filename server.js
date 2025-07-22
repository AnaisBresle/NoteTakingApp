// Setting up Express module
const express = require("express");
const app = express();
const PORT = 3001;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
