const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
const CLASSNAME = "hidden";

let toDos = [];

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => parseInt(toDo.id) !== parseInt(li.id));
  if (toDos.length < 3) {
    toDoForm.classList.remove(CLASSNAME);
  }
  saveToDos();
}

function finishToDo(event) {
  const li = event.target.parentElement;
  li.classList.toggle("done");
}

function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✔";
  completeBtn.addEventListener("click", finishToDo);
  const span = document.createElement("span");
  span.innerText = `${newToDo.text}`;
  const deleteBtn = document.createElement("button");
  deleteBtn.id = "deleteButton";
  deleteBtn.innerText = "✖";
  deleteBtn.addEventListener("click", deleteToDo);
  li.appendChild(completeBtn);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  toDoList.appendChild(li);

  if (toDos.length === 3) {
    toDoForm.classList.add(CLASSNAME);
  }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos(newToDo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
