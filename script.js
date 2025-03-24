document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const filterButtons = document.querySelectorAll("[id^='filter-']");

  // Array to store tasks
  let tasks = [];

  // Task class to create task objects
  class Task {
    constructor(name, desc, due, priority, status = "pending") {
      this.id = Date.now();
      this.name = name;
      this.desc = desc;
      this.due = due;
      this.priority = priority;
      this.status = status; // "pending" or "completed"
    }
  }

  // Function to render tasks dynamically based on a filter
  function renderTasks(filter = "all") {
    taskList.innerHTML = ""; // Clear current task list
    tasks
      .filter(task => filter === "all" || task.status === filter)
      .forEach(task => {
        const li = document.createElement("li");
        li.className = `task-item ${task.status}`;
        li.innerHTML = `
          <span>
            <strong>${task.name}</strong> (${task.priority}) - ${task.desc}
            <small>Due: ${task.due}</small>
          </span>
          <div>
            <button onclick="toggleStatus(${task.id})">${task.status === "completed" ? "Undo" : "Complete"}</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
          </div>`;
        taskList.appendChild(li);
      });
  }

  // Function to toggle the status of a task
  window.toggleStatus = function (id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, status: task.status === "completed" ? "pending" : "completed" } : task
    );
    renderTasks(); // Re-render tasks
  };

  // Function to delete a task
  window.deleteTask = function (id) {
    tasks = tasks.filter(task => task.id !== id); // Remove task by ID
    renderTasks(); // Re-render tasks
  };

  // Event Listener for the form submission
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh

    // Get form values
    const name = document.getElementById("task-name").value.trim();
    const desc = document.getElementById("task-desc").value.trim();
    const due = document.getElementById("task-due").value;
    const priority = document.getElementById("task-priority").value;

    if (!name || !due) {
      alert("Task name and due date are required!"); // Validation
      return;
    }

    // Create a new task and add it to the array
    const newTask = new Task(name, desc, due, priority);
    tasks.push(newTask);

    renderTasks(); // Re-render the task list
    taskForm.reset(); // Clear the form fields
  });

  // Event Listener for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.id.replace("filter-", ""); // "all," "completed," or "pending"
      renderTasks(filter);
    });
  });

  // Initial render
  renderTasks();
});