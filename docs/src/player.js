class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.velocityY = 0;
        this.gravity = 0.8;
        this.jumpPower = -15;
        this.isJumping = false;
    }

    draw(ctx) {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        if (this.y + this.height > 550) { // الأرض
            this.y = 550 - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = this.jumpPower;
            this.isJumping = true;
        }
    }
}
