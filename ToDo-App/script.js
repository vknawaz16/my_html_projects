const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", addTask);

function addTask() {

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

function displayTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(filter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        if(task.completed){
            taskSpan.classList.add("completed");
        }

        taskSpan.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks(filter);
        });

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("task-buttons");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");

        editBtn.addEventListener("click", () => {

            const updatedText = prompt(
                "Edit Task",
                task.text
            );

            if(updatedText){
                task.text = updatedText;
                saveTasks();
                displayTasks(filter);
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");

        deleteBtn.addEventListener("click", () => {

            tasks = tasks.filter(
                t => t.id !== task.id
            );

            saveTasks();
            displayTasks(filter);
        });

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);

        li.appendChild(taskSpan);
        li.appendChild(btnDiv);

        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.getAttribute("data-filter");

        displayTasks(filter);
    });
});