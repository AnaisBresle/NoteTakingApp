document.addEventListener('DOMContentLoaded', () => {
  fetchNotes();
})


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

function renderNote () {}