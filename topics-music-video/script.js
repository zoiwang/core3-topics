let canvas, ctx, w, h, circles;
let colors = [
    [120, 0, 0],
    [120, 0, 0],
    [120, 0, 0],
    [120, 0, 0],
    [120, 0, 0],
];

function init() {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    resizeReset();
    animationLoop();
}

function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    circles = [];
    createObject();
}

function createObject() {
    for (let i = 0; i < w * h * 0.0015; i++) {
        circles.push(new Circle(i));
    }
}

function animationLoop() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    drawScene();
    requestAnimationFrame(animationLoop);
}

function drawScene() {
    circles.map((circle) => {
        circle.update();
        circle.draw();
    })
}

function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

class Circle {
    constructor(i) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = 40;
        this.color = colors[i % colors.length];
        this.alpha = Math.random() * 0.5 + 0.2;
        this.alpha = Math.random() * 0.1 + 0.1;
        this.tick = 0;
        this.ttl = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        if (this.tick >= this.ttl) {
            this.setTarget();
        }
        let progress = this.tick / this.ttl;

        this.x = this.startX + (this.targetX - this.x) * easeInOutQuad(progress);
        this.y = this.startY + (this.targetY - this.y) * easeInOutQuad(progress);

        this.tick++;
    }
    setTarget() {
        this.startX = this.x;
        this.startY = this.y;
        this.targetX = this.x + (Math.random() * 200 - 90);
        this.targetY = this.y + (Math.random() * 200 - 90);
        this.tick = 0;
        this.ttl = Math.random() * 150 + 150;
    }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);