// Array mit den Bildpfaden
const images = [
    'img/dino_alien.png', 'img/dino_red.png', 'img/dino_raider.png', 'img/dino_bird.png',
    'img/dino_blue.png', 'img/godzila_fire.jpg', 'img/godzilla_fight.jpg', 'img/dino_family.jpg'
];

let cards = [...images, ...images]; // Verdoppeln der Bilder für Paare
let flippedCards = [];
let matchedPairs = 0;

// Funktion zum Mischen der Karten
function shuffleCards() {
    console.log('Shuffled cards:', cards);
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Funktion zum Initialisieren des Spiels
function initializeGame() {
    shuffleCards();
    const containers = document.querySelectorAll('.window-container');
    containers.forEach((container, index) => {
        const window = container.querySelector('.window');
        const img = window.querySelector('img');
        img.src = 'img/dinosaur_back.png'; // Verwenden Sie ein vorhandenes Bild als Rückseite
        img.dataset.id = index;
        img.addEventListener('click', flipCard);
        console.log('Event listener added to image:', img);
    });
}

// Funktion zum Aufdecken einer Karte
function flipCard() {
    console.log('flipCard function called');
    if (flippedCards.length < 2) {
        const cardId = parseInt(this.dataset.id);
        this.src = cards[cardId];
        flippedCards.push(this);
        console.log('Card flipped:', this.src);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Funktion zum Überprüfen von Übereinstimmungen
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.src === card2.src) {
        matchedPairs++;
        if (matchedPairs === images.length) {
            alert('Glückwunsch! Sie haben gewonnen!');
        }
    } else {
        card1.src = 'img/dinosaur_back.png';
        card2.src = 'img/dinosaur_back.png';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
}

// Spiel initialisieren
document.addEventListener('DOMContentLoaded', initializeGame);
