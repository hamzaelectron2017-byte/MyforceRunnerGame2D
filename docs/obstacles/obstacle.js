const obstacles = [];

function createObstacle(canvasWidth, canvasHeight){
    const types = ["spike","tnt","laser"];
    const type = types[Math.floor(Math.random()*types.length)];
    let height = type==="spike"?40:type==="tnt"?50:20;

    obstacles.push({
        x: canvasWidth,
        y: canvasHeight - height - 100,
        width: 30,
        height: height,
        type: type,
        color: type==="spike"?"black":type==="tnt"?"red":"purple",
        speed: 6
    });
}

function drawObstacles(ctx, canvasWidth, canvasHeight){
    if(Math.random() < 0.02) createObstacle(canvasWidth, canvasHeight);

    obstacles.forEach((obs, i) => {
        obs.x -= obs.speed;
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        if(checkCollision(obs)){
            player.lives--;
            document.getElementById("lives").textContent = "Lives: "+player.lives;
            obstacles.splice(i,1);
            if(player.lives <=0){
                alert("Game Over! Score: "+score);
                window.location.reload();
            }
        }

        if(obs.x + obs.width < 0){
            obstacles.splice(i,1);
            score++;
            document.getElementById("score").textContent = "Score: "+score;
        }
    });
}
