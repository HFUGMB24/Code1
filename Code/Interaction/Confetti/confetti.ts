interface Vector2 {
    x: number,
    y: number,
}

interface Shape {
    type: "square" | "circle",
    position: Vector2,
    movement: Vector2,
    color: string,
    size: number,
}

const confettiCanvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0]!;
const confettiCtx: CanvasRenderingContext2D = confettiCanvas.getContext("2d")!;

confettiCanvas.addEventListener("click", spawnShape);

const shapes: Shape[] = [];


function randomColor(): string {
    return `hsl(${Math.random() * 360}, 80%, 50%)`;
}

function spawnShape(_event: MouseEvent): void {

    let confettiAmount: number = 1;
    for (let i: number = 0; i < confettiAmount; i++) {


        let newShape: Shape = {
            position: {
                x: _event.offsetX,
                y: _event.offsetY,
            },
            color: randomColor(),
            movement: {
                x: Math.random() * 10 - 5,
                y: Math.random() * -5,
            },
            size: Math.random() * 40 + 10,
            type: Math.random() > 0.5 ? "circle" : "square",
        };

        if (newShape.type === "square") {
            newShape.position.x -= newShape.size / 2;
            newShape.position.y -= newShape.size / 2;
        }

        shapes.push(newShape);
    }
}

function drawShape(_shape: Shape): void {
    let path: Path2D = new Path2D();
    if (_shape.type == "circle") {
        path.arc(_shape.position.x, _shape.position.y, _shape.size, 0, 2 * Math.PI);
    } else if (_shape.type == "square") {
        path.rect(_shape.position.x, _shape.position.y, _shape.size, _shape.size);
    }
    confettiCtx.fillStyle = _shape.color;
    confettiCtx.fill(path);
}

function updateShapePosition(_shape: Shape, _elapsedInSeconds: number): void {
    // gravity
    _shape.movement.y += _elapsedInSeconds * 9.81;

    // movement
    _shape.position.x += _shape.movement.x;
    _shape.position.y += _shape.movement.y;

    let shapeBottomY: number = _shape.position.y + _shape.size;
    if (shapeBottomY > confettiCanvas.height) {
        // we've hit the ground
        _shape.position.y = confettiCanvas.height - _shape.size;
        _shape.movement.x = 0;
        _shape.movement.y = 0;
    }
}

function updateAndDrawShapes(_shapes: Shape[], _elapsedInSeconds: number): void {
    for (let shape of shapes) {
        updateShapePosition(shape, _elapsedInSeconds);
        drawShape(shape);
    }
}

let previousFrameTime: number = 0;
function frame(_totalElapsedTime: number) {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)

    let currentFrameTime: number = _totalElapsedTime - previousFrameTime;
    updateAndDrawShapes(shapes, currentFrameTime / 1000);
    previousFrameTime = _totalElapsedTime;
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);