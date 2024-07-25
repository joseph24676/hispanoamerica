const questions = [
    {
        question: "¿Quién fue el líder militar y político venezolano que jugó un papel crucial en la independencia de varios países sudamericanos del dominio español a principios del siglo XIX?",
        answer: "Simon Bolivar"
    },
    {
        question: "¿Quién es el poeta y escritor uruguayo conocido por su obra 'Tabaré' y que es considerado uno de los más importantes de la literatura de su país?",
        answer: "Zorrilla de San Martin"
    },
    {
        question: "¿Quién fue el poeta y político ecuatoriano conocido por su poema 'La victoria de Junín' y que también fue presidente de la Gran Colombia?",
        answer: "Jose Joaquin de Olmedo"
    },
    {
        question: "¿Quién es el famoso escritor argentino, conocido por su vasta obra en el campo de la literatura, especialmente por sus cuentos y ensayos, y por ser autor de obras como 'Ficciones' y 'El Aleph'?",
        answer: "Jorge Luis Borges"
    }
];

let selectedQuestion = "";
let selectedAnswer = "";
let selectedWord = "";
let displayedWord = [];
let attempts = 0;
const maxAttempts = 6;
const maxTime = 60000; // 1 minuto en milisegundos
const canvas = document.getElementById('hangman-canvas');
const context = canvas.getContext('2d');
let timerInterval; // Variable para almacenar el intervalo del temporizador

function startGame() {
    document.getElementById('timer').textContent = '01:00'; // Iniciar el temporizador en 1 minuto
    const randomIndex = Math.floor(Math.random() * questions.length);
    selectedQuestion = questions[randomIndex].question;
    selectedAnswer = questions[randomIndex].answer.toUpperCase();
    selectedWord = selectedAnswer;
    displayedWord = Array.from(selectedWord).map(char => (char === ' ' ? ' ' : '_'));
    attempts = 0;

    revealTwoLetters();

    document.getElementById('question').textContent = selectedQuestion;
    document.getElementById('game-content').style.display = 'block';
    document.getElementById('message').textContent = '';
    document.getElementById('timer').textContent = 'Tiempo restante: 1 minuto 0 segundos';
    drawHangman();

    const keyboardContainer = document.getElementById('keyboard');
    keyboardContainer.innerHTML = '';

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const keyElement = document.createElement('div');
        keyElement.textContent = letter;
        keyElement.className = 'key';
        keyElement.onclick = () => handleGuess(letter);
        keyboardContainer.appendChild(keyElement);
    }

    document.getElementById('start-button').style.display = 'none';

    // Iniciar el temporizador
    const startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = maxTime - elapsedTime;

        if (remainingTime <= 0) {
            // Si se acaba el tiempo, deshabilitar las teclas y mostrar mensaje
            disableAllKeys();
            clearInterval(timerInterval);
            document.getElementById('message').textContent = `Se acabó el tiempo. La palabra era: ${selectedWord}`;
        } else {
            // Actualizar el temporizador mostrando los minutos y segundos restantes
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            document.getElementById('timer').textContent = `Tiempo restante: ${minutes} minutos ${seconds} segundos`;
        }
    }, 1000); // Actualizar cada segundo
}

function revealTwoLetters() {
    const uniqueLetters = Array.from(new Set(selectedWord.replace(/ /g, ''))).sort(() => 0.5 - Math.random());
    if (uniqueLetters.length >= 2) {
        handleGuess(uniqueLetters[0]);
        handleGuess(uniqueLetters[1]);
    }
}

function handleGuess(letter) {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        if (key.textContent === letter) {
            key.classList.add('disabled');
            key.onclick = null;
        }
    });

    if (selectedWord.includes(letter)) {
        selectedWord.split('').forEach((char, index) => {
            if (char === letter) {
                displayedWord[index] = char;
            }
        });
    } else {
        attempts++;
        drawHangman();
    }

    document.getElementById('word-display').textContent = displayedWord.join(' ');

    if (displayedWord.join('') === selectedWord) {
        document.getElementById('message').textContent = '¡Ganaste!';
        disableAllKeys();
    } else if (attempts >= maxAttempts) {
        document.getElementById('message').textContent = `Perdiste. La palabra era: ${selectedWord}`;
        disableAllKeys();
    }
}

function disableAllKeys() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.classList.add('disabled');
        key.onclick = null;
    });
}

function drawHangman() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja la base del ahorcado
    context.lineWidth = 2;
    context.strokeStyle = '#000';
    context.beginPath();
    context.moveTo(10, 230);
    context.lineTo(190, 230);
    context.moveTo(50, 230);
    context.lineTo(50, 20);
    context.lineTo(130, 20);
    context.lineTo(130, 40);
    context.stroke();

    // Dibuja partes del cuerpo en función de los intentos
    if (attempts > 0) { // Cabeza
        context.beginPath();
        context.arc(130, 60, 20, 0, Math.PI * 2, true);
        context.stroke();
    }
    if (attempts > 1) { // Cuerpo
        context.beginPath();
        context.moveTo(130, 80);
        context.lineTo(130, 140);
        context.stroke();
    }
    if (attempts > 2) { // Brazo izquierdo
        context.beginPath();
        context.moveTo(130, 100);
        context.lineTo(100, 120);
        context.stroke();
    }
    if (attempts > 3) { // Brazo derecho
        context.beginPath();
        context.moveTo(130, 100);
        context.lineTo(160, 120);
        context.stroke();
    }
    if (attempts > 4) { // Pierna izquierda
        context.beginPath();
        context.moveTo(130, 140);
        context.lineTo(110, 180);
        context.stroke();
    }
    if (attempts > 5) { // Pierna derecha
        context.beginPath();
        context.moveTo(130, 140);
        context.lineTo(150, 180);
        context.stroke();
    }
}

function resetGame() {
    document.getElementById('game-content').style.display = 'none';
    document.getElementById('start-button').style.display = 'inline-block';
    clearInterval(timerInterval); // Detener el temporizador al reiniciar el juego
}

