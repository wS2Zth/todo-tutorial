const lsKey = "sgk-todo";
const todoInput = document.getElementById("todoInput");
const todoTable = document.getElementById("todoTable");
const addTodoButton = document.getElementById("addTodo");

let todoList = localStorage.getItem(lsKey);

if (todoList === null) {
  todoList = [];
} else {
  todoList = JSON.parse(todoList);
  todoList.forEach((todo) => {
    addTable(todo);
  });
}

buttonDisable();

function saveTodo() {
  if (todoInput.value !== "") {
    let todoObject = {
      id: new Date().getTime(),
      name: todoInput.value,
      done: false,
    };
    todoList.push(todoObject);
    localStorage.setItem(lsKey, JSON.stringify(todoList));
    addTable(todoObject);
    todoInput.value = null;
  } else {
    alert("Lütfen input alanını boş geçmeyiniz!");
  }
  buttonDisable();
}

function addTable(todo) {
  let newRow = todoTable.insertRow(-1);

  let actionCell = newRow.insertCell(0);
  let todoCell = newRow.insertCell(1);

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList = "btn btn-danger me-3";
  deleteButton.setAttribute("id", todo.id);
  deleteButton.onclick = deleteTodo;

  let editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList = "btn btn-warning";

  actionCell.appendChild(deleteButton);
  actionCell.appendChild(editButton);
  todoCell.innerText = todo.name;
}

function buttonDisable() {
  if (todoInput.value === "") {
    addTodoButton.disabled = true;
  } else {
    addTodoButton.disabled = false;
  }
}

function deleteTodo() {
  let id = parseInt(this.getAttribute("id"));
  let findedTodoIndex = todoList.findIndex((todo) => todo.id === id);
  todoList.splice(findedTodoIndex, 1);
  localStorage.setItem(lsKey, JSON.stringify(todoList));

  let tableRow = this.closest("tr");
  tableRow.remove();
}

todoInput.addEventListener("input", buttonDisable);
