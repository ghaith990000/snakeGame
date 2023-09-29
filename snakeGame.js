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

// Check if the snake has collided with itself
function isSnakeCollision(){
    const head= snake[0];
    for(let i=1; i<snake.length; i++){
        if(snake[i].x == head.x && snake[i].y === head.y){
            return true;
        }
    }
    return false;
}

// Check if the snake has eaten the food
function isFoodEaten(){
    const head = snake[0];
    if(head.x === food.x && head.y === food.y){
        return true;
    }
    return false;
}

// Handle food eaten event
function handleFoodEaten(){
    snake.push({});
    food = getRandomFoodPosition();
    score++;
    if(score % 5 === 0){
        increaseSpeed();
    }
}

// Increase the game speed
function increaseSpeed(){
    clearInterval(gameLoop);
    speed *= 0.9;
    gameLoop = setInterval(gameLogic, speed);
}

// Update the game board
function renderGame(){
    const gameBoard = document.getElementById("game-board");

    gameBoard.innerHTML = "";

    // Render snake
    snake.forEach(segment => {
        const snakeElement= document.createElement("div");
        snakeElement.style.gridColumnStart = segment.x + 1;
        snakeElement.style.gridRowStart = segment.y + 1;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });

    // Render food
    const foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

//  Handle keyboard input
function handleKeyPress(event){
    switch(event.key){
        case "ArrowUp":
            if(direction !== "down"){
                direction = "up";
            }
            break;
        case "ArrowDown":
            if(direction !== "up"){
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if(direction !== "right"){
                direction = "left";
            }
            break;
        case "ArrowRight":
            if(direction !== "left"){
                direction = "right";
            }
            break;
    }
}

// Initialize the game
function init(){
    // Handle keyboard input
    document.addEventListener('keydown', handleKeyPress);

    // start the game loop
    gameLoop = setInterval(gameLogic, speed);
}

// Start the game
init();
