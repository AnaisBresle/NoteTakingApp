document.addEventListener('DOMContentLoaded', () => {

//// Element in html file    
  
const notesContainer = document.getElementById('notesContainer');
const titleInput = document.getElementById('noteTitle');
const messageInput = document.getElementById('noteContent');
const saveNoteBtn = document.getElementById('saveNoteButton');
  
    fetchNotes();



});


function fetchNotes() {
  fetch('/notes') /// GET reuqest 
    .then(res => res.json()) // notes in JSON format
    .then(data => {
      const notesContainer = document.getElementById('notesContainer'); /// place where we are displaying all existig notes. 
      notesContainer.innerHTML = ''; // clear existing view in container (so it gets replaced by the updated list of all notes)
      data.forEach(renderNote); // rendering notes for HMTL
    })
    .catch(err => console.error('Error loading notes:', err));
}

function renderNote(note) {  // build html for one note
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.innerHTML = `
    <li><h3>${note.title}</h3> - ${note.message}</li>
    `;
  notesContainer.appendChild(noteEl);
}