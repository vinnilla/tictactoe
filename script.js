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
//store player stats in object
var playerOne = {
	symbol:'',
	wins: 0};
var playerTwo = {
	symbol:'',
	wins: 0};
//store pointers to each main div in an array
var sectionArray = document.getElementsByClassName('main');
//store pointer to current player stat
var currentPlayer = document.getElementById('currentPlayer');
//hide message
document.getElementById('message').classList.add('hidden');
//hide gameboard
toggleGame();

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
		//check if choice is x
		if (playerOne.symbol == 'cross') {
			//check for dark
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
		else {
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
		
	}
	else { //player 2
		//check if choice is x
		if (playerTwo.symbol == 'cross') {
			//check for dark
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
		else {
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
		//check playerOne symbol
		if (playerOne.symbol == 'cross' || playerOne.symbol == 'dark'){
			winningImage.classList.remove('circle');
			if (dark()) {
				winningImage.classList.add('dark');
			}
			else {
				winningImage.classList.add('cross');
			}
		}

		else {
			winningImage.classList.remove('dark');
			winningImage.classList.remove('cross');
			winningImage.classList.add('circle');
		}
	
		//update p1 wins
		playerOne.wins++;
		document.getElementById('p1score').textContent = playerOne.wins;
	}
	else if (winner==2) {
		//check playerTwo symbol
		if (playerTwo.symbol == 'cross' || playerTwo.symbol == 'dark'){
			winningImage.classList.remove('circle');
			if (dark()) {
				winningImage.classList.add('dark');
			}
			else {
				winningImage.classList.add('cross');
			}
		}
		else {
			winningImage.classList.remove('dark');
			winningImage.classList.remove('cross');
			winningImage.classList.add('circle');
		}
			
		//update p2 wins
		playerTwo.wins++;
		document.getElementById('p2score').textContent = playerTwo.wins;
	}
	else{//tie logic
		tieTest();
	}
}
//tie testing
function tieTest() {
	//test win conditions one last time
	// window.alert('tie');
	document.getElementById('firstText').innerHTML = ('The game ends in a tie.');
	document.getElementById('winningPlayer').classList.remove('cross');
	document.getElementById('winningPlayer').classList.remove('dark');
	document.getElementById('winningPlayer').classList.remove('circle');
	document.getElementById('secondText').classList.add('hidden');
}
//brute force comparison function
function bruteTest(tie) {
	//access board to test for wins
	//1 = player 1 (cross); victory -> sum of 3
	//4 = player 2 (circle); victory -> sum of 12
	//test each possible case
	//rows
	//first
	if ((board[0][0] + board[0][1] + board[0][2]) == 3) {
		victory(1); return true;
	}
	else if ((board[0][0] + board[0][1] + board[0][2]) == 12){
		victory(2); return true;
	}
	//second
	if ((board[1][0] + board[1][1] + board[1][2]) == 3) {
		victory(1); return true;
	}
	else if ((board[1][0] + board[1][1] + board[1][2]) == 12){
		victory(2); return true;
	}
	//third
	if ((board[2][0] + board[2][1] + board[2][2]) == 3) {
		victory(1); return true;
	}
	else if ((board[2][0] + board[2][1] + board[2][2]) == 12){
		victory(2); return true;
	}

	//columns
	//first
	if ((board[0][0] + board[1][0] + board[2][0]) == 3) {
		victory(1); return true;
	}
	else if ((board[0][0] + board[1][0] + board[2][0]) == 12){
		victory(2); return true;
	}
	//second
	if ((board[0][1] + board[1][1] + board[2][1]) == 3) {
		victory(1); return true;
	}
	else if ((board[0][1] + board[1][1] + board[2][1]) == 12){
		victory(2); return true;
	}
	//third
	if ((board[0][2] + board[1][2] + board[2][2]) == 3) {
		victory(1); return true;
	}
	else if ((board[0][2] + board[1][2] + board[2][2]) == 12){
		victory(2); return true;
	}

	//diagonal
	//left to right
	if ((board[0][0] + board[1][1] + board[2][2]) == 3) {
		victory(1); return true;
	}
	else if ((board[0][0] + board[1][1] + board[2][2]) == 12){
		victory(2); return true;
	}
	//right to left
	if ((board[0][2] + board[1][1] + board[2][0]) == 3) {
		victory(1); return true;
	}
	else if ((board[0][2] + board[1][1] + board[2][0]) == 12){
		victory(2); return true;
	}

	if (tie == 3){
		victory(3); return false;
	}
	else if (tie == 4) {
		victory(4); return false;
	} 
	
}
//create function to calculate victory
function calculate() {
	bruteTest();

	//test tie condition
	if (turn == sectionArray.length) {
		bruteTest(3);
	}
}

//create function to toggle game section so player can choose x or o
function toggleGame() {
	//toggle score
	document.getElementById('score').classList.toggle('hidden');
	//toggle stats
	document.getElementById('stats').classList.toggle('hidden');
	//toggle gameboard
	document.getElementById('gameboard').classList.toggle('hidden');
	//toggle buttons
	document.getElementById('reset').classList.toggle('hidden');
	//document.getElementById('dark').classList.toggle('hidden');
}

//create function to toggle choice menu
function toggleChoice() {
	document.getElementById('choice').classList.toggle('hidden');
}

//create choice functions
function chooseX() {
	playerOne.symbol = 'cross';
	playerTwo.symbol = 'circle';
	if (dark()) {
		currentPlayer.classList.add('dark');
		document.getElementById('player1').classList.add('dark');
	}
	else {
		currentPlayer.classList.add(playerOne.symbol);
		document.getElementById('player1').classList.add(playerOne.symbol);
	}
	document.getElementById('player2').classList.add(playerTwo.symbol);

	toggleChoice();
	toggleGame();
}

function chooseCircle() {
	playerOne.symbol = 'circle';
	playerTwo.symbol = 'cross';
	currentPlayer.classList.add(playerOne.symbol);
	document.getElementById('player1').classList.add(playerOne.symbol);
	if (dark()) {
		document.getElementById('player2').classList.add('dark');
	}
	else {
		document.getElementById('player2').classList.add(playerTwo.symbol);
	}
	toggleChoice();
	toggleGame();
}

function switchDark(object) {
	if (object.classList.contains('cross')) {
		object.classList.remove('cross');
		object.classList.add('dark');
	}
	else if (object.classList.contains('dark')) {
		object.classList.remove('dark');
		object.classList.add('cross');
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
//allow for player 1 to choose x or circle
//make choice buttons work
var xButton = document.querySelectorAll('button')[0];
var oButton = document.querySelectorAll('button')[1];
xButton.addEventListener('click', chooseX);
oButton.addEventListener('click', chooseCircle);


//make reset button work
//store pointer to the reset button
var button = document.querySelectorAll('button')[2];
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

	//reset currentPlayer stat
	document.getElementById('stats').classList.remove('hidden');

	//reset score symbols
	var tempOne = document.getElementById('player1');
	tempOne.classList.remove(tempOne.classList[0]);
	var tempTwo = document.getElementById('player2');
	tempTwo.classList.remove(tempTwo.classList[0]);

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

	//toggle game and choice
	toggleGame();
	toggleChoice();
});

//store pointer to dark/light button
var darkButton = document.querySelectorAll('button')[3];
darkButton.addEventListener('click', function() {
	document.querySelector('body').classList.toggle('dark');
	for (var i=0; i<sectionArray.length; i++) {
		switchDark(sectionArray[i].firstChild)
	}

	switchDark(currentPlayer);
	switchDark(document.getElementById('player1'));
	switchDark(document.getElementById('player2'));
	switchDark(document.getElementById('winningPlayer'));
	switchDark(document.getElementById('x'));

	darkButton.classList.toggle('dark');
	button.classList.toggle('dark');

	count++;
});