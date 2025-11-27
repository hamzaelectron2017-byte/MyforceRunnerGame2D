const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

resetPlayer(canvas.height);

window.addEventListener("keydown", e => { if(e.code==="Space") jump(); });
document.getElementById("jumpBtn").addEventListener("click", jump);

let score = 0;

// تأكد من تحميل كل الخلفيات قبل بدء اللعبة
let imagesLoaded = 0;
bgImages.forEach(img => {
    img.onload = () => {
        imagesLoaded++;
        if(imagesLoaded === bgImages.length){
            console.log("All background images loaded!");
            update();
        }
    };
});

// Game Loop
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBackground(ctx, canvas.width, canvas.height);
    updatePlayer(canvas.height);
    drawPlayer(ctx);
    drawObstacles(ctx, canvas.width, canvas.height);
    drawBoss(ctx, canvas.width, canvas.height);

    // تغيير المستوى كل 20 نقطة
    if(score>0 && score % 20 === 0){
        nextLevel();
    }

    requestAnimationFrame(update);
}
