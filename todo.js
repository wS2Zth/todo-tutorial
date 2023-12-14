const lsKey = "sgk-todo";
const todoInput = document.getElementById("todoInput");
const todoTable = document.getElementById("todoTable");
const addTodoButton = document.getElementById("addTodo");

let todoList = localStorage.getItem(lsKey);
let id = null;

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
  if (id === null) {
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
  } else {
    let findedItemIndex = todoList.findIndex((todo) => todo.id === id);
    todoList[findedItemIndex].name = todoInput.value;
    localStorage.setItem(lsKey, JSON.stringify(todoList));

    document
      .getElementsByTagName("tr")
      [findedItemIndex + 1].getElementsByTagName("td")[1].textContent =
      todoInput.value;

    todoInput.value = null;

    addTodoButton.textContent = "+ Todo Ekle";
    addTodoButton.classList = "";
    addTodoButton.classList = "btn btn-primary";
    id = null;
  }
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
  editButton.setAttribute("id", todo.id);
  editButton.onclick = updatetodo;

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
  let result = confirm("Bu veriyi silmek istediğinize emin misiniz?");
  if (result) {
    let id = parseInt(this.getAttribute("id"));
    let findedTodoIndex = todoList.findIndex((todo) => todo.id === id);
    todoList.splice(findedTodoIndex, 1);
    localStorage.setItem(lsKey, JSON.stringify(todoList));

    let tableRow = this.closest("tr");
    tableRow.remove();
    alert("Todo başarıyla silindi.");
  } else {
    alert("Silme işlemi iptal edildi.");
  }
}

function updatetodo() {
  let fId = parseInt(this.getAttribute("id"));
  let findedItem = todoList.find((todo) => todo.id === fId);

  id = fId;

  addTodoButton.textContent = "Todo Düzenle";
  addTodoButton.classList = "";
  addTodoButton.classList = "btn btn-info";

  todoInput.value = findedItem.name;
  buttonDisable();
}

todoInput.addEventListener("input", buttonDisable);
