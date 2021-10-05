class matchCats {
    constructor(time, cards) {
        this.cardsArray = cards;
        this.timeCount = time;
        this.timeLeft = time;
        this.timer = document.querySelector('#time');
        this.score = document.querySelector('#result');
     
    }
    playGame() {
        this.cardSelected = null;
        this.totalClicks = 0;
        this.timer = this.timeLeft;
        this.matchedCards = [];
        this.busy = true;

        setTimeout(() => {
            this.mixCards(this.cardsArray);
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer = document.querySelector('#time');
        this.timer.innerText = this.timeLeft;
        this.score.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    mixCards(cardsArray){
        for(let i = this.cardsArray.length - 1; i > 0; i--){
            let mixIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[mixIndex].style.order = i;
            this.cardsArray[i].style.order = mixIndex;
        }
    }
    startCountDown() {
        return setInterval(() => {
            this.timer = document.querySelector('#time');
            this.timeLeft--;
            this.timer.innerText = this.timeLeft;
            
            if(this.timeLeft === 0){
                this.gameOver();
            }
        }, 1000)
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.score.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardSelected){
                this.checkMatch(card);
            } else {
                    this.cardSelected = card;
                }
            
        }
    }
    checkMatch(card){
        if(this.cardType(card) === this.cardType(this.cardSelected)){
            this.cardMatch(card, this.cardSelected);
        }else{
            this.misMatch(card, this.cardSelected);
        }
        this.cardSelected = null;
    }
    cardMatch(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length) {
            this.winGame();
        }
    }
    misMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    cardType(card){
        return card.querySelectorAll('.cat')[0].src
    }
    canFlipCard(card) {
       return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardSelected);
    }
    gameOver() {
        clearInterval(this.countDown);
        document.querySelector('#gameOver').classList.add('visible');
        document.querySelector('#gameOver').addEventListener('click', () => {
            screenText.classList.remove('visible');
            new matchCats(10, cards).playGame()
        });
        
    }
    winGame() {
        clearInterval(this.countDown);
        document.querySelector('#win').classList.add('visible');
        
    }
}



function startGame() {
    let screenText = document.querySelector('.screenText');
    let cards = Array.from(document.querySelectorAll('.card'))
    let game = new matchCats(10, cards)

    screenText.addEventListener('click', () => {
        screenText.classList.remove('visible');
        game.playGame()
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card)
        })
    })
}        
startGame(); 


   


