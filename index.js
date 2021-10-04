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
        this.stop = true;
       
    }
    mixCards(){
        for(let i = this.cardsArray.length - 1; i > 0; i--){
            let mixIndex = Math.floor(Math)
        }
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.score.innerText = `${this.totalClicks}`;
            card.classList.add('visible')
        }
    }
    canFlipCard(card) {
        return true;
        // return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardSelected);
    }
}



function startGame() {
    let screenText = document.querySelector('.screenText');
    let cards = Array.from(document.querySelectorAll('.card'))
    let game = new matchCats(100, cards)

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


   


