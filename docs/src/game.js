// ------------------- Background -------------------
let currentLevel = 1; // البداية من Level 1
const totalLevels = 10;

// Array لتخزين صور الخلفيات لكل مستوى
const bgImages = [];

for(let i=1; i<=totalLevels; i++){
    const img = new Image();
    img.src = `assets/level${i}/layer1.png`;
    bgImages.push(img);
}

// Layer scroll
const bgLayer = {
    x: 0,
    speed: 2
};

// Draw background function
function drawBackground(ctx, canvasWidth, canvasHeight){
    const img = bgImages[currentLevel - 1]; // الصورة الحالية
    bgLayer.x -= bgLayer.speed;
    if(bgLayer.x <= -canvasWidth) bgLayer.x = 0;

    if(img.complete){
        ctx.drawImage(img, bgLayer.x, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, bgLayer.x + canvasWidth, 0, canvasWidth, canvasHeight);
    } else {
        // إذا الصورة لم تُحمّل بعد، ارسم خلفية بلون
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
    }
}

// تغيير المستوى
function nextLevel(){
    if(currentLevel < totalLevels){
        currentLevel++;
        bgLayer.x = 0;
    }
}
