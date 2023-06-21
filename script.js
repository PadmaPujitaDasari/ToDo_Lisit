const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("add");

let todos = [];

create_btn_el.addEventListener('click', CreateNewTodo);

function CreateNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false,

    }

    todos.unshift(item);

    const { item_el, input_el, priority_select_el } = CreateTodoElement(item);

    list_el.prepend(item_el);

    input_el.removeAttribute("disabled");
    input_el.focus();

    Save();
}


function CreateTodoElement(item) {
    const item_el = document.createElement("div");
    item_el.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if (item.complete) {
        item_el.classList.add("complete");
    }
    


    const input_el = document.createElement("input");
    input_el.type = "text";
    input_el.value = item.text;
    input_el.setAttribute("disabled", "");


    const due_date_input = document.createElement("input");
    due_date_input.type = "date";
    due_date_input.value = item.dueDate || "";





    const priority_select_el = document.createElement("select");

    const default_option_el = document.createElement("option");
    default_option_el.disabled = true;
    default_option_el.selected = true;
    default_option_el.text = 'Set Priority';
    priority_select_el.appendChild(default_option_el);

    const low_option_el = document.createElement("option");
    low_option_el.value = "low";
    low_option_el.text = "Low";
    priority_select_el.appendChild(low_option_el);

    const medium_option_el = document.createElement("option");
    medium_option_el.value = "medium";
    medium_option_el.text = "Medium";
    priority_select_el.appendChild(medium_option_el);

    const high_option_el = document.createElement("option");
    high_option_el.value = "high";
    high_option_el.text = "High";
    priority_select_el.appendChild(high_option_el);

    if (item.priority) {
        priority_select_el.value = item.priority;
    }


    const actions_el = document.createElement("div");
    actions_el.classList.add("actions");

    const edit_btn_el = document.createElement("button");
    edit_btn_el.classList.add("material-icons");
    edit_btn_el.innerHTML = "<span class='material-symbols-outlined'>edit_note</span>";

    const remove_btn_el = document.createElement("button");
    remove_btn_el.classList.add("material-icons", "remove-btn");
    remove_btn_el.innerHTML = '<span class="material-symbols-outlined">cancel</span>';

    actions_el.append(edit_btn_el);
    actions_el.append(remove_btn_el);

    item_el.append(checkbox);
    item_el.append(input_el);
    item_el.appendChild(due_date_input);
    item_el.appendChild(priority_select_el);
    item_el.append(actions_el);

    // EVENTS
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;

        if (item.complete) {
            item_el.classList.add("complete");
            // item_el.style.backgroundColor = "#5f6376";
            // input_el.style.textDecoration = "line-through";
        }
        else {
            item_el.classList.remove("complete");
            // item_el.style.backgroundColor = "#2a3049";
            // input_el.style.textDecoration = "none";
        }
        Save();
    });

    input_el.addEventListener("input", () => {
        item.text = input_el.value;
    });

    input_el.addEventListener("blur", () => {
        input_el.setAttribute("disabled", "");
        Save();
    });

    due_date_input.addEventListener("input", () => {
        item.dueDate = due_date_input.value;
        Save();
    });

    due_date_input.addEventListener("blur", () => {
    due_date_input.setAttribute("disabled", "");
        Save();
    });

    priority_select_el.addEventListener("change", () => {
        item.priority = priority_select_el.value;
        
    });

    priority_select_el.addEventListener("blur", () => {
        priority_select_el.setAttribute("disabled", "");
        Save();
    });

    edit_btn_el.addEventListener("click", () => {
        input_el.removeAttribute("disabled");
        priority_select_el.removeAttribute("disabled");
        due_date_input.removeAttribute("disabled");
        input_el.focus();
    });

    remove_btn_el.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);

        item_el.remove();

        Save();
    });

    return { item_el, input_el, edit_btn_el, remove_btn_el, priority_select_el, due_date_input }
}


  
function DisplayTodos() {
    Load();

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];

        const { item_el } = CreateTodoElement(item);

        list_el.append(item_el);
    }
}


DisplayTodos();

function Save() {
    const save = JSON.stringify(todos);

    localStorage.setItem("my_todos", save);
}

function Load() {
    const data = localStorage.getItem("my_todos");

    if (data) {
        todos = JSON.parse(data);
    }
}



  