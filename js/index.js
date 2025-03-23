const BACKEND_ROOT_URL = 'http://localhost:3001';
import { Todos } from "./class/Todos.js";

const todos = new Todos(BACKEND_ROOT_URL);

const mainList = document.querySelector('ul');
const mainInput = document.querySelector('input');

mainInput.disabled = true;

const renderTask = (task) => {
    const listItem = document.createElement('li')
    listItem.setAttribute('class','list-group-item')
    listItem.setAttribute('data-key',task.getId().toString())
//    listItem.innerHTML = task.getText()
    renderSpan(listItem,task.getText())
    renderLink(listItem,task.getId())
    mainList.append(listItem)
};

const renderSpan = (listItem,text) => {
    const span = listItem.appendChild(document.createElement('span'))
    span.innerHTML = text
};

const renderLink = (listItem,id) => {
    const a = listItem.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>'
    a.setAttribute('style','float: right')
    a.addEventListener('click',(event) => {
        todos.removeTask(id).then((removed_id) => {
            const listItemToRemove = document.querySelector(`[data-key='${removed_id}']`)
            if (listItemToRemove) {
                mainList.removeChild(listItemToRemove)
            }
        }).catch((error) => {
            alert(error)
        })
    })
};

const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })
        mainInput.disabled = false
    }).catch((error) => {
        alert(error)
    })
};

/*
const saveTask = async (task) => {
    try {
        const json = JSON.stringify({description: task})
        const response = await fetch(BACKEND_ROOT_URL + '/new',{
            method: 'post',
            headers: {
                'Content-type':'application/json'
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert("Error saving task due to following error:" + error.message)
    }
};
*/

mainInput.addEventListener('keypress',(event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const task = mainInput.value.trim()
        if (task !== '') {
            todos.addTask(task).then((task) => {
                renderTask(task)
                mainInput.value = ''
                mainInput.focus()
            })
        }
    }
});

getTasks();