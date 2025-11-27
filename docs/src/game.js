const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ------------------- Background -------------------
const bgImage = new Image();
bgImage.src = "assets/layer1.png"; // ضع الصورة في مجلد assets
let bgX = 0;
const bgSpeed = 2; // سرعة تحرك الخلفية

// ------------------- Characters -------------------
const characters = {
    runner: {color:"red"},
    ninja: {color:"black"},
    robot: {color:"silver"}
};
let currentCharacter = characters.runner;

// Player
const player = {
    x: 150,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    dy: 0,
    gravity: 1.5,
    jumpPower: -22,
    grounded: false,
    lives: 3
};

// Obstacles
const obstacles = [];
function createObstacle() {
    const types = ["spike","tnt","laser"];
    const type = types[Math.floor(Math.random()*types.length)];
    let height = 30;
    if(type==="spike") height=40;
    if(type==="tnt") height=50;
    if(type==="laser") height=20;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height - 100,
        width: 30,
        height: height,
        type: type,
        color: type==="spike"?"black":type==="tnt"?"red":"purple",
        speed: 6
    });
}

// Boss
const boss = {
    x: canvas.width,
    y: canvas.height - 200,
    width: 150,
    height: 150,
    speed: 2,
    health: 3,
    color: "darkred",
    active: false
};

// Score
let score = 0;

// Controls
function jump() {
    if(player.grounded){
        player.dy = player.jumpPower;
        player.grounded = false;
    }
}

window.addEventListener("keydown", (e)=>{
    if(e.code==="Space") jump();
});

document.getElementById("jumpBtn").addEventListener("click", jump);

// ------------------- Game Loop -------------------
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw background (moving)
    bgX -= bgSpeed;
    if(bgX <= -canvas.width) bgX = 0;
    ctx.drawImage(bgImage, bgX, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, bgX + canvas.width, 0, canvas.width, canvas.height);

    // Player movement
    player.dy += player.gravity;
    player.y += player.dy;
    if(player.y + player.height >= canvas.height - 100){
        player.y = canvas.height - 100 - player.height;
        player.dy = 0;
        player.grounded = true;
    }

    ctx.fillStyle = currentCharacter.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Obstacles
    if(Math.random()<0.02) createObstacle();
    obstacles.forEach((obs, index)=>{
        obs.x -= obs.speed;
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        if(player.x < obs.x + obs.width &&
           player.x + player.width > obs.x &&
           player.y < obs.y + obs.height &&
           player.y + player.height > obs.y){
            player.lives--;
            obstacles.splice(index,1);
            document.getElementById("lives").textContent = "Lives: "+player.lives;
            if(player.lives<=0){
                alert("Game Over! Your Score: "+score);
                window.location.reload();
            }
        }

        if(obs.x + obs.width < 0){
            obstacles.splice(index,1);
            score++;
            document.getElementById("score").textContent = "Score: "+score;
        }
    });

    // Boss
    if(score>20) boss.active=true;
    if(boss.active){
        boss.x -= boss.speed;
        ctx.fillStyle = boss.color;
        ctx.fillRect(boss.x,boss.y,boss.width,boss.height);

        if(player.x < boss.x + boss.width &&
           player.x + player.width > boss.x &&
           player.y < boss.y + boss.height &&
           player.y + player.height > boss.y){
            player.lives=0;
            document.getElementById("lives").textContent = "Lives: 0";
            alert("Hit by the Boss! Game Over.");
            window.location.reload();
        }

        if(boss.x + boss.width < 0){
            boss.x = canvas.width;
            boss.health--;
            if(boss.health<=0){
                boss.active=false;
                alert("You defeated the Boss! Your Score: "+score);
                window.location.reload();
            }
        }
    }

    requestAnimationFrame(update);
}

update();
