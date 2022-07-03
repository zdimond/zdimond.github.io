// Challenge 1: Your Age in Days

function ageInDays() {
    let userAge = prompt("How old are you?");
    let age = userAge * 365;
    let h1 = document.createElement("h1"); // don't call this "h1", be creative
    let textAnswer = document.createTextNode("You are " + age + " days old.");
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    console.log(age);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
function generateCat() {
    let catPic = document.createElement("img"); // creates the element we want to create
    let catInsertionPoint = document.getElementById("cat-result"); // finds where we need to put cat image
    catPic.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small"; // because "catPic" is an image, we can set its "src"
    catInsertionPoint.appendChild(catPic); // now that everything exists as javascript, use javascript to do the insertion thing
}

// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    console.log("The human choice is " + humanChoice); // remove this
    botChoiceList = ["rock", "paper", "scissors"];
    botChoice = botChooser(botChoiceList);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    rpsFrontEnd(humanChoice, botChoice, results);
}

function botChooser(botChoiceList) {
    let index = Math.floor(Math.random() * botChoiceList.length);
    console.log("The bot choice is " + botChoiceList[index]); // remove this
    return botChoiceList[index];
}

function decideWinner(human, bot) {
    if ((human == "rock" && bot == "paper") || (human == "scissors" && bot == "rock") || (human == "paper" && bot == "scissors")) {
        return {"message": 'You lose!', "color": 'red'};
    }
    else if ((human == "rock" && bot == "scissors") || (human == "scissors" && bot == "paper") || (human == "paper" && bot == "rock")) {
        return {"message": 'You win!', "color": 'green'};
    }
    else if (human == bot) {
        return {"message": 'You tied!', "color": 'yellow'};
    }
    else {
        return "failure";
    }
}

function rpsFrontEnd(humanChoice, botChoice, results) {
    let imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }
    // Let's remove all the choices to display game result
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanChoice] + "' style='height:225px;box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>"; // this doesn't show without decument.getElementById([the div])
    messageDiv.innerHTML = "<p style='color:" + results["color"] + ";font-size:44px;margin-top:50%'>" + results["message"] + "</p>"; // this doesn't show without decument.getElementById([the div])
    botDiv.innerHTML = "<img src='" + imagesDatabase[botChoice] + "' style='height:225px;box-shadow: 0px 10px 50px rgba(233, 37, 37, 1)'>"; // this doesn't show without decument.getElementById([the div])
    

    document.getElementById('flex-box-div-rock').appendChild(humanDiv);
    document.getElementById('flex-box-div-paper').appendChild(messageDiv);
    document.getElementById('flex-box-div-scissors').appendChild(botDiv);
}

// Challenge 4: Change the color of all buttons!
let all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

let copyAllButtons = [];
for (let i=0; i<all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonsReset();
    } else if (buttonThingy.value === 'random') {
        buttonsRandom();
    }
}

function buttonsRed() {
    for (let i=0; i<all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonsGreen() {
    for (let i=0; i<all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttonsReset() {
    for (let i=0; i<all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}
function buttonsRandom() {
    buttonColorChoiceList = ["btn-danger", "btn-primary", "btn-success", "btn-light", "btn-dark", "btn-info", "btn-warning", "btn-secondary"]
    for (let i=0; i<all_buttons.length; i++) {
        let index = Math.floor(Math.random() * buttonColorChoiceList.length);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(buttonColorChoiceList[index]);
    }
}