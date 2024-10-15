var timerFocus;
var timerBreak;

var minutes = "00";
var seconds = "00";

function setTime() {
    timerFocus = document.getElementById("inputTimerFocus").value;
    if (timerFocus){
        document.getElementById("minutes").innerHTML = timerFocus;   
    }

    timerBreak = document.getElementById("inputTimerBreak").value;
    if (timerBreak){
        document.getElementById("showBreak").innerHTML = timerBreak;    
    } 

    document.getElementById("setTime").style.display = "none"; 
}

var intervalMin;
var intervalSec;

var counter = 1;

function template() {
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
}


var startSound = new Audio("DigitalClickPrimax.mp3");
var breakSound = new Audio("TypewriterBellRamsamba.wav");
var stopSound = new Audio("DigitalClickReversePrimax.mp3");



function startSession() {
    minutes = timerFocus;
    if(intervalMin === undefined) { 
        startSound.play();
        document.getElementById('message').classList.remove('breakMessage');
        document.getElementById('message').innerHTML = "Session " + counter + " started";
        minutes = minutes - 1;
        document.getElementById('minutes').innerHTML = minutes;
        seconds = 59;
        document.getElementById('seconds').innerHTML = seconds;

        intervalMin = setInterval(minutesTimer,60000);
        intervalSec = setInterval(secondsTimer,1000);

        function minutesTimer() {
            minutes = minutes - 1;
            document.getElementById('minutes').innerHTML = minutes;
        }

        function secondsTimer() {
            seconds = seconds - 1;
            document.getElementById('seconds').innerHTML = seconds;

            if(seconds <= 0) {
                if(minutes <= 0) {
                    minutes = 0;
                    clearInterval(intervalMin);
                    clearInterval(intervalSec);
                    startBreak();                   
                }
                seconds = 60;
            }
        }  
    } else {
        alert("Timer is already running.");
    }
}


function startBreak() {
    breakSound.play();
    document.getElementById('message').innerHTML = "Take a break";
    document.getElementById('message').classList.add('breakMessage');
    minutes = timerBreak - 1;
    document.getElementById('minutes').innerHTML = minutes;
    seconds = 59;
    document.getElementById('seconds').innerHTML = seconds;

    intervalMin = setInterval(minutesTimer,60000);
    intervalSec = setInterval(secondsTimer,1000);

    function minutesTimer() {
        minutes = minutes - 1;
        document.getElementById('minutes').innerHTML = minutes;
    }

    function secondsTimer() {
        seconds = seconds - 1;
        document.getElementById('seconds').innerHTML = seconds;

        if(seconds <= 0) {
            if(minutes <= 0) {
                minutes = 0;
                counter = counter + 1;
                clearInterval(intervalMin);
                clearInterval(intervalSec);
                intervalMin = undefined;
                startSession();                   
            }
            seconds = 60;
        }
    }  
}



function resetSession() {
    stopSound.play();
    clearInterval(intervalMin);
    clearInterval(intervalSec);
    minutes = "00";
    seconds = "00";
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
    document.getElementById('message').classList.remove('breakMessage');
    counter = 1;
    intervalMin = undefined;
    document.getElementById("setTime").style.display = "flex"; 
     
}


