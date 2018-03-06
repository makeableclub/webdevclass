// guess a number:
//var prompt = require("prompt");
// prompt.start();

var inquirer = require("inquirer");
var secret = Math.floor( Math.random()* 100 ) + 1;

var questions = [
  {
    type: 'input',
    name: 'guess',
    message: "What's your guess?"
  }
]

var yourGuess = -1;

function ask() {
  inquirer.prompt(questions).then(answers => {
    console.log( "You guessed: " , answers.guess);
    yourGuess = answers.guess;

    if (yourGuess != secret) {
      if( yourGuess < secret) {
        console.log("larger!")
      }
      else if (yourGuess > secret) {
        console.log("smaller")
      }
      ask();
    }
    else {
      console.log('Congratulation, you guessed right: ', yourGuess);
    }
  });
}

ask();
