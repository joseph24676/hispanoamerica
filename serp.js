const gameBoard = document.getElementById('gameBoard');
const snake = document.getElementById('snake');
const food = document.getElementById('food');
const scoreDisplay = document.getElementById('score');
const characterNameDisplay = document.getElementById('characterName');
const congratsMessage = document.getElementById('congratsMessage');
const startButton = document.getElementById('startButton');

const gridSize = 20;
let snakeParts, direction, foodPosition, score, currentCharacterIndex, gameInterval;

const characters = [
    'Pedro Páramo',
    'Juan Preciado',
    'Susana San Juan',
    'Dolores Preciado',
    'Fulgor Sedano',
    'Abundio Martínez',
    'Padre Rentería',
    'Eduviges Dyada',
    'Dorotea',
    'Damiana Cisneros'
];

function initializeGame() {
    snakeParts = [{ x: 200, y: 200 }];
    direction = 'right';
    foodPosition = { x: 100, y: 100 };
    score = 0;
    currentCharacterIndex = 0;
    scoreDisplay.textContent = 'Puntaje: ' + score;
    characterNameDisplay.textContent = 'Personaje: ';
    congratsMessage.classList.add('hidden');
    congratsMessage.style.display = 'none';
    placeFood();
    if (gameInterval) clearInterval(gameInterval);
}

function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, 200);
}

function createFood() {
    food.style.left = foodPosition.x + 'px';
    food.style.top = foodPosition.y + 'px';
}

function moveSnake() {
    let head = { ...snakeParts[0] };

    switch (direction) {
        case 'up':
            head.y -= gridSize;
            break;
        case 'down':
            head.y += gridSize;
            break;
        case 'left':
            head.x -= gridSize;
            break;
        case 'right':
            head.x += gridSize;
            break;
    }

    if (checkCollision(head)) {
        initializeGame();
        return;
    }

    snakeParts.unshift(head);

    if (head.x === foodPosition.x && head.y === foodPosition.y) {
        score += 10;
        scoreDisplay.textContent = 'Puntaje: ' + score;
        characterNameDisplay.textContent = 'Personaje: ' + characters[currentCharacterIndex];
        currentCharacterIndex++;

        if (currentCharacterIndex === characters.length) {
            congratsMessage.classList.remove('hidden');
            congratsMessage.style.display = 'block';
            clearInterval(gameInterval);
        } else {
            placeFood();
        }
    } else {
        snakeParts.pop();
    }

    drawSnake();
}

function checkCollision(head) {
    if (head.x < 0 || head.x >= gameBoard.clientWidth || head.y < 0 || head.y >= gameBoard.clientHeight) {
        return true;
    }

    for (let i = 1; i < snakeParts.length; i++) {
        if (head.x === snakeParts[i].x && head.y === snakeParts[i].y) {
            return true;
        }
    }

    return false;
}

function drawSnake() {
    snake.innerHTML = '';
    snakeParts.forEach(part => {
        let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.width = gridSize + 'px';
        div.style.height = gridSize + 'px';
        div.style.left = part.x + 'px';
        div.style.top = part.y + 'px';
        div.style.backgroundColor = '#0f0';
        snake.appendChild(div);
    });
}

function placeFood() {
    foodPosition = {
        x: Math.floor(Math.random() * (gameBoard.clientWidth / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (gameBoard.clientHeight / gridSize)) * gridSize
    };
    createFood();
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);
initializeGame();
