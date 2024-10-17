var timerFocus;
var timerBreak;

var minutes = 0;
var seconds = 0;

function setTime() {
    timerFocus = document.getElementById("inputTimerFocus").value;
    if (timerFocus) {
        document.getElementById("minutes").innerHTML = timerFocus;
    }
    if (timerFocus > 10) {
        document.getElementById('nullMin').style.display = "none";
    }
    timerBreak = document.getElementById("inputTimerBreak").value;
    if (timerBreak) {
        document.getElementById("showBreak").innerHTML = timerBreak;
    }
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


const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const percentText = document.getElementById('percent');

// Setzt den Maximalwert für stroke-dasharray und -dashoffset
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

// Funktion zum Setzen des Fortschritts
function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    percentText.textContent = `${Math.round(percent)}%`;
}

// Zeitbasierter Fortschritt
function startProgress() {
    elapsedTime = 0;
    intervalSec = setInterval(() => {
        elapsedTime++;
        const percent = (elapsedTime / totalTime) * 100;
        setProgress(Math.min(percent, 100)); // Fortschritt aktualisieren

        if (elapsedTime >= totalTime) {
            clearInterval(intervalSec); // Stopp, wenn Zeit erreicht ist
        }
    }, 1000); // Aktualisierung alle Sekunde
}

var totalTime;
var elapsedTime;


function startSession() {
    if (intervalMin === undefined) {
        setTime();
        if (timerFocus == 0 && timerBreak == 0) {
            alert("Set your time first");
        } else {
            document.getElementById("setTime").style.display = "none";
            minutes = timerFocus;

            startSound.play();

            document.getElementById('message').classList.remove('breakMessage');
            document.getElementById('message').innerHTML = "Session " + counter + " started";
            minutes = minutes - 1;
            if (minutes > 9) {
                document.getElementById('nullMin').style.display = "none";
            }
            document.getElementById('minutes').innerHTML = minutes;

            seconds = 59;
            if (seconds > 9) {
                document.getElementById('nullSec').style.display = "none";
            }
            document.getElementById('seconds').innerHTML = seconds;

            intervalMin = setInterval(minutesTimer, 60000);
            intervalSec = setInterval(secondsTimer, 1000);

            totalTime = timerFocus*60; // Zeit in Sekunden
            elapsedTime = 0;
            startProgress(); // Ring Fortschritt starten

            function minutesTimer() {
                minutes = minutes - 1;
                document.getElementById('minutes').innerHTML = minutes;
                if (minutes <= 9) {
                    document.getElementById('nullMin').style.display = "block";
                } else {
                    document.getElementById('nullMin').style.display = "none";
                }
            }

            function secondsTimer() {
                seconds = seconds - 1;
                document.getElementById('seconds').innerHTML = seconds;
                if (seconds <= 9) {
                    document.getElementById('nullSec').style.display = "block";
                } else {
                    document.getElementById('nullSec').style.display = "none";
                }
                if (seconds <= 0) {
                    if (minutes <= 0) {
                        minutes = 0;
                        clearInterval(intervalMin);
                        clearInterval(intervalSec);
                        intervalSec = null;
                        setProgress(0);
                        startBreak();
                    }
                    seconds = 60;
                }
            }
        }
    } else {
        alert("Timer is already running.");
    }
}


function startBreak() {
    breakSound.play();
    document.getElementById('se' + counter).style.backgroundColor = "var(--tertiary-color)";
    document.getElementById('message').innerHTML = "Take a break";
    document.getElementById('message').classList.add('breakMessage');
    minutes = timerBreak - 1;
    if (minutes > 9) {
        document.getElementById('nullMin').style.display = "none";
    }
    document.getElementById('minutes').innerHTML = minutes;
    seconds = 59;
    if (seconds > 9) {
        document.getElementById('nullSec').style.display = "none";
    }
    document.getElementById('seconds').innerHTML = seconds;

    totalTime = timerBreak*60; // Zeit in Sekunden
    document.getElementById('ringColor').style.stroke = "var(--main-color)";
    startProgress(); // Ring Fortschritt starten

    intervalMin = setInterval(minutesTimer, 60000);
    //intervalSec = setInterval(secondsTimer, 1000);

    function minutesTimer() {
        minutes = minutes - 1;
        document.getElementById('minutes').innerHTML = minutes;
        if (minutes <= 9) {
            document.getElementById('nullMin').style.display = "block";
        } else {
            document.getElementById('nullMin').style.display = "none";
        }
    }

    function secondsTimer() {
        seconds = seconds - 1;
        document.getElementById('seconds').innerHTML = seconds;
        if (seconds <= 9) {
            document.getElementById('nullSec').style.display = "block";
        } else {
            document.getElementById('nullSec').style.display = "none";
        }
        if (seconds <= 0) {
            if (minutes <= 0) {
                minutes = 0;
                document.getElementById('bre' + counter).style.backgroundColor = "var(--main-color)";
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
    for (i = counter; i > 0; i--) {
        document.getElementById('bre' + i).style.backgroundColor = "var(--background-color)";
        document.getElementById('se' + i).style.backgroundColor = "var(--background-color)";
    }
    clearInterval(intervalMin);
    clearInterval(intervalSec);

    setProgress(0);
    totalTime = undefined;
    
    minutes = 0;
    seconds = "00";
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
    document.getElementById('message').classList.remove('breakMessage');
    counter = 1;
    intervalMin = undefined;
    document.getElementById("setTime").style.display = "flex";
}


function pauseSession() {
    alert("You paused the timer. If you click ok, the timer wil resume.");
}





       