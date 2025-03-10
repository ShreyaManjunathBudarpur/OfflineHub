function showSection(sectionId) {
    const sections = document.querySelectorAll('.app-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    const section = document.getElementById(sectionId);
    section.style.display = 'block';
    setTimeout(() => 

section.classList.add('active'), 10);
}

function greetUser() {
    const hours = new Date().getHours();
    const greeting = hours < 12 ? 'Good morning!' :
                     hours < 18 ? 'Good afternoon!' : 'Good evening!';
    document.getElementById('greeting').textContent = greeting;
}
greetUser();

function changeTheme() {
    const theme = document.getElementById('theme-selector').value;
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');

    }
}

const translations = {
    "en": {
        "hello": "Hello",
        "how are you?": "How are you?",
        "goodbye": "Goodbye"
    },
    "es": {
        "hello": "Hola",
        "how are you?": "¿Cómo estás?",
        "goodbye": "Adiós"
    },
    "hi": {
        "hello": "नमस्ते",
        "how are you?": "कैसे हो?",
        "goodbye": "अलविदा"
    },
    "kn": {
        "hello": "ನಮಸ್ಕಾರ",
        "how are you?": "ನೀವು ಹೇಗಿದ್ದೀರಿ?",
        "goodbye": "ವಿದಾಯ"
    },

    "te": {
        "hello": "నమస్కారం",
        "how are you?": "మీరు ఎలా ఉన్నారు?",
        "goodbye": "విదాయ"
    },
    "mr": {
        "hello": "नमस्कार",
        "how are you?": "तुम कसे आहात?",
        "goodbye": "गुडबाय"
    }
};

function translateText() {
    const langFrom = document.getElementById('lang-from').value;
    const langTo = document.getElementById('lang-to').value;
    const textKey = document.getElementById('text-input').value.toLowerCase();
    const translatedText = translations[langTo][textKey] || "Translation not available.";

    document.getElementById('translation-result').textContent = translatedText;
}

function convertUnits() {
    const unitFrom = document.getElementById('unit-from').value;
    const unitTo = document.getElementById('unit-to').value;
    const value = parseFloat(document.getElementById('unit-input').value);

    let conversionFactor = {
        'meters_kilometers': 0.001,
        'meters_miles': 0.000621371,
        'meters_feet': 3.28084,
        'kilometers_meters': 1000,
        'kilometers_miles': 0.621371,
        'kilometers_feet': 3280.84,
        'miles_meters': 1609.34,
        'miles_kilometers': 1.60934,
        'miles_feet': 5280,
        'feet_meters': 0.3048,

        'feet_kilometers': 0.0003048,
        'feet_miles': 0.000189394
    };

    const key = `${unitFrom}_${unitTo}`;
    const result = value * (conversionFactor[key] || 1);
    document.getElementById('conversion-result').textContent = `${value} ${unitFrom} is ${result.toFixed(2)} ${unitTo}`;
}

function convertCurrency() {
    const currencyFrom = document.getElementById('currency-from').value;
    const currencyTo = document.getElementById('currency-to').value;
    const value = parseFloat(document.getElementById('currency-input').value);

    let rates = {

        'USD_EUR': 0.85,
        'USD_GBP': 0.75,
        'USD_INR': 83.0,
        'USD_JPY': 110.0,
        'EUR_USD': 1.18,
        'EUR_GBP': 0.88,
        'EUR_INR': 97.0,
        'EUR_JPY': 129.5,
        'GBP_USD': 1.34,
        'GBP_EUR': 1.14,
        'GBP_INR': 112.0,
        'GBP_JPY': 148.0,
        'INR_USD': 0.012,
        'INR_EUR': 0.0103,
        'INR_GBP': 0.0089,
        'INR_JPY': 1.33,
        'JPY_USD': 0.0091,
        'JPY_EUR': 0.0077,
        'JPY_GBP': 0.0068,
        'JPY_INR': 0.75
    };

    const key = `${currencyFrom}_${currencyTo}`;

    const result = value * (rates[key] || 1);
    document.getElementById('currency-result').textContent = `${value} ${currencyFrom} is ${result.toFixed(2)} ${currencyTo}`;
}

let timerInterval, elapsedTime = 0;
function startStopwatch() {
    timerInterval = setInterval(() => {
        elapsedTime++;
        document.getElementById('timer').textContent = new Date(elapsedTime * 1000).toISOString().substr(11, 8);
    }, 1000);
}

function stopStopwatch() {
    clearInterval(timerInterval);
}

function resetStopwatch() {

    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById('timer').textContent = '00:00:00';
}

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js')
.then(function(registration) {
console.log('ServiceWorker registered with scope:', registration.scope);
})
.catch(function(error) {
console.log('ServiceWorker registration failed:', error);
});
  }


// Tic-Tac-Toe logic
let board = Array(9).fill(null);
let currentPlayer = 'X';
let scoreX = 0, scoreO = 0;

function makeMove(cell, index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin()) {
            document.getElementById('tic-tac-toe-result').textContent = `${currentPlayer} wins!`;
            disableBoard();
            if (currentPlayer === 'X') scoreX++; else scoreO++;
            updateScore();

        } else if (!board.includes(null)) {
            document.getElementById('tic-tac-toe-result').textContent = `It's a tie!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === currentPlayer)
    );
}

function disableBoard() {

    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.pointerEvents = 'none';
    });
}

function resetBoard() {
    board.fill(null);
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    currentPlayer = 'X';
    document.getElementById('tic-tac-toe-result').textContent = '';
}

function updateScore() {
    document.getElementById('score-x').textContent = scoreX;

    document.getElementById('score-o').textContent = scoreO;
}