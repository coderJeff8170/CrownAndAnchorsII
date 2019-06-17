//this isn't going to be very DRY... baby steps, write it first, revise it later

// to do:



// make bet status and round viewable
// win if coins are over 150, loss if they reach zero

// title page

//setup
wagerDefault();
disableClick("rollButton");
let purseCoins = 50;
const dieArray = ['heartdie.png','crowndie.png','diamonddie.png','spadedie.png','anchordie.png','clubdie.png'];
let betArray = [];
let betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};
let hornpipe;
let round = 1;

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

function resetValues() {
    betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};
    //betArray = [0, 0, 0, 0, 0, 0];
    wagerDefault();
    updateCoins();
}

updateRound();
updateCoins();
//
function placeBet() {
        betObject.heart = document.getElementById('heart').valueAsNumber;
        betObject.crown = document.getElementById('crown').valueAsNumber;
        betObject.diamond = document.getElementById('diamond').valueAsNumber;
        betObject.spade = document.getElementById('spade').valueAsNumber;
        betObject.anchor = document.getElementById('anchor').valueAsNumber;
        betObject.club = document.getElementById('club').valueAsNumber;
        betArray = Object.values(betObject);

        //if player enters a negative bet value, 
        for(i=0; i<betArray.length; i++) {
            if(betArray[i]<0){
                alert(`Negative Bet Invalid!
                Please try again!`);
                wagerDefault();
                return;
            }
        }

        console.log(betArray);//yay!
        console.log(purseCoins);

        //total up the array of bets
        let currentWager = betArray.reduce((a, x) => a += x);
        //subtract current wager from the purse
        purseCoins = purseCoins - currentWager;
        console.log(purseCoins);

        if(purseCoins < 0) {
            alert(`you don't have enough coins to place this bet!
            Please try again!`);
            purseCoins = purseCoins + currentWager;
            wagerDefault();
            return;
         } 
         /*else if(purseCoins=0) {
            alert(`your purse is empty!`);
        }else{
            alert(`you now have ${purseCoins} coins in your purse`);
        } */
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
    //console.log(`you won ${roundPoints} points this round`);
    purseCoins = purseCoins + roundPoints;
    //console.log(`you now have ${purseCoins} coins in your purse!`);
    //document.getElementsByClassName("wager").value = "0";
    //console.log(betArray);
    resetValues();
    betArray=[];
    updateRound();
    disableClick("rollButton");
    enableClick("betButton");
}