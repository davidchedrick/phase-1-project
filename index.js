const screenText = document.querySelector('.screenText');
const cards = document.querySelectorAll('.card');
const timer = document.querySelector('#time');
const score = document.querySelector('#result');
let cardSelected = null;
let timeLeft = 60;
let totalPoints = 0;
let matchedCards = [];
let busy = true;

// Game Start

document.addEventListener('DOMContentLoaded', startGame())

function startGame() {
    screenText.addEventListener('click', () => {
    screenText.classList.remove('visible');
    playGame();
    });

    cards.forEach(card => card.addEventListener('click', () => flipCard(card)));
}        

function playGame() {
    setTimeout(() => {
        mixCards(cards);
        countDown = startCountDown();
        busy = false;
    }, 100),

   timer.style.color = 'red'

}

function mixCards(cards) {
    for(let i = cards.length - 1; i > 0; i--) {
        let mixIndex = Math.floor(Math.random() * (i + 1));
        cards[mixIndex].style.order = i;
        cards[i].style.order = mixIndex;
    }
}

const startCountDown = () => {
    return setInterval(() => {
        timeLeft--; 
        timer.innerText = timeLeft;
        timer.style.color = timeLeft % 2 === 0 ? "red" : "blue";

        if(timeLeft === 0){
            gameOver();
        }
    }, 1000);
}

function flipCard(card) {
    if(canFlipCard(card)) {
       
        card.classList.add('visible');

        if(cardSelected) {
            checkMatch(card);
        } else {
            cardSelected = card;
        }
    }
}

function canFlipCard(card) {
   return (!busy && !matchedCards.includes(card) && card !== cardSelected);
}

function checkMatch(card) {
    if(cardType(card) === cardType(cardSelected)) {
        cardMatch(card, cardSelected);
    } else {
        misMatch(card, cardSelected);
    }
    cardSelected = null;
}

function cardType(card) {
    return card.querySelectorAll('.cat')[0].src;
}

function cardMatch(card1, card2) {
    matchedCards.push(card1);
    matchedCards.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    totalPoints++;
    score.innerText = totalPoints;

    if(matchedCards.length === cards.length) {
        winGame();
    }
}

function misMatch(card1, card2) {
    busy = true;
    setTimeout(() => {
        card1.classList.remove('visible');
        card2.classList.remove('visible');
        busy = false;
    }, 1000);
}

//End Game

function gameOver() {
    clearInterval(countDown);
    const gameOver = document.querySelector('#gameOver');
    gameOver.classList.add('visible');
    gameOver.addEventListener('click', reload);
}

function winGame() {
    clearInterval(countDown);
    const win = document.querySelector('#win');
    win.classList.add('visible');
    win.addEventListener('click', reload);
}
   
function reload(){
    location.reload();
}   
   
// API Cat Facts

function fetchCats() {
    fetch('https://catfact.ninja/fact')
    .then(response => response.json())
    .then(cats => renderCats(cats))
    .catch(error => alert(error))
}
fetchCats()
  
function renderCats(cat) {
    const main = document.querySelector('#facts');
    const h2 = document.createElement('h2');
    h2.innerHTML = cat.fact;
    main.append(h2);
}


   

