var colors = [
	"rgb(255, 0, 0)",
	"rgb(0, 255, 0)",
	"rgb(0, 0, 255)",
	"rgb(255, 0, 255)",
	"rgb(255, 255, 0)",
	"rgb(0, 255, 255)"
];

//array of objects for each square
var colouredSquares = [
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""},
	{isColored: false, color:""}
];
var squares = document.querySelectorAll(".square");
var firstPick = null;
var secondPick = null;
var correctCount = 0;
var score = document.querySelector("#score");
var space = document.querySelector("#space");
var restart = document.querySelector("#restart");
var attempts = 0;
var attemptDisplay = document.querySelector("#attempts");

//color each square
//choose color in list
for(var i = 0; i < colors.length; i++){
	var j = 0;
	var squarePos;
	while(j < 2){
		//assign color to two random squares
		squarePos = Math.floor(Math.random() * 12);
		if(colouredSquares[squarePos].isColored === false){
			colouredSquares[squarePos].isColored = true;
			colouredSquares[squarePos].color = colors[i];
			squares[squarePos].style.backgroundColor = colors[i];
			j++;
		};

	};
};


$(".square").addClass("defaultSquare");

//add the default layer to squares, hiding the underlying color
// for(var i = 0; i < squares.length; i++){
// 	squares[i].classList.add("defaultSquare");
// 	squares[i].addEventListener("click", function(){
// 		this.classList.remove("defaultSquare");
// 		pickAssign(this);
// 		//delay used to stop squares immediately going back to revealed state when not the same
// 		setTimeout(pickCompare, 1800);
// 	});
// };

// $(".square").click(function(){
// 	$(this).removeClass("defaultSquare");
// 	pickAssign(this);
// 	setTimeout(pickCompare, 1800);
// });

restart.addEventListener("click", function(){
	location.reload();
})

// function notify() {
//   alert( "clicked" );
// }
// $( ".square" ).on( "click", notify );

var handler = function() {
	$( ".square" ).unbind( "click", handler );
	// 	if($(this).css("background-color") !== "rgb(229, 34, 83)"){
	// 	done();
	// }

	$(this).removeClass("defaultSquare")
	pickAssign(this);
	setTimeout(pickCompare, 500);

};
$( ".clickable" ).bind( "click", handler );

// function done(){
// 	console.log("yes");
// 	$( ".square" ).bind( "click", handler );
// }

//assigns the users first and second pick to variables
function pickAssign(pickedSquare){
	if (firstPick === null){
		firstPick = pickedSquare;
	}else if(secondPick === null & pickedSquare !== firstPick){
		secondPick = pickedSquare;
	}
};

//compares the two picks
function pickCompare(){
	if(firstPick !== null & secondPick !== null){
			if(firstPick.style.backgroundColor !== secondPick.style.backgroundColor){
				//if picks are not the same, the colors are hidden once more
				firstPick.classList.add("defaultSquare");
				secondPick.classList.add("defaultSquare");
				firstPick = null;
				secondPick = null;
				attempts++;
				attemptDisplay.textContent = attempts;
				
			}else{
				correctCount++;
				score.textContent = correctCount;
				firstPick.classList.remove("clickable");
				secondPick.classList.remove("clickable");
				firstPick = null;
				secondPick = null;
				attempts++;
				attemptDisplay.textContent = attempts;
				clearTimeout();
				if (correctCount === 6){
					win();
				}
			}
		}	
	clearTimeout();
	$(".clickable" ).bind( "click", handler );
};


function win(){
	space.textContent = "You Win!"
	
}