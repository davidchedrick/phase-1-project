let screenText = document.querySelector('.screenText');
let cards = Array.from(document.querySelectorAll('.card'))
let cardsArray = cards;
let timeCount = null;
let timeLeft = 10;
let timer = document.querySelector('#time');
let score = document.querySelector('#result');
let cardSelected = null;
let totalClicks = 0;
let matchedCards = [];
let busy = true;

document.addEventListener('DomContentLoaded', startGame())

function startGame() {

        screenText.addEventListener('click', () => {
        screenText.classList.remove('visible');
        playGame()
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
    },500)
    hideCards();
    timer = document.querySelector('#time');
    timer.innerText = timeLeft;
    score.innerText = totalClicks;
}

function hideCards() {
    cardsArray.forEach(card => {
        card.classList.remove('visible');
        card.classList.remove('matched');
    });
}

function mixCards(cardsArray){
    for(let i = cardsArray.length - 1; i > 0; i--){
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
        console.log(timer)
        if(timeLeft === 0){
            gameOver();
        }
    }, 1000)
}

function flipCard(card) {
    if(canFlipCard(card)) {
        totalClicks++;
        score.innerText = totalClicks;
        card.classList.add('visible');

        if(cardSelected){
            checkMatch(card);
        } else {
            cardSelected = card;
        }
    }
}

function checkMatch(card){
    if(cardType(card) === cardType(cardSelected)){
        cardMatch(card, cardSelected);
    }else{
        misMatch(card, cardSelected);
    }
    cardSelected = null;
}

function cardMatch(card1, card2){
    matchedCards.push(card1);
    matchedCards.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
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

function cardType(card){
    return card.querySelectorAll('.cat')[0].src
}

function canFlipCard(card) {
   return (!busy && !matchedCards.includes(card) && card !== cardSelected);
}

function gameOver() {
    clearInterval(countDown);
    document.querySelector('#gameOver').classList.add('visible');


    

}
function winGame() {
    clearInterval(countDown);
    document.querySelector('#win').classList.add('visible');

}
   


