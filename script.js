function showModal() {
  document.getElementById("home").style.display = "none";
  document.getElementById("modal").style.display = "block";
}

function addTaskToLocalStorage() {
  const form = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    assignee: document.getElementById("assignee").value,
    priority: document.getElementById("priority").value,
    date: document.getElementById("date-modal").value,
  };

  if (localStorage.getItem("cards")) {
    const cards = JSON.parse(localStorage.getItem("cards"));
    cards.push(form);
    localStorage.setItem("cards", JSON.stringify(cards));
  } else {
    const cards = [];
    cards.push(form);
    localStorage.setItem("cards", JSON.stringify(cards));
  }
  window.location.reload();
}

function createTasksOnBoard() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  const nodes = document.getElementsByClassName("card");
  const template = nodes[0];
  for (let i = 1; i < cards.length; i++) {
    const clone = template.cloneNode(true);
    template.parentElement.appendChild(clone);
  }

  addValuesToTasks(cards, nodes);
}

const photos = new Map();
photos.set("John Doe", "John.png");
photos.set("Jane Doe", "Jane.png");

function addValuesToTasks(cards, nodes) {
  for (let i = 0; i < nodes.length; i++) {
    const title = nodes[i].querySelector("#title-0");
    title.id = "title-" + i;
    if (cards[i].title) {
      title.innerText = cards[i].title;
    }

    const priority = nodes[i].querySelector("#priority-0");
    priority.id = "priority-" + i;
    if (cards[i].priority) {
      priority.innerText = cards[i].priority;
    } else {
      priority.parentElement.style.display = "none";
    }

    const photo = nodes[i].querySelector("#photo-0");
    photo.id = "photo-" + i;
    const assignee = nodes[i].querySelector("#name-0");
    assignee.id = "name-" + i;
    if (cards[i].assignee) {
      assignee.innerText = cards[i].assignee;
      photo.src = photos.get(assignee.innerText);
    } else {
      assignee.parentElement.style.display = "none";
    }

    const description = nodes[i].querySelector("#description-0");
    description.id = "description-" + i;
    if (cards[i].description) {
      description.innerText = cards[i].description;
    } else {
      description.parentElement.style = "none";
    }

    const date = nodes[i].querySelector("#date-0");
    date.id = "date-" + i;
    if (cards[i].date) {
      date.innerText = cards[i].date;
    } else {
      date.parentElement.style = "none";
    }

    const editBtn = nodes[i].querySelector("#edit-btn");
    editBtn.id = i;

    const deletBtn = nodes[i].querySelector("#delete-btn");
    deletBtn.id = i;

    nodes[i].id = "card-" + i;
  }
}

window.addEventListener("load", createTasksOnBoard());

function prepareFormForTaskUpdate(button) {
  document.getElementById("home").style.display = "none";
  document.getElementById("modal").style.display = "block";

  // hide add-btn and show edit-btn
  document.getElementById("add-btn").style.display = "none";
  document.getElementById("edit-btn").style.display = "block";

  document.getElementById("title").value = document.getElementById(
    "title-" + button.id
  ).innerText;
  document.getElementById("description").value = document.getElementById(
    "description-" + button.id
  ).innerText;
  document.getElementById("assignee").value = document.getElementById(
    "name-" + button.id
  ).innerText;
  document.getElementById("priority").value = document.getElementById(
    "priority-" + button.id
  ).innerText;
  document.getElementById("date-modal").value = document.getElementById(
    "date-" + button.id
  ).innerText;

  localStorage.setItem("task-id", button.id);
}

function updateTaskInLocalStorage() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  const card = cards[localStorage.getItem("task-id")];

  card.title = document.getElementById("title").value;
  card.description = document.getElementById("description").value;
  card.assignee = document.getElementById("assignee").value;
  card.priority = document.getElementById("priority").value;
  card.date = document.getElementById("date-modal").value;

  localStorage.setItem("cards", JSON.stringify(cards));
}

function deleteTask(button) {
  const cards = JSON.parse(localStorage.getItem("cards"));
  cards.splice([button.id], 1);
  localStorage.setItem("cards", JSON.stringify(cards));
  document.getElementById("card-" + button.id).remove();
}

function cancel() {
  document.getElementById("home").style.display = "block";
  document.getElementById("modal").style.display = "none";
}
