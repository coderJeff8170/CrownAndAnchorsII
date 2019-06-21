// to do:
// sounds
// add rules
//create modals instead of alert boxes
// make bet status and round viewable or at least
// alert matches..

// title page

//setup
let purseCoins = 50;
const dieArray = ['heartdie.png','crowndie.png','diamonddie.png','spadedie.png','anchordie.png','clubdie.png'];
let betArray = [];
let betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};
let hornpipe;
let round = 1;
wagerDefault();
disableClick("rollButton");
updateRound();
updateCoins();

//start sound on page load
function gameStart(){
    hornpipe = new Sound('the-sailors-hornpipe.mp3');
    hornpipe.play();
}

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

//disable click
function disableClick (elementId) {
    let x = document.getElementById(elementId);
    x.disabled = true;
}
//enable click
function enableClick (elementId) {
    let x = document.getElementById(elementId);
    x.disabled = false;
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
}
//resets values for end of each round.
function resetValues() {
    betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};
    //betArray = [0, 0, 0, 0, 0, 0];
    wagerDefault();
    updateCoins();
}

//MODAL STUFF

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

//Get the modal text area
var modalMessage = document.getElementById("modalText");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal  REPLACE BUTTON CLICK WITH CONDITION;
function displayModal(message) {
  modal.style.display = "block";
  modalMessage.innerHTML = message;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//loss function
function youLose() {
    const loss = "Game Over! You have no more coins. Close window to play again.";
    displayModal(loss);
    if(modal.style.display = "none") {
        location.reload();
    }
    //shit. do I have to use a promise here??
    //alert (loss);
    //location.reload(); ---> OK, so this is the problem for the modal - must occur after the modal closed
    //and not happen on any other modal except the YOU WIN Modal....
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
        document.getElementById(`die${[i]}`).src = `assets/${dieArray[roll]}`;
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
    }else if(purseCoins === 150) {
        youWin();
    }else{
        resetValues();
        betArray=[];
        updateRound();
        disableClick("rollButton");
        enableClick("betButton");
    }
    }, 1*1000);

}