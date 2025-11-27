const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize player
resetPlayer(canvas.height);

// Controls
window.addEventListener("keydown", e => { 
    if(e.code==="Space") jump(); 
});
document.getElementById("jumpBtn").addEventListener("click", jump);

// Score
let score = 0;

// Game Loop
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw Background
    drawBackground(ctx, canvas.width, canvas.height);

    // Update & Draw Player
    updatePlayer(canvas.height);
    drawPlayer(ctx);

    // Draw Obstacles
    drawObstacles(ctx, canvas.width, canvas.height);

    // Draw Boss
    drawBoss(ctx, canvas.width, canvas.height);

    // تغيير المستوى حسب النقاط (مثال: كل 20 نقطة)
    if(score > 0 && score % 20 === 0){
        nextLevel();
    }

    requestAnimationFrame(update);
}

update();
