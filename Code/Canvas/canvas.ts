const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

/*
ctx.rect(10, 10, 100, 100);
// ctx.fill();
ctx.strokeStyle = "blue";
ctx.lineWidth = 5;
ctx.stroke();



ctx.fillStyle = "rgb(255, 0, 255)";
let path: Path2D = new Path2D();
path.rect(200, 200, 50, 50);
ctx.fill(path);
*/

// ctx.rotate(10 * Math.PI / 180);
// ctx.fillRect(50, 50, 100, 100);
/*
ctx.scale(5, 5);
for(let i: number = 0; i < 5; i++){
    ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 50%)`
    ctx.fillRect(50, 50, 100, 100);
    ctx.rotate(10 * Math.PI / 180);
}*/

function drawBackground(): void {
    let backgroundPath: Path2D = new Path2D();
    for (let i: number = 0; i < 10; i++) {
        let height: number = Math.random() * canvas.height / 2;
        let width: number = Math.random() * canvas.width / 2;
        backgroundPath.rect(Math.random() * canvas.width, canvas.height - height, width, height);
    }
    ctx.fill(backgroundPath);
}

drawBackground();
let imgData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

interface Bird {
    x: number,
    y: number,
    size: number,
    color: string,
}

let birds: Bird[] = createBirds(10);
drawBirds();

function createBirds(_amount: number): Bird[] {
    let birds: Bird[] = [];
    for (let i: number = 0; i < _amount; i++) {
        let bird: Bird = {
            x: Math.random() * 600,
            y: Math.random() * 600,
            size: Math.random() * 50 + 10,
            color: `hsl(${Math.random() * 360}, ${Math.random() * 70 + 10}%, 50%)`,
        }
        birds.push(bird);
    }

    return birds;
}

function drawBird(_bird: Bird): void {
    let path: Path2D = new Path2D();

    path.rect(_bird.x, _bird.y, _bird.size, _bird.size);
    ctx.fillStyle = _bird.color;
    ctx.fill(path);
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
        if (bird.x > canvas.width) { 
            bird.x = -bird.size;
        }
    }
}

let previousFrameTime: number = 0;
function animationFrame(_elapsedTime: number): void {
    let currentFrameDeltaTime: number = (_elapsedTime - previousFrameTime) / 1000;
    previousFrameTime = _elapsedTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imgData, 0, 0);
    updateBirds(currentFrameDeltaTime);
    drawBirds();
    requestAnimationFrame(animationFrame);
}

requestAnimationFrame(animationFrame);