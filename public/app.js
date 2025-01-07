// Get the DOM elements
const todoList = document.getElementById("todo-list");
const newTaskInput = document.getElementById("new-task");

// Fetch and render the to-do list on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchTodos();
});

// Fetch all to-dos from the server
async function fetchTodos() {
    const response = await fetch("/todos");
    const todos = await response.json();
    renderTodos(todos);
}

// Render the to-do list
function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.classList.toggle("completed", todo.completed);
        
        li.innerHTML = `
            <span>${todo.task}</span>
            <div>
                <button onclick="toggleCompletion(${todo.id})">Toggle</button>
                <button onclick="deleteTodo(${todo.id})" class="delete-btn">Delete</button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
}

// Add a new to-do
async function addTodo() {
    const task = newTaskInput.value.trim();
    if (!task) return alert("Task cannot be empty");

    const response = await fetch("/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
    });

    const newTodo = await response.json();
    newTaskInput.value = ""; // Clear input
    fetchTodos(); // Refresh the list
}

// Toggle completion status
async function toggleCompletion(id) {
    const response = await fetch(`/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: true })
    });

    fetchTodos(); // Refresh the list
}

// Delete a to-do
async function deleteTodo(id) {
    await fetch(`/todos/${id}`, {
        method: "DELETE"
    });

    fetchTodos(); // Refresh the list
}
