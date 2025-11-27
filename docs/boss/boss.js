const boss = {
    x: window.innerWidth,
    y: window.innerHeight - 200,
    width: 150,
    height: 150,
    speed: 2,
    health: 3,
    color: "darkred",
    active: false
};

function drawBoss(ctx, canvasWidth, canvasHeight){
    if(score > 20) boss.active = true;

    if(boss.active){
        boss.x -= boss.speed;
        ctx.fillStyle = boss.color;
        ctx.fillRect(boss.x, boss.y, boss.width, boss.height);

        if(checkCollision(boss)){
            player.lives = 0;
            document.getElementById("lives").textContent = "Lives: 0";
            alert("Hit by Boss! Game Over.");
            window.location.reload();
        }

        if(boss.x + boss.width < 0){
            boss.x = canvasWidth;
            boss.health--;
            if(boss.health <=0){
                boss.active = false;
                alert("You defeated the Boss! Score: "+score);
                window.location.reload();
            }
        }
    }
}
