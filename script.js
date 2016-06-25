var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];

//create global variable to keep track of which turn it is
//this will also act as a counter
var player=1;
//store pointers to each main div in an array
var sectionArray = document.getElementsByClassName('main');
//create function to add appropriate classes
var addClass = function() {
	if (player%2 != 0) { //check if player 1
			//add .cross to the div found within
			this.firstChild.classList.add('cross');
		}
		else { //player 2
			//add .circle to the div found within
			this.firstChild.classList.add('circle');
		}
		//add to counter which creates the alternating turn functionality
		player++;
		//FOR TESTING
		//console.log(player);
}

//initiate for loop to populate each div with an eventlistener
for (var i=0; i<sectionArray.length; i++) {
	//addEventListener
	sectionArray[i].addEventListener('mousedown', addClass);
	//remove previously added event listener to disable clicking twice
	sectionArray[i].addEventListener('mouseup', function() {
		this.removeEventListener('mousedown', addClass);
	});
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

		//reset player to 1
		player = 1;	
	}
});