const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoBtn.addEventListener("click", (e) => {
  //Prevent Btn from submitting
  e.preventDefault();
  checkTodo();
});
todoList.addEventListener("click", deleteCheck);

let localTodos = [];

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("todos")) {
    localTodos = [...JSON.parse(localStorage.getItem("todos"))];
    localTodos.forEach((item) => addTodo(item));
  }
});
function checkTodo() {
  const todo = todoInput.value;
  if (!localTodos.includes(todo)) {
    addTodo(todo);
    localTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(localTodos));
  } else {
    alert("This Todo was added!");
  }
}
function addTodo(todo) {
  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Check Mark btn
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = `<i class='fas fa-check'></i>`;
  checkBtn.classList.add("check-btn");
  todoDiv.appendChild(checkBtn);
  //Delete Btn
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = `<i class = 'fas fa-trash'></i>`;
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);
  //Append to todoList
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;
  if (item.classList[0] === "trash-btn") {
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
      let newArr = localTodos.filter(
        (item) => item !== todo.firstChild.innerText
      );
      localTodos = newArr; // nghi ca 30p moi ra dong nay huhu
      localStorage.removeItem("todos");
      localStorage.setItem("todos", JSON.stringify(newArr));
    });
  }
  if (item.classList[0] === "check-btn") {
    todo.classList.toggle("completed");
  }
}

function saveLocal() {}
