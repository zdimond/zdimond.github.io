let runWatch = "00:00.00"
document.getElementById("timer-text").innerHTML = runWatch;
let timerRunning;
let startTime;
let angle = 100;
let laps = 0; // this is a variable in the function 

function stopwatchStart() {
    if (runWatch == "00:00.00") {
        startTime = new Date().getTime(); // establishes the starting time
        x = setInterval(function () { // at an established interval,
            movingBackground();
            runWatch = Date.now() - startTime;
            distanceMinutes = Math.floor((runWatch % (1000 * 60 * 60)) / (1000 * 60)); // the difference between now and the starting time
            distanceSeconds = Math.floor((runWatch % (1000 * 60)) / 1000);
            distanceCenti = Math.floor((runWatch % 1000) / 10);
            runWatchFormatted = distanceMinutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + distanceSeconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + "." + distanceCenti.toLocaleString(undefined, { minimumIntegerDigits: 2 });
            document.getElementById("timer-text").innerHTML = runWatchFormatted // is printed to the doc
        }, 10);
        timerRunning = true;
        resetToLap();
    } else if (timerRunning == false) {
        startTime = new Date().getTime(); // establishes the starting time
        x = setInterval(function () { // at an established interval,
            movingBackground();
            runWatch = Date.now() - startTime + unpausedRunWatch;
            distanceMinutes = Math.floor((runWatch % (1000 * 60 * 60)) / (1000 * 60)); // the difference between now and the starting time
            distanceSeconds = Math.floor((runWatch % (1000 * 60)) / 1000);
            distanceCenti = Math.floor((runWatch % 1000) / 10);
            runWatchFormatted = distanceMinutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + distanceSeconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + "." + distanceCenti.toLocaleString(undefined, { minimumIntegerDigits: 2 });
            document.getElementById("timer-text").innerHTML = runWatchFormatted // is printed to the doc
        }, 10);
        timerRunning = true;
        resetToLap();
    }
}

function stopwatchStop() {
    clearInterval(x);
    timerPaused = true;
    timerRunning = false;
    unpausedRunWatch = runWatch;
    lapToReset();
}

function stopwatchLapReset() {
    if (timerRunning == false) {
        runWatch = "00:00.00"
        document.getElementById("timer-text").innerHTML = runWatch;
        removeChildren({parentId:'lap-display',childName:'pip'});
        laps = 0;
    } else if (timerRunning == true) {
        laps++;
        let pip = document.createElement("pip");
        let lap = document.createTextNode("Lap " + laps + '\xa0'.repeat(20) + runWatchFormatted); // Print "lap x - 00:00.00" below
        pip.appendChild(lap);
        document.getElementById("lap-display").appendChild(pip);
    }
}

function lapToReset() {
    document.getElementById("reset").textContent = "Reset";
}

function resetToLap() {
    document.getElementById("reset").textContent = "Lap";
}

function movingBackground() {
    angle = angle + .6;
    document.body.style.background =  "linear-gradient(" + angle + "deg, rgba(162,197,254,1) 0%, rgba(194,233,252,1) 100%)";
}

function removeChildren (params){
    let parentId = params.parentId;
    let childName = params.childName;

    let childNodesToRemove = document.getElementById(parentId).getElementsByTagName(childName);
    for(let i=childNodesToRemove.length-1;i >= 0;i--){
        let childNode = childNodesToRemove[i];
        childNode.parentNode.removeChild(childNode);
    }
}