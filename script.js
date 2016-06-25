var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];

//create global variable to keep track of which turn it is
//this will also act as a counter
var turn=0;
//store pointers to each main div in an array
var sectionArray = document.getElementsByClassName('main');
//create function to add appropriate classes
var addClass = function() {
	if (turn%2 == 0) { //check if player 1
		//add .cross to the div found within
		this.firstChild.classList.add('cross');
	}
	else { //player 2
		//add .circle to the div found within
		this.firstChild.classList.add('circle');
	}
	//add to counter which creates the alternating turn functionality
	turn++;
	//FOR TESTING
	//console.log(player);
}
//create victory function
var victory = function(winner) {
	if (winner == 1){
		console.log('winner is player 1');
	}
	else {
		console.log('winner is player 2');
	}
}

//initiate for loop to populate each div with eventlisteners
for (var i=0; i<sectionArray.length; i++) {
	//store index of each box as third class
	sectionArray[i].classList.add(i);
	//add mousedown listener to add class
	sectionArray[i].addEventListener('mousedown', addClass);
	//remove previously added event listener to disable clicking twice
	sectionArray[i].addEventListener('mouseup', function() {
		this.removeEventListener('mousedown', addClass);
	});
	//add mousedown listener to update 2d array
	sectionArray[i].addEventListener('mouseup', function(){
		//keep track of index even outside of loop
		var location = this.classList.item(2)
		//find out which player's turn it is
		//if play = 4; player 2 (circle) is playing -- for victory test
		//if play = 1; player 1 (cross) is playing
		var play = turn%2;
		if (play == 0) {
			play = 4;
		}
		else {
			play = 1;
		}

		//update board
		//first row of board
		if (location <= 2) {
			board[0][location] = play;
		}
		//second row of board
		else if (location <=5) {
			board[1][location-3] = play;
		}
		//third row of board
		else {
			board[2][location-6] = play;
		}
	});
	//FOR TESTING
	//add function to display board
	// sectionArray[i].addEventListener('mouseup', function(){
	// 	console.log(board);
	// });

	//add function that tests for a winner
	sectionArray[i].addEventListener('mouseup',function() {
		//access board to test for wins
		//1 = player 1 (cross); victory -> sum of 3
		//4 = player 2 (circle); victory -> sum of 12
		//test each possible case
		//rows
		//first
		if ((board[0][0] + board[0][1] + board[0][2]) == 3) {
			victory(1);
		}
		else if ((board[0][0] + board[0][1] + board[0][2]) == 12){
			victory(2);
		}
		//second
		if ((board[1][0] + board[1][1] + board[1][2]) == 3) {
			victory(1);
		}
		else if ((board[1][0] + board[1][1] + board[1][2]) == 12){
			victory(2);
		}
		//third
		if ((board[2][0] + board[2][1] + board[2][2]) == 3) {
			victory(1);
		}
		else if ((board[2][0] + board[2][1] + board[2][2]) == 12){
			victory(2);
		}

		//columns
		//first
		if ((board[0][0] + board[1][0] + board[2][0]) == 3) {
			victory(1);
		}
		else if ((board[0][0] + board[1][0] + board[2][0]) == 12){
			victory(2);
		}
		//second
		if ((board[0][1] + board[1][1] + board[2][1]) == 3) {
			victory(1);
		}
		else if ((board[0][1] + board[1][1] + board[2][1]) == 12){
			victory(2);
		}
		//third
		if ((board[0][2] + board[1][2] + board[2][2]) == 3) {
			victory(1);
		}
		else if ((board[0][2] + board[1][2] + board[2][2]) == 12){
			victory(2);
		}

		//diagonal
		//left to right
		if ((board[0][0] + board[1][1] + board[2][2]) == 3) {
			victory(1);
		}
		else if ((board[0][0] + board[1][1] + board[2][2]) == 12){
			victory(2);
		}
		//right to left
		if ((board[0][2] + board[1][1] + board[2][0]) == 3) {
			victory(1);
		}
		else if ((board[0][2] + board[1][1] + board[2][0]) == 12){
			victory(2);
		}

	});//end of victory event listener
}

//make reset button work
//store pointer to the button
var button = document.querySelector('button');
//addEventListener
button.addEventListener('click', function() {
	//iterate through the number of divs (9)
	for (var i=0; i<sectionArray.length; i++) {
		//remove images
		//check if class cross exists
		if (sectionArray[i].firstChild.classList.contains('cross')){
			sectionArray[i].firstChild.classList.remove('cross');
		}
		else {
			sectionArray[i].firstChild.classList.remove('circle');	
		}

		//restore addClass event listener
		sectionArray[i].addEventListener('mousedown', addClass);

		//reset player to 0
		turn = 0;

		//reset board
		board = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
	}
});