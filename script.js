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