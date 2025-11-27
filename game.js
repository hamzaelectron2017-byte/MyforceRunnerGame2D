const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 350;

// -------- GAME DATA -------- //

let game = {
    level: 1,
    maxLevel: 10,
    score: 0,
    lives: 3,
    speed: 5,
    playing: true,
};

// Background colors for levels
const levelBackgrounds = [
    "#4A90E2",  // Level 1: City
    "#2ECC71",  // Level 2: Forest
    "#A0522D",  // Level 3: Village
    "#566573",  // Level 4: Port Dock
    "#F4D03F",  // Level 5: Beach
    "#6A1B9A",  // Level 6
    "#212F3C",  // Level 7
    "#1ABC9C",  // Level 8
    "#BA4A00",  // Level 9
    "#000000"   // Level 10 Boss
];

// -------- PLAYER -------- //

let player = {
    x: 60,
    y: 260,
    width: 40,
    height: 40,
    dy: 0,
    jumpPower: -11,
    gravity: 0.5,
    onGround: true
};

// -------- OBSTACLES -------- //

let obstacles = [];
function spawnObstacle() {
    obstacles.push({
        x: 800,
        width: 30,
        height: 40,
        y: 260,
        speed: game.speed
    });
}

setInterval(() => {
    if (game.playing) spawnObstacle();
}, 1500);

// -------- BOSS LEVEL -------- //

let boss = {
    active: false,
    x: 650,
    y: 200,
    width: 100,
    height: 100,
    hp: 5,
    speed: 4,
};

// -------- GAME LOOP -------- //

function update() {
    if (!game.playing) return;

    // Player physics
    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y + player.height >= canvas.height - 10) {
        player.y = canvas.height - player.height - 10;
        player.dy = 0;
        player.onGround = true;
    }

    // Move obstacles
    obstacles.forEach((o, i) => {
        o.x -= game.speed;

        // Remove passed obstacle
        if (o.x + o.width < 0) {
            obstacles.splice(i, 1);
            game.score++;

            // Level up every 15 obstacles
            if (game.score > 0 && game.score % 15 === 0) {
                nextLevel();
            }
        }

        // Collision
        if (
            player.x < o.x + o.width &&
            player.x + player.width > o.x &&
            player.y < o.y + o.height &&
            player.height + player.y > o.y
        ) {
            obstacles.splice(i, 1);
            game.lives--;
            if (game.lives <= 0) gameOver();
        }
    });

    // Boss logic
    if (boss.active) {
        boss.x -= boss.speed;
        if (boss.x < 400) boss.speed = -boss.speed;
        if (boss.x > 700) boss.speed = -boss.speed;

        // Collision with Boss
        if (
            player.x < boss.x + boss.width &&
            player.x + player.width > boss.x &&
            player.y < boss.y + boss.height &&
            player.height + player.y > boss.y
        ) {
            game.lives--;
            if (game.lives <= 0) gameOver();
        }
    }
}

function draw() {
    // Background
    ctx.fillStyle = levelBackgrounds[game.level - 1];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Obstacles
    ctx.fillStyle = "red";
    obstacles.forEach(o => {
        ctx.fillRect(o.x, o.y, o.width, o.height);
    });

    // Boss
    if (boss.active) {
        ctx.fillStyle = "purple";
        ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
    }

    // HUD
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + game.score, 20, 30);
    ctx.fillText("Lives: " + game.lives, 20, 60);
    ctx.fillText("Level: " + game.level, 20, 90);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// -------- LEVEL SYSTEM -------- //

function nextLevel() {
    if (game.level === game.maxLevel - 1) {
        startBossLevel();
        return;
    }

    if (game.level < game.maxLevel - 1) {
        game.level++;
        game.speed += 0.7;
    }
}

function startBossLevel() {
    game.level = game.maxLevel;
    boss.active = true;
    obstacles = [];
}

// -------- GAME OVER -------- //

function gameOver() {
    game.playing = false;
    alert("GAME OVER! Total Score: " + game.score);
    document.location.reload();
}

// -------- INPUT -------- //

window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && player.onGround) {
        player.dy = player.jumpPower;
        player.onGround = false;
    }
});
