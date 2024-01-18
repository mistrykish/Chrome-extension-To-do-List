let tasks = [];

let icon = document.getElementById("addicon");
let btns = document.getElementById("btn");
let banner = document.getElementById("hero");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
let editModal = document.getElementById("edit-Modal");

function addTaskToList(taskText, completed) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkBox");
  checkbox.checked = completed;

  let list = document.createElement("li");
  list.classList.add("task-item");

  let editBtn = document.createElement("IMG");
  editBtn.classList.add("editbutton");
  editBtn.setAttribute("src", "images/edit.png");
  editBtn.setAttribute("height", "55px");

  let removeBtn = document.createElement("IMG");
  removeBtn.classList.add("addbutton");
  removeBtn.setAttribute("src", "images/remove.png");

  let taskTextSpan = document.createElement("span");
  taskTextSpan.classList.add("task-text");
  taskTextSpan.textContent = taskText;

  list.title = taskText;

  list.appendChild(checkbox);
  list.appendChild(taskTextSpan);
  list.appendChild(removeBtn);
  list.appendChild(editBtn);

  document.getElementById("myList").appendChild(list);

  removeBtn.addEventListener("click", () => {
    list.remove();
    updateLocalStorage();
    checkCompletionStatus();
  });

  editBtn.onclick = () => {
    editTask(taskTextSpan.textContent, list);
    editModal.style.display = "block";
  };

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      taskTextSpan.classList.add("completed");
    } else {
      taskTextSpan.classList.remove("completed");
    }

    updateLocalStorage();
    checkCompletionStatus();
  });

  checkCompletionStatus();
}

icon.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks anywhere outside of any modal, close the active modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == editModal) {
    editModal.style.display = "none";
  }
};

function checkCompletionStatus() {
  const taskItems = document.querySelectorAll(".task-item");

  if (taskItems.length === 0) {
    console.log("No tasks present, displaying the banner.");
    banner.style.display = "flex";
    funkyText();
    hero.style.animationPlayState = "running"; // Start the celebration animation
    startFireworks(); // Start the fireworks animation
  } else {
    let allCompleted = true;

    taskItems.forEach((taskItem) => {
      const checkbox = taskItem.querySelector(".checkBox");
      if (!checkbox.checked) {
        allCompleted = false;
        return;
      }
    });

    if (allCompleted) {
      console.log("All tasks are completed.");
      banner.style.display = "none";
    } else {
      console.log("Not all tasks are completed.");
    }

    hero.style.animationPlayState = "paused"; // Pause the celebration animation
  }
}

function startFireworks() {
  // Create a fireworks container element
  const fireworksContainer = document.createElement("div");
  fireworksContainer.classList.add("pyro");

  // Create before and after elements for the fireworks
  const beforeElement = document.createElement("div");
  beforeElement.classList.add("before");

  const afterElement = document.createElement("div");
  afterElement.classList.add("after");

  fireworksContainer.appendChild(beforeElement);
  fireworksContainer.appendChild(afterElement);

  document.body.appendChild(fireworksContainer);

  // Remove the fireworks after a certain duration (e.g., 6 seconds)
  setTimeout(() => {
    fireworksContainer.remove();
  }, 6000);
}

function funkyText() {
  const animationDuration = 5000; // 5 seconds in this example

  // Start the animation
  banner.style.animation = "celebrate 2s ease-in-out infinite";

  // After the specified duration, remove the animation
  setTimeout(() => {
    banner.style.animation = "none";
  }, animationDuration);
}

function editTask(taskText, list) {
  let editInput = document.getElementById("editinput");
  editInput.value = taskText; // Set the input field's value to the task text

  let editsubmit = document.getElementById("SubmiteditBtn");
  editsubmit.addEventListener("click", () => {
    if (editInput.value.trim() === "") {
      // Check the value, not the length
      editInput.classList.add("error");
      setTimeout(function () {
        editInput.classList.remove("error");
      }, 2000);
      return;
    }

    list.querySelector(".task-text").textContent = editInput.value;

    const checkbox = list.querySelector(".checkBox");
    if (checkbox.checked) {
      checkbox.checked = false;
    }

    editModal.style.display = "none";
    updateLocalStorage();
    checkCompletionStatus();
  });
}

function addingTasks() {
  let taskInput = document.getElementById("taskinput");
  let task = taskInput.value;

  if (task.length === 0) {
    console.log("oiiiii");
    taskInput.classList.add("error");
    setTimeout(function () {
      taskInput.classList.remove("error");
    }, 2000);
    return;
  }

  addTaskToList(task, false);

  // Clear the task input field after adding
  taskInput.value = "";

  modal.style.display = "none";
  banner.style.display = "none";

  updateLocalStorage();
}

btns.addEventListener("click", () => {
  addingTasks();
});

// Initialize tasks array or load from local storage
window.onload = function () {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    banner.style.display = "none";
  }

  // Add saved tasks to the list
  tasks.forEach((task) => {
    addTaskToList(task.text, task.completed);
  });

  checkCompletionStatus();
};

function updateLocalStorage() {
  // Update local storage with the current task list
  const taskItems = document.querySelectorAll(".task-item");
  const updatedTasks = [];

  taskItems.forEach((taskItem) => {
    const checkbox = taskItem.querySelector(".checkBox");
    const taskText = taskItem.querySelector(".task-text").textContent;

    updatedTasks.push({
      text: taskText,
      completed: checkbox.checked,
    });
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
