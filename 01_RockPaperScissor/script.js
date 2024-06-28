let yourScore = 0;
let compScore = 0;

let choices = document.querySelectorAll(".circle");
let you = document.querySelector("#you");
let comp = document.querySelector("#comp");
let msg  = document.querySelector("#status");

function random() {
    let options = ["rock", "paper", "scissor"];
    return options[Math.floor(Math.random()*3)];
}

function winner(userWin, userChoice, compChoice){
    if(userWin){
        yourScore++;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}.`;
        you.innerText = yourScore;
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}.`;
        comp.innerText = compScore;
        msg.style.backgroundColor = "red";
    }
}

function changeimage(userChoice, compChoice){
    document.getElementById("you-choice").setAttribute('src', `${userChoice}.png`)
    document.getElementById("comp-choice").setAttribute('src', `${compChoice}.png`)
}

function playGame(userChoice) {
    const compChoice = random();
    changeimage(userChoice, compChoice)
     console.log(userChoice + " "  + compChoice)
    let userWin = false;

    if(userChoice === compChoice){
        msg.innerText = "Game Draw! Play again."
        msg.style.backgroundColor = "rgb(126, 163, 249)";
    }
    else{
        if(userChoice === "rock"){
            // paper scissor
            userWin = (compChoice === "paper") ? false : true;
        }
        else if(userChoice === "paper"){
            // rock scissor
            userWin = (compChoice === "rock") ? true : false;
        }
        else{
            //paper rock
            userWin = (compChoice === "rock") ? false : true;
        }
        console.log(userWin)
    
        winner(userWin, userChoice, compChoice);
    }
    
}

choices.forEach((choice) => {
   choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
   })
});