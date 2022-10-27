//QUERY SELECTORS
const app = document.querySelector('#app');

//ASYNC FUNCTIONS
//CREATE
async function createTask () {
  console.log('createTask()');
  try {
    const inputTask = document.querySelector('#taskInput').value;
    const response = await fetch('/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputTask
      })
    })
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//READ
async function readTask () {
  console.log('readTask()');
  const response = await fetch('/task');
  const data = await response.json();
  console.log('data', data);
  const taskElements = [];

  //ELEMENT CREATION
  data.forEach(task => {
    const div = document.createElement('div');
    // console.log('_id', task._id);
    div.setAttribute('id', task._id)
    div.innerText = task.name;
    taskElements.push(div);

    //update input
    const updateInput = document.createElement('input');
    updateInput.setAttribute('placeholder', 'update task');
    updateInput.setAttribute('id', `input${task._id}`);

    //update button
    const updateButton = document.createElement('button');
    updateButton.innerText = "Update";
    updateButton.setAttribute('onclick', 'updateTask(this)');

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute('onclick', 'deleteTask(this)') 

    //append to div
    div.append(updateInput);
    div.append(updateButton);
    div.append(deleteButton);

  })

  //add to TaskElements Array
  console.log('taskElements', taskElements)
  taskElements.forEach(taskElement => {
    app.append(taskElement);
  })
}

//UPDATE
function updateTask(e) {
  console.log('updateTask()', e.parentElement.id);
  const updateValue = document.querySelector(`#input${e.parentElement.id}`).value;
  console.log('update value', updateValue);
  //update fetch functionality
}

//DELETE
function deleteTask (e) {
  console.log('deleteTask()', e.parentElement.id);
  //delete fetch functionality
}

function onLoad() {
  readTask(); 
}

//Start page functionality
// onLoad();