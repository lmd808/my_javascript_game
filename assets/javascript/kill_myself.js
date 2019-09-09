let myGame = {
	// below ids my array of words
	myWords: [
		'skeleton',
		'halloween',
		'autumn',
		'witch',
		'dracula',
		'frankenstein',
		'devil',
		'mischief',
		'nightmare',
		'ghouls',
		'phantoms',
		'ghost',
		'goblin',
		'monsters',
		'candy',
		'spooky',
		'black-cat',
		'candy-corn'
	],
	// going to get these to push a value to the id's i have on my page
	wins: 0,
	losses: 0,
	guessesLeft: 9,
	// these one will be based off my random word from my array
	randomWord: '',
	lettersInMyWord: [],
	blanks: 0,
	blankxCorrect: [],
	wrongGuess: [],

	// my first function - game
	Game: function() {
		//first im gonna get a random word from my array up top
		randomWord = this.myWords[Math.floor(Math.random() * this.myWords.length)];

		// im going to take that random word and split it up into strings
		// moved console log to bottom
		lettersInMyWord = randomWord.split('');

		//i'm putting a console log below because Im not gonna rember my effing words in my array
		console.log(this.randomWord);

		// each letter in my string (the length) is going to be set equal to the blanks I want to appear
		// i'm going to make a loop that will place a blank in my currentwordtoguess id
		// if will always print the length of of blanks

		blanks = lettersInMyWord.length;

		// this is my foor loop that will run for the length of the my blanks variable
		// then im going to access the 'dom' and try and get the '_' to show up in the currentword to guess id
		//
		for (var i = 0; i < blanks; i++) {
			this.blankxCorrect.push('_');
		}

		//this line is working and gets the '_' blanks to show up on the screen
		// i need .join(' ') because without it i get commas printing to my screen and i need a string
		document.getElementById('currentWordToGuess').innerHTML = this.blankxCorrect.join(' ') + ' ';
		document.getElementById('wordBankSpan').innerHTML = this.myWords.join(', ');
	},

	// I'm going to check my letter's truthiness in this function
	// i'm going to make 2 for loop that check  whether or not the mini arrays in my randomWord variable are equal to the letter im typing in
	// loop through the random word array and if it is equal to letter then letter in word is true it will print the letters into my current word id
	checkLetters: function(aGuess) {
		// i have to put this here because otherwise my game won't accept 'incorrect' guesses
		// this need to be up top otherwise my 1st for loop won't work
		var myGuessIsInTheCurrentWord = false;

		// this for loop allows correct letters to print to my currentwordtoguess # on the webpage
		for (var i = 0; i < blanks; i++) {
			if (randomWord[i] === aGuess) {
				myGuessIsInTheCurrentWord = true;
			}
		}

		// letter in word is declared up top set = to false
		if (myGuessIsInTheCurrentWord) {
			//this is another for loop to check is the letters are correct, but in this one if it's the wrong letter it gets pushed to the my wrong guesses
			// if false loop through blanks variable
			// i tried using blanks.length, but it won't work
			// just using my blanks variable itself does
			// if my guess is in the current word then my blanks = that guess
			for (var i = 0; i <= blanks; i++) {
				if (randomWord[i] === aGuess) {
					this.blankxCorrect[i] = aGuess;
				}
			}
		} else {
			// if my guess is NOT in the current word
			//if they're not right push the wrong guesses to the wrong guesses id and decrese the guesses left by 1
			this.wrongGuess.push(aGuess);
			this.guessesLeft--;
		}
	},
	// resets my game
	// i need to figure out how to delay this so people can see my inage change

	reset: function() {
		this.guessesLeft = 9;
		this.wrongGuess = [];
		this.blankxCorrect = [];
		this.Game();
		document.getElementById('image').src = './assets/images/main_images/eyes.gif';
	},
	EndOfDisaster: function() {
		// if my strings are the same then the person wins (yee fuckin haw)
		if (lettersInMyWord.toString() == this.blankxCorrect.toString()) {
			// issue- my screen doesn't display the last correct key entered I need to gfigure that out
			// winner winner section
			this.wins++;
			this.reset();
			document.getElementById('image').src = './assets/images/main_images/tryagain.jpg';
			// i need to figure out how to delay the reset
			// this.reset();

			//put them wins on the screen bb
			document.getElementById('winCount').innerHTML = ' ' + this.wins;

			//loser loser section
			// if they loose well they sucks
		} else if (this.guessesLeft === 0) {
			this.losses++;
			this.reset();
			document.getElementById('image').src = './assets/images/main_images/youlose.jpg';
			document.getElementById('lossCount').innerHTML = ' ' + this.losses;
		}
		// thie two lines will show my guesses on screen
		document.getElementById('currentWordToGuess').innerHTML = ' ' + this.blankxCorrect.join(' ');
		document.getElementById('guessesLeft').innerHTML = ' ' + this.guessesLeft;

		console.log(`wins: ${this.wins} xxx losses: ${this.losses}xxx guesses left ${this.guessesLeft}`);
	}
};

//call game function
myGame.Game();

// trigger event to cause the game to start
document.onkeyup = function(event) {
	var guesses = String.fromCharCode(event.keyCode).toLowerCase();
	//check to see if guess entered values of random word
	myGame.checkLetters(guesses);
	//handle the wins and losses
	myGame.EndOfDisaster();

	//logs guesses and random word for me i'll probably get rid of this later
	console.log(guesses);
	console.log(randomWord);

	// this line displauys the wrong player guesses in the player guess screen
	document.getElementById('playerWrongGuesses').innerHTML = ' ' + myGame.wrongGuess.join(' ');
};
