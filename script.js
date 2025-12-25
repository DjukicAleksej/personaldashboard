//time
function updateTime(){
    const timeEl = document.getElementById('time');
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString();
}

setInterval(updateTime,1000);
updateTime();

const quotes =[
    "Stay hungry, stay foolish.",
    "Do something today that your future self will thank you for.",
    "Dream big and dare to fail.",
    "Code is like humor. When you have to explain it, it's bad."
];

let quoteIndex = 0;
const quoteEl = document.getElementById('quote');
const nextQuoteBtn = document.getElementById('next-quote');
function showQuote(){
    quoteEl.textContent = quotes[quoteIndex];
}

nextQuoteBtn.addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    showQuote();
});
showQuote();

//todo

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify([...todoList.querySelectorAll('li')].map(li => li.textContent)));
}


function loadTodos() {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]');
    saved.forEach(todo => addTodo(todo));
}

function addTodo(text) {
    const li = document.createElement('li');
    li.textContent = text;
    li.addEventListener('click', () => {
        li.classList.toggle('done');
        saveTodos();
    });
    li.addEventListener('dblclick',() => {
        li.remove();
        saveTodos();
    });

    todoList.appendChild(li);
    saveTodos();
}

todoInput.addEventListener('keypress', e => {
    if(e.key === 'Enter' && todoInput.value.trim() !== ''){
        addTodo(todoInput.value.trim());
        todoInput.value = '';
    }
});
loadTodos();

// -- COUNDOWN CARD ---
const countdownEl = document.getElementById('countdown');
const targetDate = new Date("2026-01-01T00:00:00");

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    const days = Math.floor(diff / (1000*60 * 60 * 24));
    const hours = Math.floor((diff/ (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff/ (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown,1000);
updateCountdown();





