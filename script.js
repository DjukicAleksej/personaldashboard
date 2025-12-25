//time
function updateTime(){
    const timeEl = document.getElementById('time');
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString();
}

setInterval(updateTime,1000);
updateTime();