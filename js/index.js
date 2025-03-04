
// Gestion de la sidebar
function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
}

const containerTasks = document.querySelector(".container-tasks");

// Créer une carte tâche
function createTask(task, container) {

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const label = document.createElement("label");
    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.id = "task-check";
    label.appendChild(taskCheck);



    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const taskText = document.createElement("h2");
    taskText.innerText = task.title;

    const taskDate = document.createElement("p");
    taskDate.innerText = task.date;

    const taskDescription = document.createElement("p");
    taskDescription.innerText = task.description;

    const taskPriority = document.createElement("p");
    taskPriority.innerText = task.priority;
    if(taskPriority.innerText === "Basse") {
        taskPriority.classList.add("priority-card-low");
    } else if(taskPriority.innerText === "Moyenne") {
        taskPriority.classList.add("priority-card-medium");
    } else if(taskPriority.innerText === "Haute") {
        taskPriority.classList.add("priority-card-high");
    } else {
        taskPriority.classList.add("priority-card-none");
    }

    const taskOptions = document.createElement("i");
    taskOptions.innerHTML = "<i class=\"fa-solid fa-ellipsis-vertical\"></i>";

    taskCard.appendChild(taskContainer);
    taskContainer.appendChild(label);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(taskOptions);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskPriority);


    container.appendChild(taskCard);

    taskCheck.addEventListener("change", () => {
        if (taskCheck.checked) {
            task.status = "terminées";
        } else {
            task.status = "en cours";
        }

    })

}

// Au rechargement, récupérer les tâches existantes
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
document.addEventListener("DOMContentLoaded", () => {
    taskList.forEach(task => {
            createTask(task, containerTasks);
    })
});


// Afficher les tâches en fonction de leur statut (en cours, terminées)
const filterItems = document.querySelectorAll(".filter-item");


filterItems.forEach((filterItem) => {
    filterItem.addEventListener("click", function (event) {
        filterItems.forEach((filterItem) => {
            filterItem.classList.remove("active");
        })
        event.preventDefault();
        //console.log("Filter item is clicked")
        filterItem.classList.toggle("active");
        const tasks = JSON.parse(localStorage.getItem("taskList")) || [];

        containerTasks.innerHTML = "";

        if (tasks.length > 0) {
            if (filterItem.innerText.toLowerCase() === "en cours") {
                const filteredTasks = tasks.filter((item) => {
                    if (item.status.toLowerCase() === "en cours") {
                        return item
                    }
                })
                filteredTasks.forEach(task => {
                    createTask(task, containerTasks)
                })
            } else if (filterItem.innerText.toLowerCase() === "terminées") {
                const filteredTasks = tasks.filter((item) => {
                    if (item.status.toLowerCase() === "terminées") {
                        return item
                    }
                })
                filteredTasks.forEach(task => {
                    createTask(task, containerTasks)
                })
            } else {
                tasks.forEach(task => {
                    createTask(task, containerTasks);
                })
            }
        }

    })
})


// Gestion de l'ouverture du dialog (modale)
const dialog = document.querySelector("#addNewTask");
const closeDialog = document.querySelector(".close-dialog");
const addNewTaskForm = document.querySelector("#addNewTaskForm");


function openModal() {
    dialog.showModal();
}

function closeModal() {
    dialog.close();
}

closeDialog.addEventListener("click", closeModal);

// Ajouter une nouvelle tâche
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

    createTask(task, containerTasks);
    taskList.push(task);

    localStorage.setItem("taskList", JSON.stringify(taskList));

    addNewTaskForm.reset();
    closeModal();
});

// Deplacer une tâche dans "terminées"



// Barre de recherche
const searchBar = document.querySelector("#search");
searchBar.addEventListener("input", function (event) {
    event.preventDefault();
    const typedLetters = event.target.value.toLowerCase();
    console.log("Typed Letters : ", typedLetters);

    const tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    tasks.forEach((task, index) => {
        if(task.title.toLowerCase().includes(typedLetters)) {
           createTask(task, containerTasks);
        }
    })
})





