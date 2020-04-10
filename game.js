var buttoncolor = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickpattern = [];
var start = false;
var level = 0;

$(document).keypress(function()
{
    if(!start)
    {
        // $("#level-title").text("Level "+ level);
        nextsq();
        start = true;
    }
});
$(".btn").click(function()
{
    var userchosecolor = $(this).attr("id");
    userclickpattern.push(userchosecolor);
    playsound(userchosecolor);
    animatepress(userchosecolor);
    checkAnswer(userclickpattern.length-1);
});

function checkAnswer(currentlevel)
{
    if(userclickpattern[currentlevel]==gamepattern[currentlevel])
    {
        if(userclickpattern.length==gamepattern.length)
        {
           setTimeout(function()
           {
                nextsq();
           },1000); 
        }
    }
    else
    {
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any key to Restart");
        startOver();
    }
}
function startOver()
{
    level = 0;
    gamepattern = [];
    start = false;
}
function nextsq()
{
    userclickpattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var random =Math.floor(Math.random()*4);
    var randomcolor = buttoncolor[random];
    gamepattern.push(randomcolor);

    $("#" + randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomcolor);
}
function playsound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
// document.addEventListener("click", nextsq);
function animatepress(color)
{
    $("#" + color).addClass("pressed");
    setTimeout(function()
    {
        $("#" + color).removeClass("pressed");
    },100);
}
