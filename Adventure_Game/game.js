const levels = [	 
	  //level 0
	 ["da_club", "building", "", "","",
	  "fashion_police_f", "building", "", "", "timberlands",
	  "", "dumpster", "animate", "animate", "animate",
	  "", "building", "", "", "",
	  "", "fashion_police_r", "", "simon_b", "",],

	  //level 1
	  ["timberlands", "", "fashion_police_L", "","",
	  "", "", "building", "","",
	  "animate", "animate", "animate", "animate", "animate",
	  "", "", "dumpster", "fashion_police_b", "building",
	  "simon_b", "", "building", "da_club", "building",],

	   //level 2
	  ["timberlands", "", "fashion_police_L", "","",
	  "", "", "building", "dumpster","fashion_police_b",
	  "dumpster", "animate", "animate", "animate", "animate",
	  "building", "building", "building", "", "",
	  "building", "da_club", "fashion_police_r", "", "simon_b",]

	  ]; //end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["building", "dumpster"];


var currentLevel = 1; // starting level
var shoesOn = false; // does he have the shoes
var currentLocationOfSimon = 0;
var currentAnimation; //allows 1 animation per level
var widthOfBoard = 5;

//start the game
window.addEventListener("load", function() {
	loadLevel();
});

//move simon
document.addEventListener("keydown",function (e) {

	switch (e.keyCode) {
		case 37: //left
		  if (currentLocationOfSimon % widthOfBoard !== 0){
		  	tryToMove("left");
		  }
		  break;

		case 38: //up
		  if (currentLocationOfSimon - widthOfBoard >= 0){
		  	tryToMove("up");
		  }
		  break;

		case 39: //right
		  if (currentLocationOfSimon % widthOfBoard < widthOfBoard - 1){
		  	tryToMove("right");
		  }
		  break;

		case 40: //down
		  if (currentLocationOfSimon + widthOfBoard < widthOfBoard * widthOfBoard){
		  	tryToMove("down");
		  }
		  break;

	}//switch
 }); //key event listener

//try to move simon
function tryToMove(direction){

	//location before move
	let oldLocation = currentLocationOfSimon;

	// class of Lcation before move
	let oldClassName = gridBoxes[oldLocation].className;

	let nextLocation = 0; //location player wants to move to
	let nextClass = ""; //class of location we want to move to

	let newClass = ""; // new class to switch to if the move can be done

	switch (direction) {
	  case "left":
		nextLocation = currentLocationOfSimon - 1;
		break;
	  case "right":
		nextLocation = currentLocationOfSimon + 1;
		break;
	  case "up":
		nextLocation = currentLocationOfSimon - widthOfBoard;
		break;
	  case "down":
		nextLocation = currentLocationOfSimon + widthOfBoard;
		break;

	}//switch

	newClass = gridBoxes[nextLocation].className;

	//if the object is not passable, dont move
	if (noPassObstacles.includes(nextClass)) { return; }

	//if its a fashion police, and theres no tims
	if (!shoesOn && nextClass.includes("fashion_police")) { return; }

	//if its a fashion police, move with animation

	//if theres tims, pick up the tims
	if (newClass == "timberlands") {
		shoesOn = true;
	}

	//if there is a crosswalk in the old location, keep it
	//crosswalk is a replacement for the bridge
	if (oldClassName.includes("crosswalk")) {
		gridBoxes[oldLocation].className = "crosswalk";
	}else {
		gridBoxes[oldLocation].className = "";
	}//else

	//build name of new class
	newClass = (shoesOn) ? "simon_tims" : "simon_b";
	newClass += direction;

	//if there is a crosswalk in the next location, keep it
	if (gridBoxes[nextLocation].classList.contains("crosswalk")) {
		newClass += " crosswalk";
	}

	//move 1 space
	currentLocationOfSimon = nextLocation;
	gridBoxes[currentLocationOfSimon].className = newClass;

	//if it is an enemy, end game
	if (nextClass.includes("drifter")){
		console.log("Game Lost");
		return;
	}

	//if it is a flag, move up a level

}//tryToMove

//load levels 0 - maxLevel
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes;
	shoesOn = false;

	//load board
	for(i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];

	if(levelMap[i].includes("simon")) currentLocationOfSimon = i;

	}//for

	animateBoxes = document.querySelectorAll(".animate");

	animateEnemy(animateBoxes,0 , "right");

}//loadLevel

//animate enemy to move from left to right
//boxes = array of grid boxes that include animation
//index = the current location of the animation
//direction = the current direction of the aniamtion
function animateEnemy(boxes, index, direction) {

	//exit function if no animation
	if(boxes.length <= 0) {return;}

	//update image
	if(direction == "right") {
		boxes[index].classList.add("drifter_r");
	  } else {
	  boxes[index].classList.add("drifter_L");
	}

	//remove old image from boxes
	for(i = 0; i < boxes.length; i++){
		if (i != index){
		boxes[i].classList.remove("drifter_r");
	 	boxes[i].classList.remove("drifter_L");
	  }
	}//for

	//moving right
	if(direction == "right"){
	  //turn around if it hits the right side
	  if (index == boxes.length - 1){
	  	index--;
	  	direction = "left";
	  } else {
	  	index++;
	  }

	  //moving left
	} else {
	//turn around if it hits the left side
	if(index == 0){
		index++;
		direction = "right";
	}else{
		index--;
	}
  }//else

  currentAnimation = setTimeout(function() {
  	animateEnemy(boxes,index, direction);
  }, 750);
}//animateEnemy