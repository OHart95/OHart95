//generate a random number - floor rounds the generated number down, math.random generates a number between 0-1
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 0;
let resetButton;


function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 0) {
      guesses.textContent = "Previous guesses:";
    }

    guesses.textContent = `${guesses.textContent} ${userGuess},`;
  
    if (userGuess === randomNumber) {
      lastResult.textContent = "Congratulations! You got it right!";
      lastResult.style.Color = "green";
      lowOrHi.textContent = "";
      setGameOver();
    } else if (guessCount === 9) {
      lastResult.textContent = "!!!GAME OVER!!!";
      lowOrHi.textContent = "";
      setGameOver();
    } else {
      lastResult.textContent = "Wrong!";
      lastResult.style.Color = "red";
      if (userGuess < randomNumber) {
        lowOrHi.textContent = "Last guess was too low!";
      } else if (userGuess > randomNumber) {
        lowOrHi.textContent = "Last guess was too high!";
      }
    }
  
    guessCount++;
    guessField.value = "";
    guessField.focus();

    updateGuessesLeft();
  };

  // Function to update the display of guesses left
  function updateGuessesLeft() {
    const guessesLeftElement = document.getElementById('guessesLeft');
    let GuessesLeftCalc = 10 - Number(guessCount);
    guessesLeftElement.innerText = `Guesses left: ${GuessesLeftCalc}`;
};


  guessSubmit.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      checkGuess();
  }
});

  guessSubmit.addEventListener("click", checkGuess);


  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    let element = document.querySelector(".resultParas");
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    element.append(resetButton);

    resetButton.addEventListener("click", resetGame);
  };

  function resetGame() {
    guessCount = 0;
  
    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
      resetPara.textContent = "";
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
  
    lastResult.style.backgroundColor = "white";
  
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }
  
  