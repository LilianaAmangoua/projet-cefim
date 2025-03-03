
function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
}

const containerTasks = document.querySelector(".container-tasks");
const onGoingTasks = document.querySelector(".container-ongoingTask");
const finishedTasks = document.querySelector(".container-finished");


function createTask(task, container) {

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

    const taskOptions = document.createElement("i");
    taskOptions.innerHTML = "<i class=\"fa-solid fa-ellipsis-vertical\"></i>";

    taskCard.appendChild(taskText);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskPriority);
    taskCard.appendChild(taskOptions);

    container.appendChild(taskCard);
}

const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
document.addEventListener("DOMContentLoaded", () => {
    taskList.forEach(task => {
        if (task.status.toLowerCase() === "en cours") {
            createTask(task, onGoingTasks);
        } else if (task.status.toLowerCase() === "terminé") {
            createTask(task, finishedTasks);
        } else {
            createTask(task, containerTasks);
        }
    })
});

const filterItems = document.querySelectorAll(".filter-item");


filterItems.forEach((filterItem) => {
    filterItem.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Filter item is clicked")
        filterItem.classList.toggle("active");
        const tasks = JSON.parse(localStorage.getItem("taskList")) || [];

        containerTasks.innerHTML = "";
        onGoingTasks.innerHTML = "";
        finishedTasks.innerHTML = "";

        if (tasks.length > 0) {
            if (filterItem.innerText.toLowerCase() === "en cours") {
                const filteredTasks = tasks.filter((item) => {
                    if (item.status.toLowerCase() === "en cours") {
                        return item
                    }
                })
                filteredTasks.forEach(task => {
                    createTask(task, onGoingTasks)
                })
            } else if (filterItem.innerText.toLowerCase() === "terminées") {
                const filteredTasks = tasks.filter((item) => {
                    if (item.status.toLowerCase() === "terminées") {
                        return item
                    }
                })
                filteredTasks.forEach(task => {
                    createTask(task, finishedTasks)
                })
            } else {
                tasks.forEach(task => {
                    createTask(task, containerTasks);
                })
            }
        }

    })
})


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





