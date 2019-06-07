//this isn't going to be very DRY... baby steps, write it first, revise it later

let points = 0;
const dieArray = ['heartdie.png','crowndie.png','diamonddie.png','spadedie.png','anchordie.png','clubdie.png'];
let rollArray = [];
let betArray = [];
//corresponding bet array?
//const betArray = ['heart','crown','diamond','spade','anchor','club'];
let betObject = {heart: 0, crown: 0, diamond: 0, spade: 0, anchor: 0, club: 0};


function placeBet() {
        betObject.heart = document.getElementById('heart').valueAsNumber;
        betObject.crown = document.getElementById('crown').valueAsNumber;
        betObject.diamond = document.getElementById('diamond').valueAsNumber;
        betObject.spade = document.getElementById('spade').valueAsNumber;
        betObject.anchor = document.getElementById('anchor').valueAsNumber;
        betObject.club = document.getElementById('club').valueAsNumber;
        betArray = Object.values(betObject);
     
        console.log(betArray);//yay!

        }

//if there's a bet placed on a square, and that square corresponds with any of the die, multiply the number of die
//corresponding with the amount on the square.

function rollDie() {
    for(i=1; i<4; i++){
        let roll = (Math.floor(Math.random() * 6));
        document.getElementById(`die${[i]}`).src = `assets/${dieArray[roll]}`;
        rollArray.push(roll);//great! now we have an array of die face values.
    }

    for(i=0; i<betArray.length; i++) {

        console.log(betArray[i]);

        if(betArray[i]>0 && (i === rollArray[0] || i === rollArray[1] || i === rollArray[2])) {
            console.log('yay!');
            points = points + betArray[i];
            //return points;
            }
    }
    console.log(`you won ${points}!`);
}