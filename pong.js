//global variables

var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

var score1 = 0;
var score2 = 0;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var bounce = new sound("SoundEffects/Pong_Bounce.mp3");
var point = new sound("SoundEffects/Pong_Synth.mp3");

//used to control game start/stop
var controlPlay;

/*
// start ball motion
window.addEventListener('load',function(){
	startBall()
});
*/

//move paddles
document.addEventListener('keydown', function(e) {
	//console.log("key down " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87) { //W
		speedOfPaddle1 = -10;
	}//if

	if (e.keyCode == 83 || e.which == 83) { //S
		speedOfPaddle1 = 10;
	}//if

	if (e.keyCode == 38 || e.which == 38) { //uparrow
		speedOfPaddle2 = -10;
	}//if

	if (e.keyCode == 40 || e.which == 40) { //downarrow
		speedOfPaddle2 = 10;
	}//if

});

//power ups
document.addEventListener('keydown', function(e) {
	//console.log("key up " + e.keyCode);
	if (e.keyCode == 69 || e.which == 69 ) { //E

	}//if

});



//stop paddles
document.addEventListener('keyup', function(e) {
	//console.log("key up " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87) { //W
		speedOfPaddle1 = 0;
	}//if

	if (e.keyCode == 83 || e.which == 83) { //S
		speedOfPaddle1 = 0;
	}//if

	if (e.keyCode == 38 || e.which == 38) { //uparrow
		speedOfPaddle2 = 0;
	}//if

	if (e.keyCode == 40 || e.which == 40) { //downarrow
		speedOfPaddle2 = 0;
	}//if


});


//make a sound whenever someone hit back the ball or scores
//source code: https://www.w3schools.com/graphics/game_sound.asp#:~:text=How%20to%20Add%20Sounds%3F,and%20music%20to%20your%20games.
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }//this
  this.stop = function(){
    this.sound.pause();
  }//this
}//sound


//start the ball in the center of the screen
function startBall()  {
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;

	//50% chance of starting in either direction (right or left)
	if (Math.random() < 0.5) {
		direction = 1;
	} else {
		direction = -1;
	}//else

	topSpeedOfBall = Math.random() * 2 + 3;// 3-4.999
	leftSpeedOfBall = direction * (Math.random() * 2 + 3);

} // startBall

//update location of paddles and ball
function show()  {
	
//update position of all elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;


	//stops paddles from leaving top of gameboard
	if(positionOfPaddle1 <= 0){
		positionOfPaddle1 = 0;
	}//if

	if(positionOfPaddle2 <= 0){
		positionOfPaddle2 = 0;
	}//if

	//stops paddles from leaving bottom of gameboard
	if(positionOfPaddle1 >= gameboardHeight - paddleHeight) {
	  positionOfPaddle1 = gameboardHeight - paddleHeight;
	}//if

	if(positionOfPaddle2 >= gameboardHeight - paddleHeight) {
	  positionOfPaddle2 = gameboardHeight - paddleHeight;
	}//if

	// if ball hits top or bottom of gameboard change direction
	if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
		topSpeedOfBall *= -1;

	} // if

	//on left edge of gameboard
	if (leftPositionOfBall <= paddleWidth) {
		//if ball hits left paddle change direction
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
			bounce.play();
			leftSpeedOfBall *= -1;
			leftSpeedOfBall = leftSpeedOfBall + 1;

		} else {

			point.play();
			startBall();
			score2++
			
		}//else

	}//if

	//ball on right edge of gameboard
	if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {
		//if ball hits right paddle change direction
		if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight) {
			bounce.play();
			leftSpeedOfBall *= -1;
			leftSpeedOfBall = leftSpeedOfBall - 1;

		} else{

			point.play();
			startBall();
			score1++
			 
		}//else

	}//if


	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";

	document.getElementById('score1').innerHTML = score1.toString();
	document.getElementById('score2').innerHTML = score2.toString();

}//show


//resume the game
function resumeGame() {
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}//if

}//resume game

//pause the game
function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pause game

//Start the game
function startGame() {
	//reset scores ball and paddle
	score1 = 0;
	score2 = 0;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;

	startBall();

	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}//if

}//start game

//stop the game
function stopGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;

	//show lightbox with a score
	let message1 = "Tie game";
	let message2 = "Close to continue.";

	if(score2 > score1){
		message1 = "Player 2 wins with " + score2 + " points!";
		message2 = "Player 1 had " + score1 + " points!";
	}else if (score1 > score2) {
		message1 = "Player 1 wins with " + score1 + " points!";
		message2 = "Player 2 had " + score2 + " points!";
	}//else if

	showLightBox(message1,message2);

}//stopGame


/****Lightbox Code*****/

//change the visibility of divID
function changeVis(divID) {
  var element = document.getElementById(divID);

  // if element exists, toggle it's class
  // between hidden and unhidden
  if (element) {
  	element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
  }//if
} // changeVis

//display message in lightbox
function showLightBox(message,message2) {

	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;

	//show lightbox
	changeVis("lightbox");
	changeVis("boundaryMessage");

}//showLightbox

//close light box
function continueGame() {
	changeVis("lightbox");
	changeVis("boundaryMessage");

}//conintueGame


/*****End of lightbox code******/
