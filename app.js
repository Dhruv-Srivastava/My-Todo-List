//Selectors

const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const taskAssigned=document.querySelector(".task-assigned")
const taskCompleted=document.querySelector(".task-completed")
const taskRemaining=document.querySelector(".task-remaining")
// Event listener
todoButton.addEventListener("click",addTask);
taskAssigned.innerText=`Number of tasks assigned: ${todoList.childElementCount}`;
todoList.addEventListener("click",deleteCheck);
document.addEventListener("DOMContentLoaded",getTasks);

//function

function addTask(e){
    e.preventDefault(); // preventing the form to submit.

    // creating a task div
    const taskDiv=document.createElement("div");
    taskDiv.classList.add("task");
    const li=document.createElement("li");
    li.innerText=todoInput.value;
    if(li.innerText){
        taskDiv.append(li);

        // Adding todo to local storage;
        saveTodo(li.innerText);
        // Creating a complete button
        const completed=document.createElement("button");
        completed.innerHTML='<i class="fas fa-check"></i>';
        completed.classList.add("completed-btn");
        taskDiv.append(completed);

        // Creating a delete button
        const deleted=document.createElement("button");
        deleted.innerHTML='<i class="fas fa-trash"></i>';
        deleted.classList.add("deleted-btn");
        taskDiv.append(deleted);

        // attaching the task div to my ul

        todoList.append(taskDiv);
        todoInput.value="";
        taskAssigned.innerText=`Number of tasks currently assigned: ${todoList.childElementCount}`;
    }
}

function deleteCheck(e){
    const clickedItem=e.target;
    let todoText=clickedItem.parentElement.firstElementChild.innerText;
    if(clickedItem.classList[0]=="deleted-btn"){
        // grab the parent element of this deleted btn which would be a task div
        // First add the transition and then remove the element
        clickedItem.parentElement.classList.add("fall");
        // remove todo from local storage
        removeLocalTasks(todoText);
        // we cant directly remove it, we ll have to add a special event listener named transitionend and then delete it
        clickedItem.parentElement.addEventListener("transitionend",()=>{
            clickedItem.parentElement.remove();
            taskAssigned.innerText=`Number of tasks currently assigned: ${todoList.childElementCount}`;
        });
    }

    if(clickedItem.classList[0]=="completed-btn"){
        clickedItem.parentElement.classList.toggle("completed");
    }

}
// the structure that we want to generate would be
// one div inside that an li, a button for checked and a button for delete


// function for localStorage

function saveTodo(todo)
{
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTasks(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        // creating a task div
        const taskDiv=document.createElement("div");
        taskDiv.classList.add("task");
        const li=document.createElement("li");
        li.innerText=todo;
        taskDiv.append(li);
        const completed=document.createElement("button");
        completed.innerHTML='<i class="fas fa-check"></i>';
        completed.classList.add("completed-btn");
        taskDiv.append(completed);

        // Creating a delete button
        const deleted=document.createElement("button");
        deleted.innerHTML='<i class="fas fa-trash"></i>';
        deleted.classList.add("deleted-btn");
        taskDiv.append(deleted);

        // attaching the task div to my ul

        todoList.append(taskDiv);
        taskAssigned.innerText=`Number of tasks currently assigned: ${todoList.childElementCount}`;
    });
}

function removeLocalTasks(todoText){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex=todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem('todos',JSON.stringify(todos));
}