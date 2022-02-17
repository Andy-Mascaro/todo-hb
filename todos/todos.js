import { checkAuth, createTodo, completeTodo, getTodos, logout, deleteAllTodos, } from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(todoForm);
    const todo = formData.get('todo');
    await createTodo(todo);
    todoForm.reset();
    displayTodos();

    
    // on submit, create a todo, reset the form, and display the todos
});

async function displayTodos() {
    const todos = await getTodos();

    todosEl.textContent = '';
    
    for (let todo of todos) {
        const todoEl = renderTodo(todo);

        todoEl.addEventListener('click', async() => {
            
            await completeTodo(todo.id);
            displayTodos();
        });
        todosEl.append(todoEl);
    }


}
window.addEventListener('load', async() => {
    displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async() => {
    await deleteAllTodos();

    displayTodos();
});





    // fetch the todos
    
    // display the list of todos

    // be sure to give each todo an event listener

    // on click, complete that todo


// add an on load listener that fetches and displays todos on load

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async() => {
    // delete all todos

    // then refetch and display the updated list of todos
});
