// to do:
// sounds
// add rules
// make bet status and round viewable or at least
// alert matches..
// above 150 doesn't appear to do anything

// title page
//something about location.reload(); that will play song on chrome, when gameStart() doesn't....
//setup
let purseCoins = 50;
const titleScreen = document.getElementById("titleScreen");
const gameContainer = document.getElementById("gameContainer");

const dieArray = ['heartdie.png','crowndie.png','diamonddie.png','spadedie.png','anchordie.png','clubdie.png'];
let betArray = [];
let betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};
let hornpipe;
let round = 1;
wagerDefault();

updateRound();
updateCoins();

//sound class
class Sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("loop", "true");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        };
        this.stop = function () {
            this.sound.pause();
        };
    }
}

//start sound on page load
function musicStart(){
    hornpipe = new Sound('the-sailors-hornpipe.mp3');
    hornpipe.play();
    //unhide game elements and hide title screen
    //new branch to experiment with gamestates..

}

function startGame() {
    titleScreen.style.display = "none";
    gameContainer.style.display = "block";
    hornpipe.stop();
}



//disable click
function disableClick (elementId) {
    let x = document.getElementById(elementId);
    x.disabled = true;
    x.style.backgroundColor = "white";
}
//show rules
function showRules() {
    alert('Ahoy matey! Crown & Anchors is a simple gambling game popular with the Royal Navy in the days of the wooden sailing ships. In order to win coins, you wager amounts in the input fields next to a face (crown, spade, heart, etc). When you roll the dice, if any of the them correspond to the square on the mat, you win the amount you wagered. You start with 50 coins, and you can bet any amount in any of the input fields next to the faces, up to the total amount of coins you have left. You keep going until you reach 150 coins and win, or run out of coins. Good luck, Sailor!');
}

//enable click
function enableClick (elementId) {
    let x = document.getElementById(elementId);
    x.disabled = false;
    x.style.backgroundColor = "red";
}
//resets all input values to 0
function wagerDefault() {
    let x = document.getElementsByClassName("wager");
    for(i=0; i<x.length; i++)
    x[i].value = "0";
}
//updates html value for coins
function updateCoins() {
    let x = document.getElementById("coins");
    x.innerHTML = `Coins: ${purseCoins}`;
}
//updates round!
function updateRound() {

    let x = document.getElementById("round");
    x.innerHTML = `Round ${round++}`;

    disableClick("betButton");
    disableClick("rollButton");

    //enable bet once bet values have been entered
    let betInput = document.getElementsByClassName("wager");

    //must use a for loop, as gEBCN returns an array....
    for(i=0; i<betInput.length; i++) {
    betInput[i].addEventListener("keyup", function(event) {
    if (event.keyCode > 48 && event.keyCode <= 57) {
        enableClick("betButton");
            }
        });
    }

}

//resets values for end of each round.
function resetValues() {
    betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};
    //betArray = [0, 0, 0, 0, 0, 0];
    wagerDefault();
    updateCoins();
}
//loss function
function youLose() {
    const loss = "Game Over! You have no more coins. Hit ok to play again.";
    alert (loss);
    location.reload();
  }
//win function
  function youWin() {
    const win = "You have 150 coins! You Won! Hit ok to play again.";
    alert (win);
    location.reload();
  }




//bet function
function placeBet() {
    betObject.heart = document.getElementById('heart').valueAsNumber;
    betObject.crown = document.getElementById('crown').valueAsNumber;
    betObject.diamond = document.getElementById('diamond').valueAsNumber;
    betObject.spade = document.getElementById('spade').valueAsNumber;
    betObject.anchor = document.getElementById('anchor').valueAsNumber;
    betObject.club = document.getElementById('club').valueAsNumber;
    betArray = Object.values(betObject);

    //prevent negative bet values 
    for(i=0; i<betArray.length; i++) {
        if(betArray[i]<0){
            alert(`Negative Bet Invalid!
            Please try again!`);
            wagerDefault();
            return;
        }
    }

    //total up the array of bets
    let currentWager = betArray.reduce((a, x) => a += x);

    //prevent a wager of 0
    if(currentWager === 0) {
        alert(`you must bet something!
        Please try again!`);
        wagerDefault();
        return;
    }

    //subtract current wager from the purse
    purseCoins = purseCoins - currentWager;
    console.log(purseCoins);

    //prevent unaffordable wager
    if(purseCoins < 0) {
        alert(`you don't have enough coins to place this bet!
        Please try again!`);
        purseCoins = purseCoins + currentWager;
        wagerDefault();
        return;
        } 

    updateCoins();
    disableClick("betButton");
    enableClick("rollButton");
}
        
//roll die and add point for matches
function rollDie() {
    let roundPoints = 0;
    for(i=1; i<4; i++){
        let roll = (Math.floor(Math.random() * 6));
        document.getElementById(`die${[i]}`).src = `caassets/${dieArray[roll]}`;
        for(b=0; b<betArray.length; b++) {
            if(betArray[b]>0 && b === roll) {
                roundPoints = roundPoints + betArray[b];
                }
        }
    }
    //delay alerts for dice focus
    setTimeout(() => {
            //message wins/losses - improve
    if(roundPoints>0) {
        alert(`Ahoy, Sailor! Ye won a total of ${roundPoints} coins this round!`);
    }else{
        alert(`Shiver me timbers! Ye didn't win any coins this round.`);
    }

    //add winnings to purse
    purseCoins = purseCoins + roundPoints;

    //win/loss/continue
    if(purseCoins === 0) {
        youLose();
    }else if(purseCoins > 150) {
        youWin();
    }else{
        resetValues();
        betArray=[];
        updateRound();
        disableClick("rollButton");
        //enableClick("betButton");
    }
    }, 1*1000);

}