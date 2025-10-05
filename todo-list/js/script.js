const input = document.getElementById("input-todo");
const btnAdd = document.getElementById("btn-add");
const listTodos = document.getElementById("list-todos");

btnAdd.addEventListener("click", addTodo);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const todo = input.value.trim();
  if (todo === "") return;

  const li = document.createElement("li");
  const deleteTodo = document.createElement("button");
  deleteTodo.textContent = "Deletar";
  const checkbox = document.createElement("input");
  const span = document.createElement("span");

  checkbox.type = "checkbox";
  checkbox.checked = false;
  span.textContent = todo;

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteTodo);

  deleteTodo.addEventListener("click", () => {
    li.remove();
  });
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.classList.add("done");
    } else {
      span.classList.remove("done");
    }
  });

  listTodos.appendChild(li);
  input.value = "";
}
