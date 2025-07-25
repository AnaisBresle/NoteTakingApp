document.addEventListener('DOMContentLoaded', () => {

//// Element in html file    
  

const titleInput = document.getElementById('noteTitle');
const messageInput = document.getElementById('noteContent');
const saveNoteBtn = document.getElementById('saveNoteButton');
let currentEditId = null; // default null but if edit note clicked then kickin. 

    fetchNotes();

saveNoteBtn.addEventListener('click', () => { // in click take input and pass them to server using createNote function
  const title = titleInput.value.trim();
  const message = messageInput.value.trim();

  if (!title || !message) {  // UX send an alert (pop-up) to user that both fields are needed. 
    alert('Both title and message are required.');
    return;
  }
if (currentEditId) { /// we are editing a note then run editNote function
      
      editNote(currentEditId, { title, message });
      currentEditId = null;
      saveNoteBtn.textContent = 'Save Note'; // Change button text

    } else {
      
        createNote({ title, message });   // functio to push data to server

  // Clear input fields after the data was sucessfully passes 
  titleInput.value = '';
  messageInput.value = '';

    }
  });
});


function fetchNotes() {
  fetch('/notes') /// GET reuqest 
    .then(res => res.json()) // notes in JSON format
    .then(data => {
      const notesContainer = document.getElementById('notesContainer'); 
      notesContainer.innerHTML = ''; // clear existing view in container (so it gets replaced by the updated list of all notes)
      data.forEach(renderNote); // rendering notes for HMTL
    })
    .catch(err => console.error('Error loading notes:', err));
}

function renderNote(note) {  // build html for one note
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.innerHTML = `
    <h3>${note.title}</h3> - ${note.message}
     <button onclick="getNoteToEdit('${note.id}')">Edit</button> 
    <button class="deletebtn" onclick="deleteNote('${note.id}')">Delete</button>
    `;
  notesContainer.appendChild(noteEl);
}

 function createNote(note) {
  fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to save note');
      }
      return res.json();
    })
    .then(data => {
      renderNote(data.data); // Immediately add new note to view
    })
    .catch(err => console.error('Error saving note:', err));
}   


function deleteNote(id) {
if (!confirm("Are you sure you want to delete this note?")) return;

  fetch(`/notes/${id}`, { /// Note to future-self - need to use  ` and not single quote. 
    method: 'DELETE',
    
  })
    .then(res => {
      if (!res.ok) 
        throw new Error('Failed to delete note');
      return res.json();
    })
    .then(() => {
      fetchNotes(); // to refresh the list
    })
    .catch(err => console.error('Error deleting note:', err));
}   

function getNoteToEdit (id) {// geting the note to edit 
  fetch(`/notes/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('Note not found');
      return res.json();
    })
    .then(note => {
      document.getElementById('noteTitle').value = note.title; ///passing the exisitng data to the html page (form)
      document.getElementById('noteContent').value = note.message;
      document.getElementById('saveNoteButton').textContent = 'Update Note'; //changing button to update instead of add
      currentEditId = id;
    })
    .catch(err => console.error('Error fetching note for edit:', err));
}


function editNote(id, update) {
  fetch(`/notes/${id}`, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(update)
  })
    .then(res => {
      if (!res.ok) 
        throw new Error('Failed to update note');
      return res.json();
    })
    .then(() => {
      fetchNotes(); // to refresh the list
    })
    .catch(err => console.error('Error updating note:', err));
}   

