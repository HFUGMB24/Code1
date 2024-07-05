"use strict";
const collisionCanvas = document.getElementsByTagName("canvas")[0];
const collisionCtx = collisionCanvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
collisionCanvas.addEventListener("click", checkCollision);
let birds = createBirds(10);
let score = 0;
function checkCollision(_event) {
    let x = _event.offsetX;
    let y = _event.offsetY;
    for (let i = 0; i < birds.length; i++) {
        let bird = birds[i];
        if (collisionCtx.isPointInPath(bird.path, x, y)) {
            birds.splice(i, 1);
            birdWasHit();
            return;
        }
    }
}
function birdWasHit() {
    birds.push(createBirds(1)[0]);
    score++;
    scoreDisplay.innerText = score.toString();
}
drawBirds();
function createBirds(_amount) {
    let birds = [];
    for (let i = 0; i < _amount; i++) {
        let bird = {
            x: Math.random() * 600,
            y: Math.random() * 600,
            size: Math.random() * 50 + 10,
            color: `hsl(${Math.random() * 360}, ${Math.random() * 70 + 10}%, 50%)`,
            path: new Path2D(),
        };
        birds.push(bird);
    }
    return birds;
}
function drawBird(_bird) {
    let path = new Path2D();
    path.rect(_bird.x, _bird.y, _bird.size, _bird.size);
    collisionCtx.fillStyle = _bird.color;
    collisionCtx.fill(path);
    _bird.path = path;
}
function drawBirds() {
    for (let i = 0; i < birds.length; i++) {
        let bird = birds[i];
        drawBird(bird);
    }
}
const speed = 50;
function updateBirds(_deltaTime) {
    // for (let i: number = 0; i < birds.length; i++) {
    //     let bird = birds[i];
    //     bird.x += speed;
    // }
    for (let bird of birds) {
        bird.x += speed * _deltaTime;
        if (bird.x > collisionCanvas.width) {
            bird.x = -bird.size;
        }
    }
}
let previousFrameTimeCollision = 0;
function animationFrame(_elapsedTime) {
    let currentFrameDeltaTime = (_elapsedTime - previousFrameTimeCollision) / 1000;
    previousFrameTimeCollision = _elapsedTime;
    collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);
    updateBirds(currentFrameDeltaTime);
    drawBirds();
    requestAnimationFrame(animationFrame);
}
requestAnimationFrame(animationFrame);
//# sourceMappingURL=collision.js.map