const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let snake = [{ x: 9, y: 9 }];
let snakeDirection = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let highScore = 0;
let gameInterval;
let isPaused = false;

document.addEventListener('keydown', changeDirection);

document.getElementById('pButton').addEventListener('click', togglePause);

function changeDirection(event) {
    if (event.key === 'ArrowUp' && snakeDirection.y === 0) {
        snakeDirection = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && snakeDirection.y === 0) {
        snakeDirection = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && snakeDirection.x === 0) {
        snakeDirection = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && snakeDirection.x === 0) {
        snakeDirection = { x: 1, y: 0 };
    }
    if (event.key === 'p' || event.key === 'P') {
        togglePause();
    }
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(gameInterval);
    } else {
        startGame();
    }
}

function gameOver() {
    alert(`游戏结束! 最终得分: ${score}`);
    if (score > highScore) {
        highScore = score;
        document.getElementById('highScore').innerText = highScore;
    }
    resetGame();
}

function resetGame() {
    snake = [{ x: 9, y: 9 }];
    snakeDirection = { x: 1, y: 0 };
    score = 0;
    document.getElementById('currentScore').innerText = score;
    placeFood();
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)),
        y: Math.floor(Math.random() * (canvas.height / 20)),
    };
}

function update() {
    if (isPaused) return;

    const head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };

    if (head.x < 0 || head.x >= (canvas.width / 20) || head.y < 0 || head.y >= (canvas.height / 20)) {
        gameOver();
        return;
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('currentScore').innerText = score;
        placeFood();
    } else {
        snake.pop();
    }

    draw();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach(segment => {
        context.fillStyle = 'green';
        context.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    context.fillStyle = 'red';
    context.fillRect(food.x * 20, food.y * 20, 20, 20);
}

function startGame() {
    placeFood();
    gameInterval = setInterval(update, 100);
}

startGame();