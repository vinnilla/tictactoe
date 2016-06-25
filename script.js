//----------GLOBAL VARIABLE CREATION----------//
var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];
//create global variable to keep track of which turn it is
//this will also act as a counter
var turn=0;
//dark button counter
var count=0;
//store pointers to each main div in an array
var sectionArray = document.getElementsByClassName('main');
//store pointer to current player stat
var currentPlayer = document.getElementById('currentPlayer');
//first player will always be cross
currentPlayer.classList.add('cross');
//hide message
document.getElementById('message').classList.add('hidden');

//----------GLOBAL FUNCTION CREATION----------//

//create dark UI function
var dark = function() {
	if (count%2 == 0) {
		return false;
	}
	else {
		return true;
	}
}
//create function to add appropriate classes
var addClass = function() {
	if (turn%2 == 0) { //check if player 1
		//add .cross to the div found within
		if (dark()) {
			this.firstChild.classList.add('dark');
		}
		else {
			this.firstChild.classList.add('cross');
		}
		currentPlayer.classList.remove('dark');
		currentPlayer.classList.remove('cross');
		currentPlayer.classList.add('circle');
	}
	else { //player 2
		//add .circle to the div found within
		this.firstChild.classList.add('circle');
		currentPlayer.classList.remove('circle');
		if (dark()) {
			currentPlayer.classList.add('dark');
		}
		else {
			currentPlayer.classList.add('cross');			
		}
	}
	//add to counter which creates the alternating turn functionality
	turn++;
	//FOR TESTING
	//console.log(player);
}
//create victory function
var victory = function(winner) {
	// if (winner == 1){
	// 	console.log('winner is player 1');
	// }
	// else {
	// 	console.log('winner is player 2');
	// }
	
	for (var i=0; i<sectionArray.length; i++) {
		//remove addClass event listener for all boxes
		sectionArray[i].removeEventListener('mousedown', addClass);
		//remove calculate for all boxes
		sectionArray[i].removeEventListener('mouseup', calculate);
	}
	//remove currentPlayer image
	if (currentPlayer.classList.item[0] == 'cross') {
		currentPlayer.classList.remove('cross');
	}
	else {
		currentPlayer.classList.remove('circle');
	}
	currentPlayer.classList.remove('dark');
	//hide currentPlayer stat
	document.getElementById('stats').classList.add('hidden');
	//show message
	var message = document.getElementById('message');
	message.classList.remove('hidden');
	var winningImage = document.getElementById('winningPlayer');
	if (winner==1) {
		winningImage.classList.remove('circle');
		if (dark()) {
			winningImage.classList.add('dark');
		}
		else {
			winningImage.classList.add('cross');
		}
	}
	else if (winner==2) {
		winningImage.classList.remove('dark');
		winningImage.classList.remove('cross');
		winningImage.classList.add('circle');
	}
	else {//tie logic
		document.getElementById('firstText').innerHTML = ('The game ends in a tie.');
		winningImage.classList.remove('cross');
		winningImage.classList.remove('dark');
		winningImage.classList.remove('circle');
		document.getElementById('secondText').classList.add('hidden');
	}
}
//create function to calculate victory
var calculate = function() {
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

	//test tie condition
	if (turn == sectionArray.length) {
		victory();
	}
}

//----------GAME LOGIC----------//

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
	sectionArray[i].addEventListener('mouseup',calculate);//end of victory event listener
}

//make reset button work
//store pointer to the reset button
var button = document.querySelectorAll('button')[0];
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
		sectionArray[i].firstChild.classList.remove('dark');

		//restore addClass event listener
		sectionArray[i].addEventListener('mousedown', addClass);
		//restore calculate event listener
		sectionArray[i].addEventListener('mouseup', calculate);

	}
	//first player will always be cross
	if (dark()) {
		currentPlayer.classList.add('dark');
	}
	else {
		currentPlayer.classList.add('cross');
	}

	//reset currentPlayer stat
	document.getElementById('stats').classList.remove('hidden');

	//hide message
	document.getElementById('message').classList.add('hidden');

	//reset message after tie
	if (turn == sectionArray.length) {
		document.getElementById('firstText').innerHTML = ('Congratulations Player ');
		document.getElementById('secondText').classList.remove('hidden')
	}

	//reset player to 0
	turn = 0;

	//reset board
	board = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
});

//store pointer to dark/light button
var darkButton = document.querySelectorAll('button')[1];
darkButton.addEventListener('click', function() {
	document.querySelector('body').classList.toggle('dark');
	for (var i=0; i<sectionArray.length; i++) {
		if (sectionArray[i].firstChild.classList.contains('cross')) {
			sectionArray[i].firstChild.classList.remove('cross');
			sectionArray[i].firstChild.classList.add('dark');
		}
		else if (sectionArray[i].firstChild.classList.contains('dark')) {
			sectionArray[i].firstChild.classList.remove('dark');
			sectionArray[i].firstChild.classList.add('cross');
		}
	}
	if (currentPlayer.classList.contains('cross')) {
		currentPlayer.classList.remove('cross');
		currentPlayer.classList.add('dark');
	}
	else if (currentPlayer.classList.contains('dark')) {
		currentPlayer.classList.remove('dark');
		currentPlayer.classList.add('cross');
	}
	var winner = document.getElementById('winningPlayer')
	if (winner.classList.contains('cross')) {
		winner.classList.remove('cross');
		winner.classList.add('dark');
	}
	else if (winner.classList.contains('dark')) {
		winner.classList.remove('dark');
		winner.classList.add('cross');
	}

	count++;
});