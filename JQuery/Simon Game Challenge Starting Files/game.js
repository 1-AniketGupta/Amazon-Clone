var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern = [];
var started=false;
var lvl=0;
function startOver(){
    lvl=0;
    started=false;
    gamePattern=[];
    
    
}
$("body").keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + lvl);
        nextSequence();
        started = true;
      }
});

$(".btn").click(function (event){
    var userChosenColour =$(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    console.log(userClickedPattern);
    
});
function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  

        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () { nextSequence();}, 1000);
  
        }
  
      } else {
        console.log("wrong");
        playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () { $("body").removeClass("game-over");}, 200);

      startOver();
        
  
      }
}
function nextSequence() {
    lvl++;
    userClickedPattern=[];
    $("#level-title").text("Level " + lvl);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {

    
    $("#" + currentColor).addClass("pressed");
  
    
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
// console.log(gamePattern);