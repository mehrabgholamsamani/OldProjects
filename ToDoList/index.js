const elements = {
  open: document.getElementById("open"),
  counter: document.getElementById("counter"),
  popup: document.getElementById("popup"),
  close: document.getElementById("close"),
  add: document.getElementById("add"),
  taskHolder: document.getElementById("taskHolder"),
  finishedTasks: document.getElementById("finishedTasks"),
  input: document.getElementById("input"),
};

const trashSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6" /><path d="M8 6V4h8v2" /><rect x="6" y="6" width="12" height="14" rx="2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>`;

let counter = 0;

elements.open.onclick = function () {
  elements.popup.style.display = "block";
};

elements.close.onclick = function () {
  elements.popup.style.display = "none";
};

function makeCard(text, done) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.classList.add("task");
  if (done) title.classList.add("done");
  title.textContent = text;

  const toDoActions = document.createElement("div");
  toDoActions.classList.add("to-do-actions");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("toggle");
  checkbox.checked = !!done;

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("button", "delete");
  button.innerHTML = trashSvg;

  toDoActions.appendChild(checkbox);
  toDoActions.appendChild(button);

  card.appendChild(title);
  card.appendChild(toDoActions);

  return card;
}

elements.add.onclick = function () {
  const value = elements.input.value.trim();
  if (!value) return;

  elements.taskHolder.appendChild(makeCard(value, false));
  counter++;
  elements.counter.textContent = counter;

  elements.input.value = "";
};

elements.taskHolder.onclick = function (event) {
  const deleteButton = event.target.closest(".delete");
  if (deleteButton) {
    deleteButton.closest(".card").remove();
    counter--;
    elements.counter.textContent = counter;
    return;
  }

  const toggle = event.target.closest(".toggle");
  if (!toggle) return;

  const cardEl = toggle.closest(".card");
  const text = cardEl.querySelector(".task").textContent;

  if (toggle.checked) {
    elements.finishedTasks.appendChild(makeCard(text, true));
    cardEl.remove();
    counter--;
    elements.counter.textContent = counter;
  }
};

elements.finishedTasks.onclick = function (event) {
  const deleteButton = event.target.closest(".delete");
  if (deleteButton) {
    deleteButton.closest(".card").remove();
    return;
  }

  const toggle = event.target.closest(".toggle");
  if (!toggle) return;

  const cardEl = toggle.closest(".card");
  const text = cardEl.querySelector(".task").textContent;

  if (!toggle.checked) {
    elements.taskHolder.appendChild(makeCard(text, false));
    cardEl.remove();
    counter++;
    elements.counter.textContent = counter;
  }
};
const toggleFinishedBtn = document.getElementById("toggleFinished");
const finishedTasks = elements.finishedTasks;
const arrow = toggleFinishedBtn.querySelector(".arrow");

let finishedVisible = true;

toggleFinishedBtn.onclick = function () {
  finishedVisible = !finishedVisible;

  finishedTasks.style.display = finishedVisible ? "block" : "none";

  arrow.classList.toggle("down", !finishedVisible);
};