let currentLevel = 1;
const totalLevels = 10;
const bgImages = [];
for(let i=1; i<=totalLevels; i++){
    const img = new Image();
    img.src = `assets/level${i}/layer1.png`;
    bgImages.push(img);
}

const bgLayer = { x:0, speed:2 };

function drawBackground(ctx, canvasWidth, canvasHeight){
    const img = bgImages[currentLevel-1];

    if(!img.complete || img.naturalWidth === 0){
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        return;
    }

    bgLayer.x -= bgLayer.speed;
    if(bgLayer.x <= -canvasWidth) bgLayer.x = 0;

    ctx.drawImage(img, bgLayer.x, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, bgLayer.x + canvasWidth, 0, canvasWidth, canvasHeight);
}

function nextLevel(){
    if(currentLevel < totalLevels){
        currentLevel++;
        bgLayer.x = 0;
    }
}
