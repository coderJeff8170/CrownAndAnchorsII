var dieArray = ['heartdie.png','crowndie.png','clubdie.png','diamonddie.png','spadedie.png','anchordie.png'];
function rollDie() {
    let roll =
    (Math.floor(Math.random() * 6));
    document.getElementById("die").src = `assets/${dieArray[roll]}`;
}