const API_URL = "/todos";
const input = document.getElementById("input-todo");
const btnAdd = document.getElementById("btn-add");
const list = document.getElementById("list-todos");

btnAdd.addEventListener("click", addTodo);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

async function loadTodos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao carregar tarefas");
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error(err);
  }
}

async function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error("Erro ao adicionar tarefa");
    input.value = "";
    await loadTodos();
  } catch (err) {
    console.error(err);
  }
}

async function toggleTodo(id, done) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done }),
    });

    if (!res.ok) throw new Error("Erro ao atualizar tarefa");
    await loadTodos();
  } catch (err) {
    console.error(err);
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao excluir tarefa");
    await loadTodos();
  } catch (err) {
    console.error(err);
  }
}

function renderTodos(todos) {
  list.innerHTML = "";

  if (todos.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Nenhuma tarefa adicionada.";
    empty.style.color = "#777";
    empty.style.fontStyle = "italic";
    list.appendChild(empty);
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = !!todo.done;
    span.textContent = todo.text;
    delBtn.textContent = "❌";

    if (todo.done) span.classList.add("done");

    checkbox.addEventListener("change", () =>
      toggleTodo(todo.id, checkbox.checked),
    );
    delBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

loadTodos();
