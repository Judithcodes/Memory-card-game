const cards = document.querySelectorAll('.memory-card');

let lockedBoard = false;
let cardHasFlipped = false;
let firstCard, secondCard;

function flipCard() {
  if (lockedBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!cardHasFlipped) {
    cardHasFlipped = true;
    firstCard = this;

    return;
  }

  secondCard = this;
    
  lockedBoard = true;
    
    
  checkForMatches();
}

function checkForMatches() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [cardHasFlipped, lockedBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));