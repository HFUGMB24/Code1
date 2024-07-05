"use strict";
const movementCanvas = document.getElementsByTagName("canvas")[0];
const movementCtx = movementCanvas.getContext("2d");
let car = {
    color: "blueviolet",
    size: 50,
    x: movementCanvas.width / 2 - 25,
    y: movementCanvas.height / 2 - 25,
};
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
const pressedKeys = [];
function onKeyDown(_event) {
    if (!pressedKeys.includes(_event.key)) {
        pressedKeys.push(_event.key);
    }
}
function onKeyUp(_event) {
    let index = pressedKeys.indexOf(_event.key);
    if (index >= 0) {
        pressedKeys.splice(index, 1);
    }
}
function moveCar() {
    let moveX = 0;
    let moveY = 0;
    if (pressedKeys.includes("w")) {
        moveY -= 1;
    }
    if (pressedKeys.includes("s")) {
        moveY += 1;
    }
    if (pressedKeys.includes("a")) {
        moveX -= 1;
    }
    if (pressedKeys.includes("d")) {
        moveX += 1;
    }
    car.x += moveX;
    car.y += moveY;
}
function drawCar() {
    let path = new Path2D();
    path.rect(car.x, car.y, car.size, car.size);
    movementCtx.fillStyle = car.color;
    movementCtx.fill(path);
}
function update() {
    movementCtx.clearRect(0, 0, movementCanvas.width, movementCanvas.height);
    moveCar();
    drawCar();
    requestAnimationFrame(update);
}
requestAnimationFrame(update);
//# sourceMappingURL=movement.js.map