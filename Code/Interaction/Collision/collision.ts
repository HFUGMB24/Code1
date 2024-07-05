interface Bird {
    x: number,
    y: number,
    size: number,
    color: string,
    path: Path2D,
}


const collisionCanvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0]!;
const collisionCtx: CanvasRenderingContext2D = collisionCanvas.getContext("2d")!;
const scoreDisplay: HTMLElement = document.getElementById("score")!;

collisionCanvas.addEventListener("click", checkCollision);
let birds: Bird[] = createBirds(10);
let score: number = 0;


function checkCollision(_event: MouseEvent): void {
    let x: number = _event.offsetX;
    let y: number = _event.offsetY;

    for (let i: number = 0; i < birds.length; i++) {
        let bird: Bird = birds[i];
        if (collisionCtx.isPointInPath(bird.path, x, y)) {
            birds.splice(i, 1);
            birdWasHit();
            return;
        }
    }
}

function birdWasHit(){
    birds.push(createBirds(1)[0]);
    score++;
    scoreDisplay.innerText = score.toString();
}

drawBirds();

function createBirds(_amount: number): Bird[] {
    let birds: Bird[] = [];
    for (let i: number = 0; i < _amount; i++) {
        let bird: Bird = {
            x: Math.random() * 600,
            y: Math.random() * 600,
            size: Math.random() * 50 + 10,
            color: `hsl(${Math.random() * 360}, ${Math.random() * 70 + 10}%, 50%)`,
            path: new Path2D(),
        }

        birds.push(bird);
    }

    return birds;
}

function drawBird(_bird: Bird): void {
    let path: Path2D = new Path2D();
    path.rect(_bird.x, _bird.y, _bird.size, _bird.size);
    collisionCtx.fillStyle = _bird.color;
    collisionCtx.fill(path);
    _bird.path = path;
}

function drawBirds(): void {
    for (let i: number = 0; i < birds.length; i++) {
        let bird = birds[i];
        drawBird(bird);
    }
}

const speed: number = 50;
function updateBirds(_deltaTime: number): void {
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

let previousFrameTimeCollision: number = 0;
function animationFrame(_elapsedTime: number): void {
    let currentFrameDeltaTime: number = (_elapsedTime - previousFrameTimeCollision) / 1000;
    previousFrameTimeCollision = _elapsedTime;

    collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);
    updateBirds(currentFrameDeltaTime);
    drawBirds();
    requestAnimationFrame(animationFrame);
}

requestAnimationFrame(animationFrame);