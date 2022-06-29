// alert("Page is loading");

var level=0;

var buttonColours=["red", "blue", "green", "yellow"];
var gamePattrern=[];
var userClickedPattern=[];

var started=false;

function startOver(){
gamePattrern=[];
level=0;
started=false;
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    setTimeout(function () {
    nextSequence();
  }, 100);
    started = true;
  }
});


function playSound(name){
  var audio1 = new Audio("sounds/"+ name+ ".mp3");
  audio1.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  // console.log(currentColour);
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);

}

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){
  // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if(gamePattrern[currentLevel]===userClickedPattern[currentLevel]){
  // console.log("success");
  if(gamePattrern.length===userClickedPattern.length)
  {
      // Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function(){
      nextSequence();
    },1000)
  }
}
else{
  // console.log("failure");
  var audio2 = new Audio("sounds/wrong.mp3");
  audio2.play();

  $("body").addClass("game-over").delay(1000).queue(function(next){
      $(this).removeClass("game-over");
      next();
  });

    $("h1").html("Press Any Key to Restart");
    startOver();

}
}



$(".btn").click(function(){
  var userChosenColour = (this).id;
  // console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern=[];
  var randomnumber;


  $("h1").html("Level "+level);
   randomnumber= Math.floor(Math.random()*4);
   var randomChosenColour=buttonColours[randomnumber];
   gamePattrern.push(randomChosenColour)

   $("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   var audio1 = new Audio("sounds/"+ randomChosenColour+ ".mp3");
   audio1.play();
   level++;
}
