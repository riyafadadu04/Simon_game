// an array of colors
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; //store generated pattern
var userClickedPattern = []; //store user clicked pattern

var started = false;
var level = 0;

// start the game 
$(document).keypress(function () {

    if (!started) {
    
        $("h1").text("Level " + level);
        nextSequence();
        started = true;

    }

});

// user input in sequence
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id"); //get button
    userClickedPattern.push(userChosenColour); //add to sequence
    checkAnswer(userClickedPattern.length - 1); //check the answer

    playSound(userChosenColour);
    animatePress(userChosenColour);

});

// if answer right then next sequence generate
function nextSequence() {

    userClickedPattern = [];

    level++; //increment level 
    $("h1").text("Level " + level);

    //generate next sequence color to add in gamePattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

// checking of the answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// restarting of the game
function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}

// button animation
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

// button sound
function playSound(name) {

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}

