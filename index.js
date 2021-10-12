let screenText = document.querySelector('.screenText');
let cards = Array.from(document.querySelectorAll('.card'));
let cardsArray = cards;
let timeCount = null;
let timeLeft = 60;
let timer = document.querySelector('#time');
let score = document.querySelector('#result');
let cardSelected = null;
let totalPoints = 0;
let matchedCards = [];
let busy = true;

document.addEventListener('DomContentLoaded', startGame())

function startGame() {
    screenText.addEventListener('click', () => {
    screenText.classList.remove('visible');
    playGame();
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            flipCard(card)
        })
    })
}        

function playGame() {
    setTimeout(() => {
        mixCards(cardsArray);
        countDown = startCountDown();
        busy = false;
    }, 500),
    hideCards();
    timer = document.querySelector('#time');
    timer.innerText = timeLeft;
    score.innerText = totalPoints;
}

function hideCards() {
    cardsArray.forEach(card => {
        card.classList.remove('visible');
        card.classList.remove('matched');
    });
}

function mixCards(cardsArray) {
    for(let i = cardsArray.length - 1; i > 0; i--) {
        let mixIndex = Math.floor(Math.random() * (i + 1));
        cardsArray[mixIndex].style.order = i;
        cardsArray[i].style.order = mixIndex;
    }
}

function startCountDown() {
    return setInterval(() => {
        timer = document.querySelector('#time');
        timeLeft--;
        timer.innerText = timeLeft;
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

function checkMatch(card) {
    if(cardType(card) === cardType(cardSelected)) {
        cardMatch(card, cardSelected);
    } else {
        misMatch(card, cardSelected);
    }
    cardSelected = null;
}

function cardMatch(card1, card2) {
    matchedCards.push(card1);
    matchedCards.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    totalPoints++;
    score.innerText = totalPoints;
    if(matchedCards.length === cardsArray.length) {
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

function cardType(card) {
    return card.querySelectorAll('.cat')[0].src;
}

function canFlipCard(card) {
   return (!busy && !matchedCards.includes(card) && card !== cardSelected);
}

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

 
