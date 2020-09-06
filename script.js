//Define Ui Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListener();

// Load all event listeners
function loadEventListener() {

    //Dom load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // remove task events
    taskList.addEventListener('click', removeTask);
    //clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // filter task event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the link to li
        li.appendChild(link);

        taskList.appendChild(li);
    });
}

//Add TAsk 
function addTask(event) {
    if (taskInput.value === '') {
        alert('Add a new task');
    }
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
    // append the li to the ul
    taskList.appendChild(li);

    //Store in Local storage
    storeLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';
    event.preventDefault();
}


// store task
function storeLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// remove task
function removeTask(event) {
    if (event.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure to remove task ?')) {
            event.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(event.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
}

// clear task btn actions
function clearTasks() {
    taskList.innerHTML = '';
    // while (taskList.firstChild) {
    //     taskList.removeChild(taskList.firstChild);
    // }

    // Clear from LS
    clearTaskLS();
}

// clear tasks from LS
function clearTaskLS() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(event) {
    const text = event.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            console.log(item);
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
}