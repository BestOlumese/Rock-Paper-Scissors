const firstStep = document.querySelector('.first-step');
const secondStep = document.querySelector('.second-step');
const thirdStep = document.querySelector('.third-step');
const finalStep = document.querySelector('.final-step');
const modal = document.querySelector('.modal');
const rules = document.getElementById('rules');
const rulesClose = document.getElementById('rules-close');
const overlay = document.querySelector('.overlay');
const scoreText = document.getElementById('score-text');
const choiceBtns = document.querySelectorAll('.choice-btn');
const winOrLose = document.getElementById('winOrLose');
const playAgain = document.querySelector('.play-again');

var choice;
var houseChoice;
var score = 0;
const house = ['rock', 'paper', 'scissors']

rules.addEventListener('click', () => {
    overlay.style.display = 'block';
    modal.style.display = 'block';
})

rulesClose.addEventListener('click', () => {
    overlay.style.display = 'none';
    modal.style.display = 'none';
})

function reset() {
    firstStep.style.display = 'flex';
    secondStep.style.display = 'none';
    thirdStep.style.display = 'none';
    finalStep.style.display = 'none';
    choice = '';
    houseChoice = ''
}

function evaluateChoices() {
    firstStep.style.display = 'none';
    secondStep.style.display = 'none';
    thirdStep.style.display = 'none';
    finalStep.style.display = 'flex';
    finalStep.children[0].children[1].classList = 'btn-lg';
    finalStep.children[2].children[1].classList = 'btn-lg';
    finalStep.children[0].children[1].classList.add(`${choice}-btn`);
    finalStep.children[2].children[1].classList.add(`${houseChoice}-btn`);

    if(
        choice == 'rock' && houseChoice == 'scissors' 
        || choice == 'scissors' && houseChoice == 'paper' 
        || choice == 'paper' && houseChoice == 'rock'
    ) {
        score++;
        scoreText.innerHTML = score;
        winOrLose.innerHTML = 'YOU WIN'
    } else if (
        houseChoice == 'rock' && choice == 'scissors' 
        || houseChoice == 'scissors' && choice == 'paper' 
        || houseChoice == 'paper' && choice == 'rock'
    ) {
        winOrLose.innerHTML = 'YOU LOSE'
    } 
    // else if (choice == houseChoice) {
    //     winOrLose.innerHTML = 'A TIE'
    // }
}

function viewHouseChoice() {
    firstStep.style.display = 'none';
    secondStep.style.display = 'none';
    thirdStep.style.display = 'flex';
    thirdStep.children[0].children[1].classList = 'btn-lg';
    thirdStep.children[1].children[1].classList = 'btn-lg';
    houseChoice = house[Math.round(Math.random() * 3)];
    console.log(houseChoice);
    if(houseChoice == undefined) {
        viewHouseChoice();
    }
    if(choice == houseChoice) {
        viewHouseChoice();
    }
    thirdStep.children[0].children[1].classList.add(`${choice}-btn`);
    thirdStep.children[1].children[1].classList.add(`${houseChoice}-btn`);
    setTimeout(() => {
        evaluateChoices()
    }, 800)
}

function selectedChoice() {
    choice = String(this.dataset.choice);
    firstStep.style.display = 'none';
    secondStep.style.display = 'flex';
    secondStep.children[0].children[1].classList = 'btn-lg';
    secondStep.children[0].children[1].classList.add(`${choice}-btn`);
    setTimeout(() => {
        viewHouseChoice()
    }, 500)
}

choiceBtns.forEach((choiceBtn) => {
    choiceBtn.addEventListener('click', selectedChoice)
})

playAgain.addEventListener('click', reset)