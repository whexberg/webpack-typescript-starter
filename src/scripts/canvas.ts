import { randomIntFromRange, randomColor, hexToRgb } from './utils';
import { AppColors } from './constants';
import { Point } from './point';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

// Objects
class Particle {
    position: Point = new Point();
    origin: Point = new Point();
    radius: number;
    color: string;
    radians: number = Math.random() * Math.PI * 2;
    velocity: number = Math.PI / 180;
    distanceFromCenter: number = randomIntFromRange(80, 150);
    lastMouse: Point;
    trail: Array<{ x: number; y: number }> = [];

    constructor(position: Point, radius: number, color: string) {
        this.origin = position.clone();
        this.position = position.clone();
        this.lastMouse = position.clone();
        this.radius = radius;
        this.color = color;
    }

    public update = () => {
        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        this.position = new Point(
            this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter,
            this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter,
        );

        if (this.trail.length > 20) {
            this.trail.shift();
        }
        this.trail.push(this.position);

        this.draw();
    };

    private draw = () => {
        ctx.beginPath();
        ctx.lineWidth = this.radius;
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
            const point = this.trail[i];
            const color = hexToRgb(this.color) ?? { r: 255, g: 255, b: 255 };
            ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${(i / this.trail.length).toFixed(2)})`;
            ctx.lineCap = 'round';
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
        ctx.closePath();
    };
}

// Implementation
let particles: Particle[] = [];
const init = () => {
    particles = [];

    for (let i = 0; i < 50; i++) {
        const radius = Math.random() * 2 + 1;
        particles.push(new Particle(new Point(canvas.width / 2, canvas.height / 2), radius, randomColor(AppColors)));
    }
};

const renderLegend = () => {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, 100, AppColors.length * 30 + 40);

    let height = 0;
    AppColors.forEach((color) => {
        height += 30;
        ctx.font = '20px Georgia';
        ctx.fillStyle = color;
        ctx.fillText(color, 10, height);
    });

    requestAnimFrame();
    if (showFPS) {
        ctx.fillStyle = 'white';
        ctx.fillText(`${fps} fps`, 10, height + 30);
    }
};

// Animation Loop
const animate = () => {
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => p.update());

    renderLegend();

    requestAnimationFrame(animate);
};

let lastCalledTime: number;
let fps = 0;
let delta = 0;
const showFPS = true;

const requestAnimFrame = () => {
    if (!lastCalledTime) {
        lastCalledTime = performance.now();
        fps = 0;
        return;
    }
    delta = (performance.now() - lastCalledTime) / 1000;
    lastCalledTime = performance.now();
    fps = Math.round(1 / delta);
};

init();
animate();
