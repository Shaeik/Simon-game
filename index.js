var Gameon=false;
var Level = 1;
var ans=[];
var userClicks=[]
var colors ={
    0:"blue",
    1:"red",
    2:"green",
    3:"yellow"  
}   
$(document).keydown(()=>{
    if(!Gameon){
     $("#level-title").text(`level ${Level}`);
        
        handleGame();
        Gameon=true; 
    }
 })
function handleGame(){
    userClicks=[]
 
    $("#level-title").text(`level ${Level}`);
       var color=getRandomColor()
           

        ans.push(color)
    animateFlash(color)
    Level++;
   

   
   
}
$(".btn").click(function (){

        var userColor=$(this).attr('id')
        console.log(userColor);
        userClicks.push(userColor)
        playSound(userColor)
        animatePress(userColor)
        checkAnswer(userClicks.length-1)
    })  
function checkAnswer(levelIndex){
    if(ans[levelIndex] === userClicks[levelIndex]){
        console.log("ans==userClicks colors");
        console.log(ans.length===userClicks.length);
        if(ans.length === userClicks.length)
        {
            console.log("lenghts are same")
        setTimeout(()=>{
            console.log("continuing game");
            handleGame();},1000);
    }

    }   
    else{
        playSound("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game over,Press Any to Restart");
        setTimeout(()=>{$("body").removeClass("game-over")},200);
        restartGame();
        
    } 
}
function animateFlash(id){
    $(`#${id}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(id);
  
    
}

function playSound(color){
    var url="sounds/"+color+'.mp3';
    var audio = new Audio(url);
    audio.play();
    
}
function getRandomColor(){
    return colors[Math.floor(Math.random()*4)];
}
function animatePress(name){
    $(`#${name}`).addClass("pressed")
    setTimeout(()=>{    $(`#${name}`).removeClass("pressed")
},100)
}
function restartGame(){
    Level=1;
    Gameon=false;
    ans=[];
}
