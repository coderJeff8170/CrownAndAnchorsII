//this isn't going to be very DRY... baby steps, write it first, revise it later

//start with 50 coins;
let purseCoins = 50;
const dieArray = ['heartdie.png','crowndie.png','diamonddie.png','spadedie.png','anchordie.png','clubdie.png'];
let rollArray = [];
let betArray = [];
let betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};


function placeBet() {
        betObject.heart = document.getElementById('heart').valueAsNumber;
        betObject.crown = document.getElementById('crown').valueAsNumber;
        betObject.diamond = document.getElementById('diamond').valueAsNumber;
        betObject.spade = document.getElementById('spade').valueAsNumber;
        betObject.anchor = document.getElementById('anchor').valueAsNumber;
        betObject.club = document.getElementById('club').valueAsNumber;
        betArray = Object.values(betObject);

        for(i=0; i<betArray.length; i++) {
            if(betArray[i]<0){
                betArray[i] = 0;
            }
        }

        console.log(betArray);//yay!
        console.log(purseCoins);

        //total up the array of bets
        let currentWager = betArray.reduce((a, x) => a += x);
        //subtract current wager from the purse
        purseCoins = purseCoins - currentWager;
        //if current wager is more than whats in the purse, prevent.
        //suggest preventing increment values if the purse is empty, in real time...
        if(purseCoins < 0) {
            //alert(`you don't have enough coins to place this bet!`);
            console.log(`${purseCoins} <should be less than 0`);
            purseCoins = purseCoins + currentWager;
            console.log(`${purseCoins} <should be back to 50`);
            return;
        //if current wager empties purse, let them know the purse is empty.
         }/*else if(purseCoins=0) {
            alert(`your purse is empty!`);
        }else{
            alert(`you now have ${purseCoins} coins in your purse`);
        } */

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
    console.log(`you won ${roundPoints} points this round`);
    purseCoins = purseCoins + roundPoints;
    console.log(`you now have ${purseCoins} coins in your purse!`);
    document.getElementsByClassName("wager").value = "0";
    console.log(betArray);
}