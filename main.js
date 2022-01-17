

//player one score,button and score display
const p1 = { 
    score: 0,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Score"),
}
//player two score,button and score display
const p2 = {
    score: 0,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Score"),
}
//Reset button and playto selection options(the winning score selection)
const reset = document.querySelector("#reset");
const playto = document.querySelector("#playto");

let win = 5;
let gameOver = false;


//Updates the display and scores of the players 
function updateScore(player, opponent) {
    if (!gameOver) {
        player.score++;
        if (player.score === win && player.score > opponent.score + 1) {
            gameOver = true;
            player.display.classList.add("has-text-success")
            opponent.display.classList.add("has-text-danger")
            player.button.disabled = true
            opponent.button.disabled = true
        }
        //If both players tie the winning score increases by 1 and players continue until someone wins by 2 point lead
        else if (player.score === win - 1 && player.score === opponent.score) {
            win++;
            playto.selectedOptions[0].value = win;
            playto.classList.add('overtime');
            playto.selectedOptions[0].innerText = `Overtime To ${win}`;
        }
        player.display.textContent = player.score;
    }
}
//when player one button is clicked
p1.button.addEventListener("click", function () {
    updateScore(p1, p2)
})
//when player two button is clicked
p2.button.addEventListener("click", function () {
    updateScore(p2, p1)
})
//when there is a change in thje playto selection or the winning score
playto.addEventListener("change", function () {
    win = parseInt(this.value);
    resetgame(this.selectedIndex);
})
//when reset is clicked
reset.addEventListener("click", resetgame)
//this function resets all the game data back to origina state
function resetgame(index) {
    gameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove("has-text-success", "has-text-danger")
        p.button.disabled = false
    }
    //resets the playto Selection to what the user initially picked
    for (let i = 0; i <= 6; i++) {
        playto[i].value = 5 + i;
        playto[i].innerText = 5 + i;
        playto.classList.remove('overtime')
    }
    playto.selectedIndex = index;
}

