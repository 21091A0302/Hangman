// Word list with hints related to each word
const words = [
    { word: "JAVASCRIPT", hint: "A popular programming language for web development" },
    { word: "HANGMAN", hint: "A classic guessing game" },
    { word: "DEVELOPER", hint: "A person who creates software" },
    { word: "CSS", hint: "Used to style web pages" },
    { word: "HTML", hint: "The structure of a web page" }
];

let selectedWord = "";
let guessedLetters = [];
let remainingGuesses = 6;

function startGame() {
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
    initializeGame();
}

function initializeGame() {
    const randomWordObject = words[Math.floor(Math.random() * words.length)];
    selectedWord = randomWordObject.word;
    guessedLetters = [];
    remainingGuesses = 6;

    document.getElementById("hintText").innerText = randomWordObject.hint;
    displayWord();
    drawHangman();
    createKeyboard();
}

function displayWord() {
    const wordDisplay = document.getElementById("word");
    wordDisplay.innerHTML = selectedWord.split("").map(letter => 
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
}

function createKeyboard() {
    const keyboardDiv = document.getElementById("keyboard");
    keyboardDiv.innerHTML = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    alphabet.split("").forEach(letter => {
        const button = document.createElement("button");
        button.classList.add("letter-button");
        button.innerText = letter;
        button.onclick = () => handleGuess(letter);
        keyboardDiv.appendChild(button);
    });
}

function handleGuess(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);

        if (!selectedWord.includes(letter)) {
            remainingGuesses--;
        }
        displayWord();
        drawHangman();

        if (remainingGuesses === 0) {
            showGameOver(false);
        } else if (!document.getElementById("word").innerText.includes("_")) {
            showGameOver(true);
        }
    }
}

function drawHangman() {
    const canvas = document.getElementById("hangmanCanvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the hangman (add more body parts based on remainingGuesses)
    if (remainingGuesses <= 5) context.fillRect(10, 10, 10, 100); // base
    if (remainingGuesses <= 4) context.fillRect(10, 10, 100, 10); // top
    if (remainingGuesses <= 3) context.fillRect(100, 10, 10, 30); // rope
    if (remainingGuesses <= 2) context.beginPath(), context.arc(105, 50, 10, 0, Math.PI * 2), context.stroke(); // head
    if (remainingGuesses <= 1) context.fillRect(100, 60, 10, 40); // body
    if (remainingGuesses <= 0) context.fillRect(90, 60, 10, 30), context.fillRect(110, 60, 10, 30); // legs
}

function showGameOver(isWin) {
    document.getElementById("gameScreen").classList.add("hidden");
    const gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.classList.remove("hidden");
    const message = isWin ? "Congratulations! You Won!" : "Game Over! The word was: " + selectedWord;
    document.getElementById("gameOverMessage").innerText = message;

    if (!isWin) {
        const explosion = document.querySelector('.explosion');
        explosion.style.animation = "explode 2s ease-in-out forwards";
    }
}

function resetGame() {
    document.getElementById("gameOverScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");
}
