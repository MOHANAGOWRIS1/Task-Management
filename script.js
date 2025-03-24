document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const filterButtons = document.querySelectorAll("[id^='filter-']");
  let tasks = [];
  class Task {
    constructor(name, desc, due, priority, status = "pending") {
      this.id = Date.now();
      this.name = name;
      this.desc = desc;
      this.due = due;
      this.priority = priority;
      this.status = status; 
    }
  }

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
  window.toggleStatus = function (id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, status: task.status === "completed" ? "pending" : "completed" } : task
    );
    renderTasks();
  };

  // Function to delete a task
  window.deleteTask = function (id) {
    tasks = tasks.filter(task => task.id !== id); 
  };
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const name = document.getElementById("task-name").value.trim();
    const desc = document.getElementById("task-desc").value.trim();
    const due = document.getElementById("task-due").value;
    const priority = document.getElementById("task-priority").value;

    if (!name || !due) {
      alert("Task name and due date are required!"); // Validation
      return;
    }
    const newTask = new Task(name, desc, due, priority);
    tasks.push(newTask);

    renderTasks(); 
    taskForm.reset();
  });
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.id.replace("filter-", ""); // "all," "completed," or "pending"
      renderTasks(filter);
    });
  });

  renderTasks();
});
