const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

function addTodo(e) {
  //Prevent Btn from submitting
  e.preventDefault();
  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
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
  console.dir(todo.classList);
  if (item.classList[0] === "trash-btn") {
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  if (item.classList[0] === "check-btn") {
    todo.classList.toggle("completed");
  }
}
