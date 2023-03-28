const canvas = document.getElementById("myPongGame")
const ctx = canvas.getContext("2d")

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2, 
  radius: 10,
  speed: 5,
  dx: 5,
  dy: 5,
}

const leftPaddle = {
  x: 0,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  speed: 10,
  dy: 0,
}

const rightPaddle = {
  x: canvas.width - 10,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  speed: 50,
  dy: 0,
}


function draw(){
  // clears the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // drawing the ball
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()

  // drawing left paddle
  ctx.beginPath()
  ctx.rect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height)
  ctx.fill()
  ctx.closePath()

  //drawing the right paddle
  ctx.beginPath()
  ctx.rect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height)
  ctx.fill()
  ctx.closePath()


}

// moving the ball and paddles
  function update(){
  //the ball
  ball.x += ball.dx
  ball.y += ball.dy 

  // ball collision with walls
  if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
    ball.dy = -ball.dy
  }

  //ball collision with left paddle 
  if(ball.x - ball.radius < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height){
    ball.dx = -ball.dx
  }

  //ball collision with right paddle 
  if(ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height){
    ball.dx = -ball.dx
  }

  // move the left paddle 
  leftPaddle.y += leftPaddle.dy 

  // contain the left paddle within canvas 
  if(leftPaddle.y + leftPaddle.height > canvas.height){
    leftPaddle.y = canvas.height - leftPaddle.height
  }else if(leftPaddle.y < 0) {
    leftPaddle.y = 0
  }

  // Computer aided paddle 
  // Computer is just following the ball basically

  rightPaddle.y += (ball.y - (rightPaddle.y + rightPaddle.height / 2)) * rightPaddle.speed / 100

  // contain right paddle withing canvas
  if(rightPaddle.y + rightPaddle.height > canvas.height){
    rightPaddle.y = canvas.height - rightPaddle.height 
  } else if(rightPaddle.y < 0){
    rightPaddle.y = 0
  }
}

// eventlisteners for the player for left paddle
function controlLeftPaddle(event){
  switch(event.keyCode){
    case 38: // 38 means up arrow
      leftPaddle.dy = -leftPaddle.speed
      break 
    case 40: // 40 means down arrow 
      leftPaddle.dy = leftPaddle.speed
      break
  }
}

function stopLeftPaddle(event){
  switch(event.keyCode){
    case 38:
    case 40:
      leftPaddle.dy = 0 
      break
  }
}

// start the game 
function start(){
  setInterval(function () {
    update()
    draw()
  }, 10)

  document.addEventListener("keydown", controlLeftPaddle)
  document.addEventListener("keyup", stopLeftPaddle)
}

start()

