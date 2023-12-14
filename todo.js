const lsKey = "sgk-todo";
const todoInput = document.getElementById("todoInput");
const todoTable = document.getElementById("todoTable");

let todoList = localStorage.getItem(lsKey);

if (todoList === null) {
  todoList = [];
} else {
  todoList = JSON.parse(todoList);

  todoList.forEach((todo) => {
    addTable("aksiyon", todo.name);
  });
}

function saveTodo() {
  let todoObject = {
    id: new Date().getTime(),
    name: todoInput.value,
    done: false,
  };

  todoList.push(todoObject);

  localStorage.setItem(lsKey, JSON.stringify(todoList));
}

function addTable(aksiyon, todo) {
  let newRow = todoTable.insertRow(-1);

  let newCell1 = newRow.insertCell(0);
  let newCell2 = newRow.insertCell(1);

  newCell1.innerText = aksiyon;
  newCell2.innerText = todo;
}
