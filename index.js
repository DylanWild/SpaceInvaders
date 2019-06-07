let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 0;
let dy = -6;
let bulletRadius = 3;

let heroWidth = 80;
let heroHeight = 100;
let heroX = (canvas.width-heroWidth)/2;
let heroY = canvas.height-90;
let rightPressed = false;
let leftPressed = false;
let bulletX = x
let bulletY = y

let alienRowCount = 4;
let alienColumnCount =10;
let alienWidth = 50;
let alienHeight = 20;
let alienPadding = 22;
let alienOffsetTop = 30;
let alienOffsetLeft = 30;

let counterX = 0;
let counterY = 0;

let score = 0;
let lives = 3;

let aliens = [];
for(let c=0; c<alienColumnCount; c++){
    aliens[c]=[];
    for(let r=0; r<alienRowCount; r++){
        aliens[c][r] = { x:0, y:0, status:1}
    }
}

let pewPew = new Audio('./pewpew.mp3');
let title = new Audio('./titlebackground.mp3')
let gameBack = new Audio('./uranus.mp3')
let soundCount = 1

function animationWait(time){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    });
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function collisionDetection(){
    for(let c=0;c<alienColumnCount;c++){
        for(let r=0;r<alienRowCount;r++){
            let b = aliens[c][r];
            if(b.status == 1){
            if(bulletX >b.x && bulletX < b.x+alienWidth && bulletY > b.y && bulletY < b.y+alienHeight){
                b.status = 0;
                score++
                bulletX = heroX+heroWidth/2
                bulletY = heroY
                

                }
            }
        }
    }
}

function drawScore(){
    ctx.font = '16px Courier';
    ctx.fillStyle = 'white';
    ctx.fillText("Score: "+score, 50, 20)
}
function drawLives() {
    ctx.font = '16px Courier';
    ctx.fillStyle = 'white';
    ctx.fillText("Lives: "+lives, canvas.width-45,20);
}
let heroImage = new Image();
heroImage.src = '/shipgif.gif'

let drawHero = () => {
    ctx.beginPath();
    ctx.drawImage(heroImage,heroX, heroY, heroWidth, heroHeight)
    ctx.fillStyle = 'white'
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
let alienImage = new Image();
alienImage.src = '/alien1.png'
function drawAliens() {
    for ( let c=0;c<alienColumnCount;c++){
        for(let r=0;r<alienRowCount;r++){
            if(aliens[c][r].status == 1){
            let alienX = (c*(alienWidth+alienPadding))+alienOffsetLeft;
            let alienY = (r*(alienHeight+alienPadding))+alienOffsetTop;
            aliens[c][r].x = alienX;
            aliens[c][r].y = alienY;
            ctx.beginPath();
            ctx.drawImage(alienImage,alienX,alienY,alienWidth,alienHeight);
            ctx.fillStyle = 'white'
            ctx.fill();
            ctx.closePath;
            }
        }
    }
}

async function moveAliens() {
if(counterX < 4){
alienOffsetLeft += 50
counterX++
}
await animationWait(4000)
if(counterY < 1){
    alienOffsetTop += 50
    counterY++
}
await animationWait(1000)
if(counterX < 8){
    alienOffsetLeft -= 50
    counterX++
}
await animationWait(4000)
if(counterY < 2){
    alienOffsetTop += 50
    counterY++
}
await animationWait(1000)
if(counterX < 12){
    alienOffsetLeft += 50
    counterX++
}
await animationWait(4000)
if(counterY < 3){
    alienOffsetTop += 50
    counterY++
}
await animationWait(1000)
if(counterX < 16){
    alienOffsetLeft -= 50
    counterX++
}
await animationWait(4000)
if(counterY < 4){
    alienOffsetTop += 50
    counterY++
}
await animationWait(1000)
if(counterX < 20){
    alienOffsetLeft += 50
    counterX++
}
await animationWait(4000)
if(counterY < 5){
    alienOffsetTop += 50
    counterY++
}
await animationWait(1000)
if(counterX < 24){
    alienOffsetLeft -= 50
    counterX++
}
await animationWait(4000)
if(counterY < 6){
    alienOffsetTop += 50
    counterY++
}
await animationWait(1000)
if(counterX < 28){
    alienOffsetLeft += 50
    counterX++
}
await animationWait(4000)
if(counterY < 7){
    alienOffsetTop += 50
    counterY++
}
await animationWait(1000)
if(counterX < 32){
    alienOffsetLeft -= 50
    counterX++
}
await animationWait(4000)
if(counterY < 8){
    alienOffsetTop += 50
    counterY++
}
await animationWait(1000)
if(counterX < 36){
    alienOffsetLeft += 50
    counterX++
}
await animationWait(4000)
if(counterY < 9){
    alienOffsetTop += 50
    counterY++
}
await animationWait(1000)

alert("Game Over")
document.location.reload();
requestAnimationFrame(draw);
} 

document.onkeydown = async function(e){
    
    if(e.key === 'x'){
        if(soundCount%2!==0){
        pewPew.play();
        }
        for(i=0;i<100;i++){
            
       bulletX += dx
       bulletY += dy
       await animationWait(5)
        }
        bulletX = heroX+heroWidth/2
        bulletY = heroY
        alternate = false
    } 
    if(e.key === 'm'){
    soundCount++
    if(soundCount%2===0){
    gameBack.pause()
    title.pause()
    } else if(soundCount%2!==0){
        gameBack.play()
        title.play()
    }
    }
}




let move = async()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    await animationWait(1000)
    moveAliens()
    requestAnimationFrame(move)
}

let bullet = () => {
    ctx.beginPath();
    ctx.rect(bulletX,bulletY+10,bulletRadius,10,5);
    ctx.fillStyle = 'red'
    ctx.fill();
    ctx.closePath();
    

}




let draw = async()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawHero();
    drawAliens();
    collisionDetection();
    drawScore();
    drawLives();
    bullet();
    
    

    
    if(rightPressed && heroX < canvas.width - heroWidth){
        heroX += 7;
        bulletX += 7;
    } else if (leftPressed && heroX > 0){
        heroX -= 7;
        bulletX-=7;
    }
    if(score===40){
        await animationWait(1000)
        alert('winner')
        document.location.reload();
        requestAnimationFrame(draw);
    }
requestAnimationFrame(draw);
}
function menu() {
    title.play()
    ctx.fillStyle = 'white';
    ctx.font = '36px Courier';
    ctx.textAlign = 'center';
    ctx.fillText('Space Invaders', canvas.width / 2, canvas.height / 4+10);
    ctx.font = '24px Courier';
    ctx.fillText('Click to Start', canvas.width / 2, canvas.height / 2-30);
    ctx.font = '18px Courier';
    ctx.fillText('X to shoot', canvas.width / 2, (canvas.height / 4-30) * 3);
    ctx.font = '18px Courier';
    ctx.fillText('M to Mute', canvas.width / 2, (canvas.height / 4-45) * 3);
    canvas.addEventListener('click', startGame);
  }
 
  function startGame() {
    title.pause()
   gameBack.play()
 draw();
 move()
 canvas.removeEventListener('click', startGame);
}

menu();