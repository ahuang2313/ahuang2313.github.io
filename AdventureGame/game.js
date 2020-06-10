const levels = [	 
	  //level 0
	 ["da_club", "road_vertical", "", "","",
	  "fashion_police_f", "road_vertical", "", "", "timberlands",
	  "", "road_vertical", "animate", "animate", "animate",
	  "", "road_vertical", "", "", "",
	  "", "fashion_police_r", "", "simon_b", "",],

	  //level 1
	  ["fashion_police_f", "road_vertical", "", "","timberlands",
	  "", "road_vertical", "animate", "animate", "animate",
	  "", "road_vertical", "", "", "",
	  "", "fashion_police_r", "", "simon_b", "",],

	   //level 2
	  ["fashion_police_f", "road_vertical", "", "","timberlands",
	  "", "road_vertical", "animate", "animate", "animate",
	  "", "road_vertical", "", "", "",
	  "", "fashion_police_r", "", "simon_b", "",]

	  ]; //end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0; // starting level
var shoesOn = false; // does he have the shoes
var currentLocationOfSimon = 0;
var currentAnimation; //allows 1 animation per level

//start the game
window.addEventListener("load", function() {
	loadLevel();
});

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