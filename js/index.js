
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

    taskCard.appendChild(taskText);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskPriority);

    container.appendChild(taskCard);
}

const task = {
    title: "",
    description: "",
    priority: "",
    status: "en cours",
}

const taskList = []

localStorage.setItem("taskList", JSON.stringify(taskList));
const dialog = document.querySelector("#addNewTask");
const closeDialog = document.querySelector(".close-dialog");
const addNewTaskForm = document.querySelector("#addNewTaskForm");


function openModal(){
    //dialog.style.display = "block";
    dialog.showModal();
}

function closeModal() {
    //dialog.style.display = "none";
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


    addNewTaskForm.reset();
    closeModal();
});

const filterItem = document.querySelector(".filter-item");

filterItem.addEventListener("click", function (event) {
    event.preventDefault();
    filterItem.classList.toggle("active");

    taskList.map((task) => {
        if(task.status === "en cours"){
            createTask(task, onGoingTasks);
        } else {
            createTask(task, finishedTasks);
        }
    })

})




