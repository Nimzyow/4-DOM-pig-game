/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores = [0,0];
roundScore = 0;
activePlayer = 1;

// math.floor will produce an integer.
//math.random produces a random number between 0 - 1.0
//we simply times by 6 to give a value between 0 - 6. for example, 0.8 * 6 = 4.8. math.floor converts it into an integer which is 4. we do the + 1 at the end to ensure that we have a 1-6 value. 
dice = Math.floor(Math.random() * 6) +1;

//below is a setter because we are setthe the value of #current-0 or #current-1 in the HTML in index.html
document.querySelector('#current-' + activePlayer).textContent = dice;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//below is a getter because we are getting the value of score-0 from the HTML in index.html
var x = document.querySelector('#score-0').textContent;
console.log(x);

// .style is the method and the display is the css property and the none is the attribute we assign to this property.
document.querySelector('.dice').style.display = 'none';






