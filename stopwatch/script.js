let runWatch = "00:00.00"
document.getElementById("timer-text").innerHTML = runWatch;

function stopwatchStart() {
    let startTime = new Date().getTime(); // establishes the starting time
    x = setInterval(function() { // at an established interval,
        runWatch = Date.now() - startTime;
        distanceMinutes = Math.floor((runWatch % (1000 * 60 * 60)) / (1000 * 60)); // the difference between now and the starting time
        distanceSeconds = Math.floor((runWatch % (1000 * 60)) / 1000);
        distanceMilli = Math.floor((runWatch % 100));
        document.getElementById("timer-text").innerHTML = distanceMinutes.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + distanceSeconds.toLocaleString(undefined, {minimumIntegerDigits: 2}) + "." + distanceMilli.toLocaleString(undefined, {minimumIntegerDigits: 2}); // is printed to the doc
    }, 10)
}

function stopwatchStop() {
    clearInterval(x);
}

function stopwatchReset() {
    runWatch = "00:00.00"
    document.getElementById("timer-text").innerHTML = runWatch;
}