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
// //store pointer to each center img in an array
// var centerArray = document.getElementsByClassName('center');
//initiate for loop to populate each div with an eventlistener
for (var i=0; i<sectionArray.length; i++) {
	sectionArray[i].addEventListener('click', function() {

		if (player%2 != 0) { //player 1
			// centerArray[i].classList.add('cross');
			this.firstChild.classList.add('cross');
		}
		else { //player 2
			// centerArray[i].classList.add('circle')
			this.firstChild.classList.add('circle');
		}
		player++;
	});
}


