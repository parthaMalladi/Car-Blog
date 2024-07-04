var isPlaying = false;
var btns = ["red", "green", "blue", "yellow"];
var pattern = [];
var currPattern = [];
var level = 1;

$(document).keypress(function(event) {
    if (!isPlaying) {
        startGame();
    } 
});

$(".btn").on("click", function(event) {
    var currBtn = $(this).attr("class");
    var btnClass = currBtn.substring(4, currBtn.length);

    $(this).addClass("pressed");
    makeSound(btnClass);
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 200);

    currPattern.push(btnClass);
    if (isPlaying) {
        checkUserInput(currPattern.length - 1);
    }
});

function startGame() {
    isPlaying = true;
    pattern = [];
    currPattern = [];
    level = 1;
    $("#level-title").html("Level " + level);
    nextSequence();
}

function nextSequence() {
    $("#level-title").html("Level " + level);
    level++;
    currPattern = [];

    var randNum = Math.floor(Math.random() * btns.length);
    pattern.push(btns[randNum]);
    
    $("." + pattern[pattern.length - 1]).addClass("pressed");
    makeSound(pattern[pattern.length - 1]);
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 200);
}

function checkUserInput(index) {
    if (pattern[index] === currPattern[index]) {
        if (currPattern.length === pattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        $("#level-title").html("Game Over, press any key to restart");
        $("body").addClass("red");
        var audio = new Audio("sounds/wrong.mp3")
        audio.play();
        setTimeout(function() {
            $("body").removeClass("red");
        }, 200);
        isPlaying = false;
    }
}

function makeSound(color) {
    switch (color) {
        case "red":
            var audio = new Audio("sounds/red.mp3")
            audio.play();
            break;
        
        case "blue":
            var audio = new Audio("sounds/blue.mp3")
            audio.play();
            break;

        case "green":
            var audio = new Audio("sounds/green.mp3")
            audio.play();
            break;
            
        case "yellow":
            var audio = new Audio("sounds/yellow.mp3")
            audio.play();
            break;            
    }    
}
