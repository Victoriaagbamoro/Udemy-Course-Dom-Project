// First thing we need to do is define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();


// Load all event listeners
function loadEventListeners(){
    // Dom Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask)
    // Clear Task Event
    clearBtn.addEventListener('click', clearTasks)
    // Filter task Event
    filter.addEventListener('keyup', filterTasks)
}

// Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // However when we add a task we want to create a List Item right?
    // Create li element
    const li = document.createElement('li');
    // Then we want to add a class
    li.className = 'collection-item';
    // Create TextNode and append to li
    li.appendChild(document.createTextNode(taskInput.value)); 
    // Create new link element
    const link = document.createElement('a');
    // Add a class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li);

    // console.log(taskList);
    
    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = '';

    e.preventDefault();

    
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')  ===null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove Task
    function removeTask(e){
        if(e.target.parentElement.classList.contains('delete-item')){
            if(confirm('Are you sure?')){
                e.target.parentElement.parentElement.remove();

                // Remove task from Local Storage
                removeTaskFromLocalStorage(e.target.parentElement.parentElement);

            }
            
        }
    }

    // Remove from Local Storage
    function removeTaskFromLocalStorage(taskItem){
        let tasks;
        if(localStorage.getItem('tasks')  ===null){
        tasks = [];
        } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        
        tasks.forEach(function(task, index ){
            if(taskItem.textContent === task){
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    // Clear Task
    function clearTasks(){
        // taskList.innerHTML = '';

        // Aside from using innerHTML we can as well use
        // RemoveChild using WhileLoop
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }

        // Clear Task from local storage
        clearTasksFromLocalStorage();
        
    }

    // Clear Tasks from Local Storage
    function clearTasksFromLocalStorage(){
        localStorage.clear(); 
    }


    // Filter Task
    function filterTasks(e){
        const text = e.target.value.toLowerCase();


        // console.log(text);
        document.querySelectorAll('.collection-item').forEach(function(task){
                const item = task.firstChild.textContent;
                if(item.toLowerCase().indexOf(text) != -1){
                    task.style.display = 'block';

                } else {
                    task.style.display = 'none';

                }
        });

    }

    // getTasks from Local Storage
    function getTasks(){
        let tasks;
        if(localStorage.getItem('tasks')  ===null){
            tasks = [];
        } else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
    

        tasks.forEach(function(task){
            // Create li element
            const li = document.createElement('li');
            // Then we want to add a class
            li.className = 'collection-item';
            // Create TextNode and append to li
            li.appendChild(document.createTextNode(task )); 
            // Create new link element
            const link = document.createElement('a');
           // Add a class
            link.className = 'delete-item secondary-content';
            // Add icon HTML
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // Append link to li
            li.appendChild(link)

            // Append li to ul
            taskList.appendChild(li);

        });
    }


    