var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');

var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');

var bm = document.getElementById('b_minutes');
var bs = document.getElementById('b_seconds');


var startTimer;

var startSound = new Audio("DigitalClickPrimax.mp3");
var pauseSound = new Audio("TypewriterBellRamsamba.wav");
var stopSound = new Audio("DigitalClickReversePrimax.mp3")

start.addEventListener('click', function() {
    if(startTimer === undefined){
        startTimer =setInterval(timer, 1000);
        startSound.play();
    } else {
        alert("Timer is already running.");
    }
})

stop.addEventListener('click', function(){
    stopInterval();
    stopSound.play();
    startTimer = undefined;
})


reset.addEventListener('click', function(){
    wm.innerText = 45;
    ws.innerText = "00";
    bm.innerText = 15;
    bs.innerText = "00";
    document.getElementById('counter').innerText = 0;
    stopInterval();
    stopSound.play();
    startTimer = undefined;
})

// Function to start the timer
function timer() {
    // Work Timer Countdown
    if(ws.innerText != 0) {
        document.getElementById('message').innerHTML = "Session started";
        ws.innerText--;
    } else if(wm.innerText != 0 && ws.innerText == 0) {
        ws.innerText = 59;
        wm.innerText --;
    }

    // Break Timer Countdown
    if(wm.innerText == 0 && ws.innerText == 0) {
        pauseSound.play();
        document.getElementById('message').innerHTML = "Session completed: Take a break.";
        document.getElementById('message').classList.add('breakMessage');
        if(bs.innerText != 0) {
            bs.innerText--;     
        } else if(bm.innerText != 0 && bs.innerText == 0) {
            bs.innerText = 59;
            bm.innerText --;
        }
    }

    // Cycle Counter
    if(wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0) {
        wm.innerText = 45;
        ws.innerText = "00";
        bm.innerText = 15;
        bs.innerText = "00";
        document.getElementById('message').innerHTML = "Session started";
        document.getElementById('message').classList.remove('breakMessage');
        document.getElementById('counter').innerText++;
        startSound.play();

    }
}


// Function to stop the timer
function stopInterval() {
    clearInterval(startTimer);
}
