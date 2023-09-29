// Game constraints
const BOARD_SIZE = 20;
const INITIAL_SPEED = 200;

// Game variables
let snake = [{ x: 10, y: 10}];
let direction = "right";
let food = getRandomFoodPosition();
let score = 0;
let speed = INITIAL_SPEED;
let gameLoop;

// Get a random position for the food
function getRandomFoodPosition(){
    return {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
    };
}

// Game Logic for each frame
function gameLogic(){
    moveSnake();
    if(isGameOver()){
        clearInterval(gameLoop);
        alert("Game Over! Final Score: " + score);
        return;
    }

    if(isFoodEaten()){
        handleFoodEaten();
    }
    renderGame();
}

// Move the snake
function moveSnake(){
    const head = {x: snake[0].x, y: snake[0].y };
    switch(direction){
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);
    snake.pop();
}

// Check if the game over
function isGameOver(){
    const head = snake[0];
    if(
        head.x < 0 || 
        head.x >= BOARD_SIZE ||
        head.y < 0 || 
        head.y >= BOARD_SIZE ||
        isSnakeCollision()
    ){
        return true;
    }
    return false;
}
