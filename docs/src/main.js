const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// مثال: رسم شخصية
const player = {
  x: 50,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  color: "red"
};

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // رسم الشخصية
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
}

update();
