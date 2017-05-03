var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	//mode buttons event listeners
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// figure out how many squares to show
			if(this.textContent === "Easy"){
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			reset();	
		// Ternary Operator
		// this.textContent === "Easy" ? numSquares = 3; numSquares = 6;
		});
	};
}

function setupSquares() {
	//squares listeners
	for (var i = 0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function() {
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			};
		});
	};
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	//reset play again button
	resetButton.textContent = "New Colors";
	//reset message area
	messageDisplay.textContent = "";
	//change colors of squares and updating colors
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
		squares[i].style.display = "none";
		}
	}
	//reset h1 background
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function() {
	reset();
})

colorDisplay.textContent = pickedColor;

function changeColors(color){
	//loop through all squares
	for (var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = [];
	//add num random colors to arr
	for (var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	//picks a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	//picks a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	//picks a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}