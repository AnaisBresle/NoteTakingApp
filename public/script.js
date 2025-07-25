
// Select elements when DOM ready

document.addEventListener('DOMContentLoaded', function () {

  // Select the AddNote Button + Assign event handler
  var addNoteButton = document.getElementById("addNoteButton");
  addNoteButton.onclick = onClickAddNoteButton;

  // Bring New Note Widget when clicking on Add Note button

  document.querySelector('.addNote').onclick = function () {
    console.log('Add Note button clicked!');
    document.querySelector('.newNoteWidget').style.display = 'block';

  };

  let NoteBeingEditedId = null; // needed for editable function

  // Retrieve  Notes
  const savedTasks = localStorage.getItem('tasks'); //changing savedTask to plural so it is clear ware saving all the added tasks.
  if (savedTasks) {
    const parsedTasks = JSON.parse(savedTasks);
    parsedTasks.forEach(renderTaskRow); // Looping through the tasks stored and render each one
  }


  // Capturing the new task

  // Create new task object test

  function Task(task_Name, ) {
       this.taskName = task_Name;
       
  }


  ///Adding new tasks ///

  function onClickAddTaskButton() {
    var taskNameValue = taskName.value.trim();
    var dueDateValue = dueDate.value;
    var createdDateValue = new Date().toISOString().split("T")[0]; // convert timestamp into YYYY-MM_DD

    if (taskNameValue === '') {
      alert("Please provide a task to be added");
      return;// stop running further if empty 
    }

    if (dueDateValue === '') {
      alert("Pleass pick a due date");
      return;
    }

    let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

    if (taskBeingEditedId) {
      tasksArray = tasksArray.map(function (task) {
        if (task.id === taskBeingEditedId) {
          task.taskName = taskNameValue;
          task.dueDate = dueDateValue;
          task.status = taskStatus.value;
          taskBeingEditedId = null;
          return task;
        }
        return task;
      });
      //update the local storage
      localStorage.setItem('tasks', JSON.stringify(tasksArray));
      // reload page so table get updated
      location.reload(); // reload page so table get updated
      return;

    }

    var statusValue = taskStatus.value;
    var newtaskToAdd = new Task(taskNameValue, dueDateValue, createdDateValue, statusValue); // new in front of Task needed to call objecct constructin function - without retun undefined

    console.log("New task created:", newtaskToAdd);


    //creating a new array when a new task is added
    tasksArray.push(newtaskToAdd);


    //update the local storage
    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    //render tasks in row in the table as per function below
    renderTaskRow(newtaskToAdd);

    // clear input fields once task has been addded
    taskName.value = '';
    dueDate.value = '';

  }


  // Rendering a task row in the tasklist table
  // Writing the new task in list widget
  function renderTaskRow(task) {
    var tableEl = document.querySelector("#taskslist");

    // create a new row element
    var newRowEl = document.createElement("tr");

    // Create a new td element for Task
    var taskNameTdEl = document.createElement("td");
    taskNameTdEl.textContent = task.taskName;

    // Create a new td element for Date Created
    var createdDateTdEl = document.createElement("td");
    createdDateTdEl.textContent = task.createdDate;

    // Create a new td element for Due Date
    var dueDateTdEl = document.createElement("td");
    dueDateTdEl.textContent = task.dueDate;

    // Create a new td element for Status
    var statusTdEl = document.createElement("td");
    statusTdEl.textContent = task.status;

    // Create buttons in Action Cell
    var actionTdEl = document.createElement("td");

    // edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.classList.add("editButton");

    // delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.classList.add("deleteButton");




    // append the new row to the table and add new cell to new row
    tableEl.appendChild(newRowEl);
    newRowEl.appendChild(taskNameTdEl);
    newRowEl.appendChild(createdDateTdEl);
    newRowEl.appendChild(dueDateTdEl);
    newRowEl.appendChild(statusTdEl);
    newRowEl.appendChild(actionTdEl);
    actionTdEl.appendChild(editButtonEl);
    actionTdEl.appendChild(deleteButtonEl);


    //delete row of deleted tasks
    deleteButtonEl.onclick = function () {
      deleteTask(task.id, newRowEl);
    };

    //edit row of edited tasks
    editButtonEl.onclick = function () {
      editTask(task)
    };

  }

  //Delete a Task 

  function deleteTask(taskId, rowElement) {
    const savedTasks = localStorage.getItem('tasks');
    let tasksArray;
    if (savedTasks) {
      tasksArray = JSON.parse(savedTasks);
    } else {
      tasksArray = []; // empty array if nothing in localstorage
    }

    let updatedTasks = []; // set as empty array
    tasksArray.forEach(function (task) {
      if (task.id !== taskId) {
        updatedTasks.push(task);
      }
    });

    tasksArray = updatedTasks;

    // Reset localStorage after task is deleted
    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    // Remove from DOM
    rowElement.remove();
    console.log("Deleted task with ID:", taskId);
  };


  //Edit a Task 
  function editTask(task) {

    taskName.value = task.taskName;
    dueDate.value = task.dueDate;
    taskBeingEditedId = task.id;
    taskStatus.value = task.status;

    // Show AddNewTask widget if not displayed already with the details of the task being edited
    document.querySelector('.newTaskWidget').style.display = 'block';

    // Change button text to "Update Task"
    addTaskButton.textContent = "Update Task";

     // Show status dropdown if hidden
  
if (statusWrapper) {
  statusWrapper.style.display = 'block';

  };
}

});