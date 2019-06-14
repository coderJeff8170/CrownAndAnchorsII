//this isn't going to be very DRY... baby steps, write it first, revise it later

//start with 50 coins;
let purseCoins = 50;
const dieArray = ['heartdie.png','crowndie.png','diamonddie.png','spadedie.png','anchordie.png','clubdie.png'];
//let rollArray = [];
let betArray = [];
let betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};


//resets all input values to 0
function wagerDefault() {
    let x = document.getElementsByClassName("wager");
    for(i=0; i<x.length; i++)
    x[i].value = "0";
  }

function updateCoins() {
    let x = document.getElementById("coins");
    x.innerHTML = `Coins: ${purseCoins}`;
}

function resetValues() {
    betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};
    //betArray = [0, 0, 0, 0, 0, 0];
    wagerDefault();
    updateCoins();
}

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
}
        

//if there's a bet placed on a square, and that square corresponds with any of the die, multiply the number of die
//corresponding with the amount on the square.

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
    document.getElementsByClassName("wager").value = "0";
    //console.log(betArray);
    resetValues();
    betArray=[];
}