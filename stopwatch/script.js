let runWatch = "00:00.00" // base state for stopwatch timer
document.getElementById("timer-text").innerHTML = runWatch; // inserts base state for stopwatch

let timerRunning;
let startTime;
let angle = 100; // this variable is used in the movingBagroung() function. Not sure of a better way to do this.
let laps = 0;

function stopwatchStart() {
    if (runWatch == "00:00.00") {
        startTime = new Date().getTime(); // establishes the starting time
        x = setInterval(function () { // at an established interval,
            movingBackground();
            runWatch = Date.now() - startTime; // finds the amount of time between now and when the watch began
            formatRunWatch(); // nicely puts the info on the stopwatch
        }, 10);
        timerRunning = true;
        resetToLap();
        runningSprite();
    } else if (timerRunning == false) {
        startTime = new Date().getTime(); // establishes the starting time
        x = setInterval(function () { // at an established interval,
            movingBackground();
            runWatch = Date.now() - startTime + unpausedRunWatch; // finds the amount of time between now and when the watch began (while accounting for the time already elapsed pre-pause)
            formatRunWatch(); // nicely puts the info on the stopwatch
        }, 10);
        timerRunning = true;
        resetToLap();
        runningSprite();
    }
}

function stopwatchStop() {
    clearInterval(x); // ceases the every-millisecond stopwatch
    unpausedRunWatch = runWatch; // stores the value of time elapsed for when you unpause the stopwatch
    lapToReset();
    if (timerRunning == true) {
        restingSprite();
    };
    timerRunning = false;
}

function stopwatchLapReset() {
    if (timerRunning == false) {
        runWatch = "00:00.00" // resets the stopwatch (to a *string*, yeah yeah, I know)
        document.getElementById("timer-text").innerHTML = runWatch; // prints the new stopwatch value to the HTML doc
        removeChildren({ parentId: 'lap-display', childName: 'pip' }); // gets rid of all the laps that have been added
        laps = 0; // resets lap # counter
        clearInterval(restID);
        document.getElementById("sprite").style.background = `url('assets/idle.png') -2px 0px`
    } else if (timerRunning == true) {
        laps++; // adds a lap
        let pip = document.createElement("pip"); // creates lap containers
        let lap = document.createTextNode("Lap " + laps + '\xa0'.repeat(20) + runWatchFormatted); // creates "lap x - 00:00.00" 
        pip.appendChild(lap);
        document.getElementById("lap-display").appendChild(pip); // puts dem pips in dere
    }
}

function lapToReset() {
    document.getElementById("reset").textContent = "Reset";
}

function resetToLap() {
    document.getElementById("reset").textContent = "Lap";
}

function movingBackground() { // this fun lil function makes it so that the background subtly changes while the stopwatch runs
    angle = angle - .6;
    document.body.style.background = "linear-gradient(" + angle + "deg, rgba(162,197,254,1) 0%, rgba(194,233,252,1) 100%)";
}

function removeChildren(params) { // removes all the laps previously established (used in the stopwatchLapReset() function)
    let parentId = params.parentId;
    let childName = params.childName;

    let childNodesToRemove = document.getElementById(parentId).getElementsByTagName(childName);
    for (let i = childNodesToRemove.length - 1; i >= 0; i--) {
        let childNode = childNodesToRemove[i];
        childNode.parentNode.removeChild(childNode);
    }
}

function formatRunWatch() {
    distanceMinutes = Math.floor((runWatch % (1000 * 60 * 60)) / (1000 * 60)); // the difference between now and the starting time
    distanceSeconds = Math.floor((runWatch % (1000 * 60)) / 1000);
    distanceCenti = Math.floor((runWatch % 1000) / 10);
    runWatchFormatted = distanceMinutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + distanceSeconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + "." + distanceCenti.toLocaleString(undefined, { minimumIntegerDigits: 2 });
    document.getElementById("timer-text").innerHTML = runWatchFormatted // is printed nicely to the doc
}

// const positionCalc = (document.getElementById("sprite").style) / 27 * 48; // [NOT WORKING] this find the actual position change size so that I can change the size of the sprite in the css file and it won't break. 
let runID;
let restID;

function runningSprite() {
    let position = 2;
    const interval = 150;
    clearInterval(restID);

    runID = setInterval(function () {
        document.getElementById("sprite").style.background = `url('assets/walk.png') -${position}px 0px`
        if (position < 192) {
            position = position + 80;
        } else {
            position = 2;
        }
    }, interval);
}

function restingSprite() {
    let position = 2;
    const interval = 250;
    clearInterval(runID);

    restID = setInterval(function () {
        document.getElementById("sprite").style.background = `url('assets/idle.png') -${position}px 0px`
        if (position < 192) {
            position = position + 80;
        } else {
            position = 2;
        }
    }, interval);
}