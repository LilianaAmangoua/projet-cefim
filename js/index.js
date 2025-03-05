
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
    label.setAttribute("for", `task-check-${task.title.replace(/\s+/g, "-")}`);

    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.id = `task-check-${task.title.replace(/\s+/g, "-")}`;
    label.appendChild(taskCheck);

    taskCheck.checked = task.status === "terminées";


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


    if(container){
        container.appendChild(taskCard);
    }


    taskCheck.addEventListener("change", () => {
        task.status = taskCheck.checked ? "terminées" : "en cours";

        // Mettre à jour le localStorage
        const tasks = JSON.parse(localStorage.getItem("taskList"));
        const taskIndex = tasks.findIndex(t => t.title === task.title);
        if(taskIndex !== -1) {
            tasks[taskIndex].status = task.status;
            localStorage.setItem("taskList", JSON.stringify(tasks));
        }

        containerTasks.innerHTML = "";
        tasks.forEach(task => {
            createTask(task, containerTasks);
        })

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
const addNewTaskDialog = document.querySelector("#addNewTask");
const closeDialog = document.getElementById("close-dialog");
const addNewTaskForm = document.querySelector("#addNewTaskForm");

function openModal() {
    addNewTaskDialog.showModal();
}

function closeModal() {
    addNewTaskDialog.close();
}

if(closeDialog){
    closeDialog.addEventListener("click", closeModal);
}


// Ajouter une nouvelle tâche
if(addNewTaskForm){
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
}


// Barre de recherche
const searchBar = document.querySelector("#search");
if(searchBar) {
    searchBar.addEventListener("input", function (event) {
        event.preventDefault();
        const typedLetters = event.target.value.toLowerCase();
        console.log("Typed Letters : ", typedLetters);

        containerTasks.innerHTML = "";

        const tasks = JSON.parse(localStorage.getItem("taskList")) || [];
        tasks.forEach((task, index) => {
            if (task.title.toLowerCase().includes(typedLetters)) {
                createTask(task, containerTasks);
            }
        })
    })
} else {
    console.log("L'élément n'existe pas sur cette page");
}


// Créer une notification
const tasks = JSON.parse(localStorage.getItem("taskList"));
const todaysDate = new Date();

tasks.forEach(task => {
    const taskDate = new Date(task.date)
    const timeDiff = todaysDate - taskDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if(daysLeft === 2){
        createNotification(task);
    }
})

const main = document.getElementById("notifications");

function createNotification(task) {
    const container = document.createElement("div");
    main.appendChild(container);

    const sentence = document.createElement("p");
    container.appendChild(sentence);

    const taskName = document.createElement("span");
    taskName.innerText = task.name;

    sentence.innerText = `Il vous reste 2 jours pour terminer la tâche : ${taskName.innerText}`;
    sentence.appendChild(taskName);




}





