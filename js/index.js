const containerTasks = document.querySelector(".container-tasks");
const deleteTaskModal = document.querySelector("#deleteTaskModal");
const cancelButton = document.querySelector(".cancel");
const confirmButton = document.querySelector(".confirm");
const addNewTaskDialog = document.querySelector("#addNewTask");
const closeDialog = document.getElementById("close-dialog");
const addNewTaskForm = document.querySelector("#addNewTaskForm");
const searchBar = document.querySelector("#search");
const filterItems = document.querySelectorAll(".filter-item");

let currentTaskToDelete = null;

// Fonction pour créer une tâche
function createTask(task, container) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    // Création de la checkbox
    const label = document.createElement("label");
    label.setAttribute("for", `task-check-${task.title.replace(/\s+/g, "-")}`);

    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.id = `task-check-${task.title.replace(/\s+/g, "-")}`;
    label.appendChild(taskCheck);
    taskCheck.checked = task.status === "terminées";

    // Création de la carte de tâche
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    // Éléments de la tâche
    const taskText = document.createElement("h2");
    taskText.innerText = task.title;

    const taskDate = document.createElement("p");
    taskDate.innerText = task.date;

    const taskDescription = document.createElement("p");
    taskDescription.innerText = task.description;

    const taskPriority = document.createElement("p");
    taskPriority.innerText = task.priority;

    // Ajout des classes CSS en fonction de la priorité
    if (taskPriority.innerText === "Basse") {
        taskPriority.classList.add("priority-card-low");
    } else if (taskPriority.innerText === "Moyenne") {
        taskPriority.classList.add("priority-card-medium");
    } else if (taskPriority.innerText === "Haute") {
        taskPriority.classList.add("priority-card-high");
    }

    // Bouton de suppression
    const taskDelete = document.createElement("i");
    taskDelete.classList.add("fa-solid", "fa-trash");

    // Construction de la structure de la carte de tâche
    taskCard.appendChild(taskContainer);
    taskContainer.appendChild(label);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(taskDelete);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskPriority);

    container.appendChild(taskCard);

    // Écouteur d'événement pour la suppression d'une tâche
    taskDelete.addEventListener("click", (e) => {
        e.stopPropagation();
        currentTaskToDelete = task;
        deleteTaskModal.showModal();
    });

    // Écouteur d'événement pour changer le statut
    taskCheck.addEventListener("change", () => {
        task.status = taskCheck.checked ? "terminées" : "en cours";

        const tasks = JSON.parse(localStorage.getItem("taskList")) || [];
        const taskIndex = tasks.findIndex(t => t.title === task.title);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = task.status;
            localStorage.setItem("taskList", JSON.stringify(tasks));
        }

        updateTasks();
    });
}

// Fonction pour mettre à jour l'affichage des tâches
function updateTasks() {
    const activeFilter = document.querySelector(".filter-item.active");
    const tasks = JSON.parse(localStorage.getItem("taskList")) || [];

    containerTasks.innerHTML = "";

    if (!activeFilter) return;

    const filterText = activeFilter.innerText.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        if (filterText === "en cours") return task.status.toLowerCase() === "en cours";
        if (filterText === "terminées") return task.status.toLowerCase() === "terminées";
        return true;
    });

    filteredTasks.forEach(task => createTask(task, containerTasks));
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    const defaultFilter = document.querySelector(".filter-item");
    defaultFilter.classList.add("active");

    updateTasks();
});

// Gestion des filtres
filterItems.forEach((filterItem) => {
    filterItem.addEventListener("click", function () {
        filterItems.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
        updateTasks();
    });
});

// Gestion de la modale d'ajout de tâche
function openModal() {
    addNewTaskDialog.showModal();
}

function closeModal() {
    addNewTaskDialog.close();
}

if (closeDialog) {
    closeDialog.addEventListener("click", closeModal);
}

// Ajout d'une nouvelle tâche
addNewTaskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const date = document.getElementById("date").value;

    const task = {
        title: title,
        description: description,
        priority: priority,
        status: "en cours",
        date: date
    };

    const tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    tasks.push(task);
    localStorage.setItem("taskList", JSON.stringify(tasks));

    addNewTaskForm.reset();
    closeModal();
    updateTasks();
});

// Gestion de la barre de recherche
if (searchBar) {
    searchBar.addEventListener("input", function (event) {
        const typedLetters = event.target.value.toLowerCase();
        const tasks = JSON.parse(localStorage.getItem("taskList")) || [];

        containerTasks.innerHTML = "";

        tasks.forEach(task => {
            if (task.title.toLowerCase().includes(typedLetters)) {
                createTask(task, containerTasks);
            }
        });
    });
}

// Fonction pour supprimer une tâche
function deleteTask(task) {
    const tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    const updatedTasks = tasks.filter(t => t.title !== task.title);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
    updateTasks();
}

// Gestion de la confirmation de suppression
confirmButton.addEventListener("click", () => {
    if (currentTaskToDelete) {
        deleteTask(currentTaskToDelete);
        closeDeleteModal();
    }
});

// Fonction pour fermer la modale de suppression
function closeDeleteModal() {
    deleteTaskModal.close();
}

// Gestion de l'annulation de suppression
cancelButton.addEventListener("click", closeDeleteModal);