var cardArray = ['0001', '0001', '0010', '0010', '0011', '0011', '0100', '0100', '0101', '0101', '0110', '0110', '0111', '0111', '1000', '1000', '1001', '1001', '1010', '1010', '1011', '1011', '1100', '1100']; //Values that will appear when the card is clicked on.

var cardValues = []; //Empty array
var cardIds = []; //Empty array
var cardFlipped = []; //Empty array
var turnsTaken = 0; //Counts up everytime a selection is made
var playerArray = []; //Empty array for player names
var scoreArray = []; //Empty array for Leaderboard
var playerName; //Users actual name
var exampleName; //Default name
var leaderArray = []; //Empty array
//var sortedArray = []; //Empty Array
var guessesLeft = 3; //Sets guesses to 3, for the quick finish player
var generatedGuessString = ""; //Empty string

//Function that is run on index.html load up
function init() {
    generateHTML();
    //Default leaderboard values
    leaderArray = [
        [99, "aaa"],
        [98, "bbb"],
        [97, "ccc"],
        [96, "ddd"],
        [95, "eee"],
        [70, "fff"],
        [60, "ggg"],
        [50, "hhh"]
    ]; //Multidimensional Array for the player names and scores
    //Update score_area with Leaderboard
    console.log(leaderArray);
    let sortedArray = leaderArray.sort((a, b) => {
        if (a > b) return 1;
        else if (b > a) return -1;
        else return 0;
        console.log(sortedArray);
    });
    generateLeaderboard();
    hideGuess();
    //Creates the shuffle process for the array
    Array.prototype.cardShuffle = function() {
        var n = this.length,
            m, temp;
        while (--n > 0) {
            m = Math.floor(Math.random() * (n + 1));
            temp = this[m];
            this[m] = this[n];
            this[n] = temp;
        }
    };
}

function newGame() {
    cardFlipped = 0; //Reset Value
    turnsTaken = 0; //Reset Value
    guessesLeft = 3; //Reset Value
    //Calls the shuffle command and adds Divs to the game_area
    var out = '';
    cardArray.cardShuffle();
    for (var i = 0; i < cardArray.length; i++) {
        out += '<div id="card_' + i + '" onclick="cardFlip(this,\'' + cardArray[i] + '\')"></div>';
    }
    out += '<span>' + guessingString(10) + '</span>';
    turnsTakenString = ""; //Hides the text so that it doesnt look unsightly
    document.getElementById("turnCounter").innerHTML = turnsTakenString;
    document.getElementById('game_area').innerHTML = out;
    document.getElementById("guessButton").innerText = "3 Guesses Left";
    showGuess();
    //console.log(generatedGuessString);
}

function cardFlip(card, val) {
    //Flipping Cards

    if (card.innerHTML == "" && cardValues.length < 2) { //If the cards match
        card.style.background = '#FFF';
        card.style.backgroundImage = 'radial-gradient(lightblue, cornflowerblue)'; //Displays a circle of light blue, behind the text
        card.innerHTML = val;
        if (cardValues.length == 0) {
            turnCounting();
            cardValues.push(val); //Push the Value into the array
            cardIds.push(card.id); //Push the Card Id into the array
        } else if (cardValues.length == 1) {
            cardValues.push(val); //Clicking on the second card and pushing the Value into the Array
            cardIds.push(card.id); //Pushing the second Card ID
            if (cardValues[0] == cardValues[1]) {
                cardFlipped += 2;
                var card1 = document.getElementById(cardIds[0]);
                var card2 = document.getElementById(cardIds[1]);
                card1.style.visibility = 'hidden'; //Once match is made hide the cards
                card2.style.visibility = 'hidden'; //Once match is made hide the cards
                cardValues = []; // Clear array
                cardIds = []; // Clear array
                // Check to see if the whole board is cleared
                if (cardFlipped == cardArray.length) { //If all the cards have been flipped
                    alert("Game Completed, you have taken " + turnsTaken + " turns to complete the game.  Lets see where you have come on the Leader Board");
                    //document.getElementById('game_area').innerHTML = "Well Done";
                    playerNameInput(); // Take players name
                    results(); //Leaderboard functions
                }
            } else { //This will run if there are no matches
                function flipOver() {
                    // Flip the 2 tiles back over
                    var card1 = document.getElementById(cardIds[0]);
                    var card2 = document.getElementById(cardIds[1]);
                    card1.style.background = 'radial-gradient(cornflowerblue, #007bff)';
                    card1.style.backgroundSize = "cover";
                    card1.innerHTML = "";
                    card2.style.background = 'radial-gradient(cornflowerblue, #007bff)';
                    card2.style.backgroundSize = "cover";
                    card2.innerHTML = "";
                    cardValues = []; // Clear array
                    cardIds = []; // Clear array
                }
                setTimeout(flipOver, 1000);
            }
        }
    }
}

function turnCounting() {
    //Counting the turns
    var turnsTakenString; //variable
    turnsTaken++; //Add 1 to the variable
    console.log(isNaN(turnsTaken));
    turnsTakenString = "Turns Taken: " + turnsTaken; //Puts the string together
    document.getElementById("turnCounter").innerHTML = turnsTakenString; //Updates the html in real time
}

function playerNameInput() {
    exampleName = "Ready Player One";
    var person = prompt("Please enter your name:", exampleName);
    if (person == null || person == "" || person == exampleName) {
        playerName = "Guest";
    } else {
        playerName = person;
    }
    //document.getElementById("playerName").innerHTML = playerName; //Puts the name into the HTML ID Tag playerName
}

function results() {
    //Reorder leaderboard
    leaderArray.unshift([turnsTaken, playerName]);
    let sortedArray = leaderArray.sort((a, b) => {
        if (a > b) return 1;
        else if (a > b) return -1;
        else return 0;
    });
    console.log(sortedArray);
    updateLeaderboard = "";
    generateLeaderboard();
    i = 0;
    //document.getElementById("score_area").innerHTML = updateLeaderboard;
    newGame();
}

function guessingString(length) {
    var guessingString = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        guessingString += possible.charAt(Math.floor(Math.random() * possible.length));
    generatedGuessString = guessingString;
    return guessingString;
}

function guessingTime() {
    var usersGuess = document.getElementById("userGuessBox").value; //Reads text box with users input in
    var guessStringLeft;
    if (guessesLeft > 0) {
        if (generatedGuessString === usersGuess) {
            playerNameInput(); // Take players name
            results(); //Leaderboard functions
        } else {
            guessesLeft--;
            if (guessesLeft > 1) { guessStringLeft = guessesLeft + " Guesses Left"; } else { guessStringLeft = "Last Guess"; }
            turnCounting();
            document.getElementById("guessButton").innerText = guessStringLeft;
        }
    }
    if (guessesLeft === 0) {
        alert("You have no more guesses left!");
        hideGuess();
    }

}

function generateLeaderboard() {
    var i = 8; //Number of Leaderboard Entries
    var x = 0; //Table Row Number
    var y = 0; //First Leader Array Position
    var z = 1; //Second Leader Array Position
    //debugger;
    var updateLeaderboard = "<table class=\"table table-borderless\"><caption>List of scores from different players.<\/caption><thead class=\"thead-dark\"><tr class=\"table-info\"><th scope=\"col\">#<\/th><th scope=\"col\">Name<\/th><th scope=\"col\">Turns<\/th><\/tr><\/thead><tbody>";
    while (x < i) { //Makes sure there are enough rows for the table
        var tableBoard = "<th scope=\"row\">";
        updateLeaderboard += "<tr>";
        x++;
        tableBoard += x;
        tableBoard += "<\/th><td>";
        updateLeaderboard += tableBoard;
        updateLeaderboard += leaderArray[y][z];
        z--;
        updateLeaderboard += "<\/td><td>";
        updateLeaderboard += leaderArray[y][z];
        z++;
        y++;
        updateLeaderboard += "<\/td><\/tr>";
    }
    updateLeaderboard += "<\/tbody><\/table>";
    console.log(isNaN(leaderArray[2][0]));
    document.getElementById("score_area").innerHTML = updateLeaderboard;
}

function hideGuess() {
    document.getElementById("userGuessBox").hidden = true;
    document.getElementById("guessButton").hidden = true;
}

function showGuess() {
    document.getElementById("userGuessBox").hidden = false;
    document.getElementById("guessButton").hidden = false;
}

/*function generateHTML() {
    var generateHTML = "";
    generateHTML += "<h1 class=\"central\">Welcome To Memory Card Twist<\/h1>";
    generateHTML += "                <h2>The Basics<\/h2>";
    generateHTML += "                <p>There are two ways to win this game:<\/p>";
    generateHTML += "                    <h4>First Way<\/h4>";
    generateHTML += "                    <p>Match all the cards and clear the board.<\/p>";
    generateHTML += "                    <h4>Second Way<\/h4>";
    generateHTML += "                    <p>As you start to match the cards, there will be a random string that will appear. If you think you know what the string is then you can enter it as a guess. You get three guesses before that option is disabled. So make them count.<\/p>";
    document.getElementById("game_area").innerHTML = generateHTML;
}*/
function generateHTML() {
    document.getElementById("game_area").innerHTML = "<h1 class=\"central\">Welcome To Memory Card Twist<\/h1><h2>The Basics<\/h2><p>There are two ways to win this game:<\/p><h4>First Way<\/h4><p>Match all the cards and clear the board.<\/p><h4>Second Way<\/h4><p>As you start to match the cards, there will be a random string that will appear. If you think you know what the string is then you can enter it as a guess. You get three guesses before that option is disabled. So make them count.<\/p>";
}