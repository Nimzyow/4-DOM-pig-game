/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
var doubleSixInRow = [0,0];



init();

document.querySelector('.btn-roll').addEventListener('click', function(){
if (gamePlaying){
//1st) we need a random number

// math.floor will produce an integer.
//math.random produces a random number between 0 - 1.0
//we simply times by 6 to give a value between 0 - 6. for example, 0.8 * 6 = 4.8. math.floor converts it into an integer which is 4. we do the + 1 at the end to ensure that we have a 1-6 value. 
    var dice = Math.floor(Math.random() * 6) +1;

//2) we need to display the result.
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

//3 ) we need to update hte round score IF the rolled number was NOT a 1
// !== does not do type coersion whereas != does do type coersion.
    
    if (dice !== 1){
    //add score        
        roundScore += dice;
        function doubleSix(){
            if (doubleSixInRow[0] === 0 && dice === 6){
            doubleSixInRow[0] = 1;
            console.log("First 6");
            }else if (doubleSixInRow[0] === 1 && dice !== 6){
                    doubleSixInRow[0] = 0;
                    console.log("6 has been reset");
                    console.log("First double six is " + doubleSixInRow[0] + "  second double six is "+ doubleSixInRow[1]);    
            }else if (doubleSixInRow[0] === 1 && doubleSixInRow[1] === 0 && dice === 6){
                    doubleSixInRow[1] = 1;
                    console.log("DOUBLE 6 IN A ROW");
                    console.log("First double six is " + doubleSixInRow[0] + "  second double six is "+ doubleSixInRow[1]);
                    scores[activePlayer] = 0;
                    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                    console.log("Global Score for " + activePlayer + " has been reset because of double 6");
                    nextPlayer();       
            }
        }
        
        // above formula is same as below formula.
    // roundscore = roundscore + dice;
        doubleSix();
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        
    }
         else {
            nextPlayer();
            console.log("Score has been reset because of 1");
                }        
    }
}
);

document.querySelector('.btn-hold').addEventListener('click', function(){
    // add current score to global score
    if (gamePlaying){
    scores[activePlayer] += roundScore;

    // update the UI
    // the below statement updates the global score of the active player based on the above scores[activePlayer] += roundScore equation which is same as: scores[activePlayer] = scores[activePlayer] + roundScore
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
        var winningScore
    // undefined, 0, null or "" are COERCED to false
    // anything else is COERCED to true
if (input){
    winningScore = input;
} else {
    winningScore = 100;
}

    //check if player won game
    if (scores[activePlayer] >= winningScore){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        nextPlayer();
    }
}

});   

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //remove and add html classes
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    // we toggle between active players instead of using if statements.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

    doubleSixInRow[0] = 0;
    doubleSixInRow[1] = 0;

    console.log("NEXT PLAYER" + " First double six is " + doubleSixInRow[0] + "  second double six is "+ doubleSixInRow[1]);
    
}

document.querySelector('.btn-new').addEventListener('click', init);

function init (){
        scores = [0,0];
        roundScore = 0;
        activePlayer = 0;
//below is a setter because we are setthe the value of #current-0 or #current-1 in the HTML in index.html
//document.querySelector('#current-' + activePlayer).textContent = dice;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//below is a getter because we are getting the value of score-0 from the HTML in index.html
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

// .style is the method and the display is the css property and the none is the attribute we assign to this property.
        document.querySelector('.dice').style.display = 'none';

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';

        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');

        document.querySelector('.player-0-panel').classList.add('active');
        
        doubleSixInRow[0] = 0;
        doubleSixInRow[1] = 0;

        gamePlaying = true;
}

/**
 * 
 * challenge
 * 
 *1) a player looses his entire score when he rolls two 6 in a row. after that, its the next players turn. (HINT: always save the previous dice roll in a seperate variable)

 2) add an input field to the HTML where players can set the winnign score, so taht they can change the predefined score of 100. (HINT: you can read that value with teh .value property in Javascript. This is a good opporunity to use google to figure this out :)
 
 3) add another dice to the game, so taht there are two dices now. the player looses his current score when one of them is a 1. (Hint: you will need CSS position the second dive, so take a look at the CSS code for the first one.)
 * 
 */


