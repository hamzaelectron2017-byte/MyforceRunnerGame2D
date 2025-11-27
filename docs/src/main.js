console.log("Advanced 2D Runner Game Ready!");

// Change Character Function
function changeCharacter(char){
    if(char==="runner") currentCharacter=characters.runner;
    if(char==="ninja") currentCharacter=characters.ninja;
    if(char==="robot") currentCharacter=characters.robot;
}

// Example: switch to Ninja after 10 points
setInterval(()=>{
    if(score>=10) changeCharacter("ninja");
},1000);
