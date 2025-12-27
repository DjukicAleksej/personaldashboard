//time
function updateTime(){
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString();

    const options = {month: 'short',day:'numeric'};
    dateEl.textContent = now.toLocaleDateString('en-Us',options);
}

setInterval(updateTime,1000);
updateTime();

const quotes =[
    "Stay hungry, stay foolish.",
    "Do something today that your future self will thank you for.",
    "Dream big and dare to fail.",
    "Code is like humor. When you have to explain it, it's bad.",
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
document.getElementById('scroll-to-todos')
.addEventListener('click', () => {
    document.getElementById('todos')
    .scrollIntoView({behavior: 'smooth'});
});
window.addEventListener('scroll', () => {
    const arrow = document.getElementById('scroll-to-todos');
    arrow.style.opacity = window.scrollY > 100 ? '0' : '0.67';
});
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function saveTodos(){
   const todos = [];
   document.querySelectorAll ('.todo-item').forEach(item => {
    todos.push({
        text: item.querySelector('span').textContent,
        done: item.classList.contains('done')
    });
  });

  localStorage.setItem('todos' , JSON.stringify(todos));
}

let timer;
let minutes =15;
let seconds=0;
let isPaused = false;
let enteredTime = null;

function startTimer(){
    timer = setInterval(updateTimer,1000);
}

function updateTimer(){
    const timerElement = document.getElementById('timer');
    timerElement.textContent =
    formatTime(minutes,seconds);

    if(minutes===0 && seconds===0){
        clearInterval(timer);
        alert('Time is up! Take a break.');
    } else if (!isPaused){
        if(seconds>0){
            seconds--;
        }else {
            seconds=59;
            minutes--;
        }
    }
}

function formatTime(minutes,seconds){
    return
    `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}
function togglePauseResume () {
    const pauseResumeButton =
    document.querySelector('.control-buttons button');
    isPaused = !isPaused;
    if(isPaused) {
        clearInterval(timer);
        pauseResumeButton.textContent = 'Resume';
    }else {
        startTimer();
        pauseResumeButton.textContent = 'Pause';
    }
}
function restartTimer(){
    clearInterval(timer);
    minutes = enteredTime || 15;
    seconds = 0;
    isPaused = false;
    const timerElement =
    document.getElementById('timer');
    const pauseResumeButton =
    document.querySelector('.control-buttons button');
    pauseResumeButton.textContent = 'Pause';
    startTimer();
}

function chooseTime(){
    const newTime = prompt('Enter new time in minutes:');
    if(!isNaN(newTime) && newTime > 0){
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
    }
}

function loadTodos() {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]');
    saved.forEach(todo => addTodo(todo.text,todo.done));
}



function addTodo(text, done = false) {
    const li = document.createElement('li');
    li.className = "todo-item";
    if(done) li.classList.add("done");

    const span = document.createElement('span');
    span.textContent = text;

    li.addEventListener('click', () => {
        li.classList.toggle('done');
        saveTodos();
    });
   
    const actions = document.createElement('div');
    actions.className = 'todo-actions';
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done-btn');
    doneBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>
    `;
    doneBtn.onclick = (e) => {
        e.stopPropagation();
        li.classList.toggle('done');
        saveTodosDebounced();
    }

    const editBtn = document.createElement('button');
    editBtn.textContent='✏️';
    editBtn.onclick = (e) => {
        e.stopPropagation();
        const newText = prompt('Edit task:',span.textContent);
        if(newText) {
            span.textContent = newText;
            saveTodosDebounced();
        }
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent='🗑';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        saveTodosDebounced();
    }

    actions.append( doneBtn, editBtn, deleteBtn);
    li.append(span, actions);
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

function updateStats() {
    const todos = document.querySelectorAll('.todo-item');
    const doneCount = document.querySelectorAll('.todo-item.done').length;
    const remainingCount = todos.length - doneCount;

    document.getElementById('done-count').textContent = doneCount;
    document.getElementById('remaining-count').textContent = remainingCount;

    const streak = parseInt(localStorage.getItem('streak') || '0');
    if(doneCount === todos.length && todos.length > 0){
        localStorage.setItem('streak',streak+1);
    }
    document.getElementById('streak-count').textContent = localStorage.getItem('streak') || '0';
}


function saveTodosDebounced(){
    saveTodos();
    updateStats();
}

updateStats();



