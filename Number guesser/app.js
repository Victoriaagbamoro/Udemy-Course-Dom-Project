// Game Function
// - Player must guess a number between min and max
// - Player gets a certain amount of guesses
// - Notify player of guesses remaning
// - Notify the player of the correct answer if loose
// -Let player choose to play again


// Games Values
let min = 50,
    max = 60,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 5;

// UI Elements
const gameContainer = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// However we have to assign our min and max UI element
minNum.textContent = min;
maxNum.textContent = max;

// Play-again EventListener
gameContainer.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});


// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);


    // Validate Input number
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please number selected, must be between the
        range of ${min} and ${max}`, 'orange');
    }

    // Check winning number
    if(guess === winningNum){
        // Game Over - won
        gameOver(true, `${winningNum} is correct, YOU WIN` )
    
    }else{
        // Wrong number
        guessesLeft -=1;

        if(guessesLeft === 0){
            // Game Over - lost
            gameOver(false, `Game Over, you did not guess the accurate
            number, which is ${winningNum}`)
            
        } else{
            // Games continues - answer wrong
            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear Input
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft}
            guesses left`, 'red')
        }

    }
});

function gameOver(won, msg){
    let color;

    won === true ? color = 'green' : color = 'red';
    // Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set TextColor
    message.style.color = color;
    // We will use the setMessage function to let the user know that he has won
    setMessage(msg);

    // However, once the game is over we want to play again!
    guessBtn.value = 'Play Again!';
    guessBtn.className += 'play-again';

}

// GetWinning Number
function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);

}

// SetMessage Function to validate input 
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}