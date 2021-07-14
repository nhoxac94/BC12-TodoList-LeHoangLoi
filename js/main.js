import Todo from "./Todo.js";
import { TodoList } from "./TodoList.js";
import localStorage from "./localStorage.js"

const todo = new Todo();

const getEle = (id) => document.getElementById(id);

const checkTask = (index) => {
    TodoList.todos[index].completed = !TodoList.todos[index].completed;
    render(TodoList.todos);  
    localStorage.set(TodoList.todos)   

}

const removeTask = (index) => {
    TodoList.todos.splice([index],1)   
    render(TodoList.todos);  
    localStorage.set(TodoList.todos)   
}


window.checkTask = checkTask;
window.removeTask = removeTask;

const render = (todos) => {   
    
    if (todos) {
        const renderList = (todoList) => {    
            return todoList.map((todo) =>  `
            <li>
                ${todo.title}
                <div class= "buttons">
                    <button class = "remove" onclick = "removeTask(${TodoList.todos.indexOf(todo)})">
                        <i class="fa fa-trash-alt"></i></button>
                    <button 
                        class = "complete"
                        onclick = "checkTask(${TodoList.todos.indexOf(todo)})"   
                    >
                        <i class="${todo.completed === true && 'fas' } fa fa-check-circle"></i></button>
                </div>
            </li>
            `)
            .join("");
        }       
        
    
        getEle('todo').innerHTML = renderList(todos.filter((todo) => todo.completed === false))    
        getEle('completed').innerHTML = renderList(todos.filter((todo) => todo.completed === true))
    }        
        
}

render(TodoList.todos);

// add new task
const addNewTodo = () => {
    const nesTask = getEle('newTask').value.trim();
    TodoList.add(nesTask)
    getEle('newTask').value = ''
    render(TodoList.todos);
    localStorage.set(TodoList.todos)
}


// sort a to z
const sortAToZ = () => {
    console.log(TodoList.todos);
    const sortTaskAtoZ = TodoList.todos.map(todo => ([todo.title.toLowerCase() ,todo.completed].join('_'))).sort()
    .map(sort => {    
        return {title:(sort.split('_')[0][0].toUpperCase() + sort.split('_')[0].slice(1)) , completed:(sort.split('_')[1]) === "false" && false ||  sort.split('_')[1] === "true" && true}
    })  

    TodoList.todos = sortTaskAtoZ;    
    render(TodoList.todos)  
    // localStorage.set(TodoList.todos)
    
}

// sort z to a
const sortZToA = () => {
    console.log(TodoList.todos);
    const sortTaskZtoA = TodoList.todos.map(todo => ([todo.title.toLowerCase() ,todo.completed].join('_'))).reverse()
    .map(reverse => {    
        return {title:(reverse.split('_')[0][0].toUpperCase() +reverse.split('_')[0].slice(1)), completed:(reverse.split('_')[1]) === "false" && false ||  reverse.split('_')[1] === "true" && true}
    })  

    TodoList.todos = sortTaskZtoA;    
    render(TodoList.todos)  
    // localStorage.set(TodoList.todos)
    
}


const getToDay = () => {
    let toDay = new Date();
    const month = []
        month[0] = 'Jan';
        month[1] = 'Feb';
        month[2] = 'Mar';
        month[3] = 'Apr';
        month[4] = 'May';
        month[5] = 'Jun';
        month[6] = 'Jul';
        month[7] = 'Aug';
        month[8] = 'Sep';
        month[9] = 'Oct';
        month[10] = 'Nov';
        month[11] = 'Dec';

    
    return `${month[toDay.getMonth()]} ${toDay.getDate()}, ${toDay.getFullYear()}`
}
getEle('addItem').onclick = addNewTodo;
getEle('newTask').onkeyup = (e) => {e.keyCode === 13 && addNewTodo() };



// Show complete task
getEle('one').onclick = () => getEle('todo').style.display = 'none';

// Show all task
getEle('all').onclick = () => getEle('todo').style.display = 'block';

// Show sort task a - z

getEle('two').onclick = sortAToZ;

// Show sort task z - a

getEle('three').onclick = sortZToA;

getEle('toDay').innerHTML = getToDay();





    
