const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Create unit
const box = 32;

// Load images
const ground = new Image();
ground.src = "img/ground.png"

const foodImg = new Image();
foodImg.src = "img/food.png";

// Load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/dead.mp3";
up.src = "audio/dead.mp3";
left.src = "audio/dead.mp3";
right.src = "audio/dead.mp3";
down.src = "audio/dead.mp3";

// Create snake
let snake = [];
snake[0] = {
	x : 9 * box,
	y : 10 * box
}

// Create food
let food = {
	x : Math.floor(Math.random() * 17+1) * box,
	y : Math.floor(Math.random() * 15+3) * box
}

// Create score
let score = 0;


// Control snake
let d;

document.addEventListener("keydown",direction);

function direction(event){
	if(event.keyCode == 37 && d != "RIGHT"){
		d = "LEFT";
		left.play();
	}else if(event.keyCode == 38 && d != "DOWN"){
		d = "UP";
		up.play();
	}else if(event.keyCode == 39 && d != "LEFT"){
		d = "RIGHT";
		right.play();
	}else if(event.keyCode == 40 && d != "UP"){
		d = "DOWN";
		down.play();
	}
}

// Check collision function
function collision(head, array){
	for(let i=0; i<array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}


// Draw
function draw(){
	ctx.drawImage(ground,0,0);
	for(let i=0; i<snake.length; i++){
		ctx.fillStyle=(i==0)?"green" : "white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);

		ctx.strokeStyle="red";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}

	ctx.drawImage(foodImg, food.x, food.y);

	// Old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// which direction
	if (d=="LEFT") snakeX -=box;
	if (d=="UP") snakeY -=box;
	if (d=="RIGHT") snakeX +=box;
	if (d=="DOWN") snakeX +=box;

	// Snake eat food
	if(snakeX == food.x && snakeY == snakeY){
		score++;
		eat.play();
		// Generate new fod
		food = {
			x : Math.floor(Math.random()*17+1) * box,
			y : Math.floor(Math.random()*15+3) * box
		}
		// Don't remove tail
	}else {
		// Remove tail
		snake.pop();
	}

	// Add new head
	let newHead = {
		x : snakeX,
		y : snakeY
	}

	// Game ends
	if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
		clearInterval(game);
		dead.play();
	}

	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score,2*box,1.6*box);
}

// Call draw function every 100ms
let game = setInterval(draw,100);
