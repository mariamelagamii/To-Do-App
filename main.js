const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function createSelectElement(status) {
    const select = document.createElement("select");
    const options = ["To Do", "In Progress", "Done"];
    options.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText.toLowerCase().replace(" ", "_");
        option.textContent = optionText;
        if (option.value === status) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    updateSelectColor(select);
    select.addEventListener("change", function () {
        updateSelectColor(select);
    });

    return select;
}

function updateSelectColor(select) {
    switch (select.value) {
        case "to_do":
            select.style.backgroundColor = "#f8d7da"; 
            break;
        case "in_progress":
            select.style.backgroundColor = "#fff3cd"; 
            break;
        case "done":
            select.style.backgroundColor = "#d4edda";
            break;
        default:
            select.style.backgroundColor = "#ffffff";
    }
}

function createTaskElement(taskText, status = "to_do") {
    let li = document.createElement("li");
    li.textContent = taskText;

    const select = createSelectElement(status);
    li.appendChild(select);

    if (status === "done") {
        li.classList.add("checked");
    }

    select.addEventListener("change", function () {
        li.classList.toggle("checked", this.value === "done");
        saveData();
    });

    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    span.addEventListener('click', () => {
        li.remove();
        saveData();
    });
    li.appendChild(span);

    return li;
}

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }
    listContainer.appendChild(createTaskElement(inputBox.value));
    inputBox.value = '';
    saveData();
}

function saveData() {
    const tasks = Array.from(listContainer.children).map(li => ({
        text: li.childNodes[0].nodeValue.trim(),
        status: li.querySelector("select").value
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    listContainer.innerHTML = '';
    tasks.forEach(task => {
        listContainer.appendChild(createTaskElement(task.text, task.status));
    });
}

showTask();
