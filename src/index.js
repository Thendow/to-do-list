const A = document.getElementById("task-area");
const B = document.getElementById("single-task");
const C = document.getElementById("tasks");

function addTask(event) {
  event.preventDefault();
  if (B.value === "") return;
  const task = createTask(B.value);
  C.appendChild(task);
  B.value = "";
}

function createTask(taskName) {
  const task = document.createElement("li");
  task.classList.add("task");
  task.innerHTML = `
        <input type="checkbox">
        <label>${taskName}</label>
        <span class="delete">×</span>
    `;

  const deleteButton = task.querySelector(".delete");
  deleteButton.addEventListener("click", deleteTask);

  return task;
}

function deleteTask(event) {
  event.target.parentElement.remove();
}

A.addEventListener("submit", addTask);
B.addEventListener("submit", addTask);
C.addEventListener("submit", addTask);

let tasks = Object.keys(localStorage);
tasks = tasks.sort();

for (let key of tasks) {
  let classValue = "";
  let value = localStorage.getItem(key);
  let taskInnerDiv = document.createElement("div");
  taskInnerDiv.classList.add("task");
  taskInnerDiv.setAttribute("id", key);
  taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
  //localstorage would store boolean as string so we parse it to boolean back
  let editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  if (!JSON.parse(value)) {
    editButton.style.visibility = "visible";
  } else {
    editButton.style.visibility = "hidden";
    taskInnerDiv.classList.add("completed");
  }
  taskInnerDiv.appendChild(editButton);
  taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></i></button>`;
  tasksDiv.appendChild(taskInnerDiv);
}
