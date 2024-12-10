
export function numberGame() {

const input = document.querySelector("#guessInput"),
  checkButton = document.querySelector("#submitGuess"),
  remainChances = document.querySelector("#attempts"),
  guess = document.querySelector("#result");

input.focus();


const resetGame = () => {
  randomNum = Math.floor(Math.random() * 100); 
  chance = 6;  
  input.disabled = false; 
  remainChances.textContent = chance; 
  guess.textContent = ""; 
  guess.style.color = "#333"; 
  input.value = ""; 
  checkButton.textContent = "Check"; 
};

let randomNum = Math.floor(Math.random() * 100);
let chance = 6;


checkButton.addEventListener("click", () => {
  if (input.disabled) {
    
    resetGame();
    return;
  }

  
  let inputValue = input.value; 

  if (inputValue == randomNum) { 
    guess.textContent = "Congrats! You found the number.";
    input.disabled = true;
    checkButton.textContent = "Replay";
    guess.style.color = "#27ae60";
  } else if (inputValue > randomNum && inputValue < 100) { 
    guess.textContent = "Your guess is high";
    chance--;
    remainChances.textContent = `Attempts left: ${chance}`;
    guess.style.color = "";
   
  } else if (inputValue < randomNum && inputValue > 0) { 
    guess.textContent = "Your guess is low";
    chance--;
    remainChances.textContent = `Attempts left: ${chance}`;;
    guess.style.color = "";
   
  } else{
    guess.textContent = "Please enter a number between 1 and 99";
    remainChances.textContent = `Attempts left: ${chance}`;;
    guess.style.color = "#e74c3c";
  }

  if (chance == 0) { 
    checkButton.textContent = "Replay";
    input.disabled = true;
    guess.textContent = "You lost the game";
    guess.style.color = "#e74c3c";
  }
});
}