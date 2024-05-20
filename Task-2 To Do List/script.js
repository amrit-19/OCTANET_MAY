let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const prioritySelect = document.getElementById("prioritySelect").value;
    const dueDate = document.getElementById("dueDate").value;

    if (taskInput !== "") {
        const task = {
            id: Date.now(),
            task: taskInput,
            priority: prioritySelect,
            dueDate: dueDate || "No Due Date",
            completed: false
        };

        tasks.push(task);
        displayTasks();
        document.getElementById("taskInput").value = "";
        document.getElementById("dueDate").value = "";
    } else {
        alert("Please enter a task!");
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");
        const dueDate = new Date(task.dueDate);
        const timeLeft = Math.floor((dueDate - Date.now()) / (1000 * 60 * 60 * 24));
        taskItem.innerHTML = `
            <div>
                <input type="checkbox" id="task${task.id}" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${task.id})">
                <label for="task${task.id}" class="${task.completed ? 'completed-task' : ''}">${task.task} - Priority: ${task.priority} - Due Date: ${task.dueDate}</label>
            </div>
            <div>
                ${timeLeft > 0 ? `Time Left: ${timeLeft} day(s)` : 'Overdue'}
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

displayTasks();
