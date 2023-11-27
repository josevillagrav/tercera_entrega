document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  // Array "tasks" utilizado para almacenar tareas y manipular con push y forEach

  let tasks = [];

  // Cargar tareas desde el almacenamiento al cargar la página
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }

  // Uso de condicional y ciclo
  // DOM y detección de eventos en click para marcar tareas comoo completadas o no

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.name;
      if (task.completed) {
        li.classList.add("completed");
      }

      li.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
        saveTasks();
      });

      taskList.appendChild(li);
    });
  }

  // Cada tarea en la lista es un Objeto

  addTaskButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
      tasks.push({ name: taskName, completed: false });
      renderTasks();
      saveTasks();
      taskInput.value = "";
    }
  });

  // Guardar tareas en el almacenamiento

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
