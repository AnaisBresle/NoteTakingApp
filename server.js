// Import required modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Setting up Express
const app = express();
const PORT = 3001;
app.use(express.json());

// Define the path to the JSON file
const dataFilePath = path.join(__dirname, "notes.json");

// READ data from the JSON file
const readNotes = () => {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// WRITE data to the JSON file
const writeNotes = (notes) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(notes, null, 2));
};

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to your Note Taking App!");
});


// Get ALL notes
app.get("/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});


// Create a NEW Note
app.post("/notes", (req, res) => {
const { title, message } = req.body; //defining fields that make a Note

  if (!title || !message) { // Alerting user that both Title and message are mandatory (if any is blank message fired)
    return res.status(400).json({ message: "Title and message are required" });
  }
  const newNote = { id: uuidv4(), ...req.body }; // assign a unique id on creation. 
  const currentNotes = readNotes(); // read exisiting notes 
  currentNotes.push(newNote); // add newNotes to current ones
  writeData(currentNotes);
  res.json({ message: "Data saved successfully", data: newNote }); // sucess message + the note added
});

// Get Specific Note using ID
app.get("/data/:id", (req, res) => {
  const notes = readNotes(); // read all notes
  const item = notes.find((item) => item.id === req.params.id); // find the corresponding id
  if (!item) {
    return res.status(404).json({ message: "Note not found" }); // if ID not found in all notes then error message
  }
  res.json(item);
});

// Update selected Note
app.put("/data/:id", (req, res) => {
  const data = readData(); // read latest data in
  const index = data.findIndex((item) => item.id === req.params.id); //going through all the data and looking for the id that matches
  if (index===-1) {
    return res.status(404).json({ message: "Data not found" });
  }

/// Adding new data to the existing indexed item using spread operator
  data[index] = {...data[index], ...req.body }; 
  
  writeData(data),
  res.json({ message: "Data Updated successfully", data: data[index] });
});


// DELETE Specific Note
app.delete("/data/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex((item) => item.id === req.params.id); //finding which item (index in array) to delete. 
  if (index===-1) {
    return res.status(404).json({ message: "Data not found" });
  }

/// remove the item from array
  data.splice(index,1)
  writeData(data);
  res.json({ message: "Data Deleted successfully" });
});


// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});