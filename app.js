const canvas = document.getElementById("myPongGame")

      // Get the canvas and context
      let context = canvas.getContext("2d");

      // Ball object
      let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        dx: 5,
        dy: 5,
      };

      // Left paddle object
      let leftPaddle = {
        x: 0,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        dy: 0,
        speed: 5,
      };

      // Right paddle object
      let rightPaddle = {
        x: canvas.width - 10,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        dy: 0,
        speed: 50,
      };

      // Score variables
      let playerScore = 0;
      let aiScore = 0;

      // Reset the ball and paddles
      function reset() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
        leftPaddle.y = canvas.height / 2 - 50;
        rightPaddle.y = canvas.height / 2 - 50;
      }

      // Draw the ball and paddles
      function draw() {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the ball
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "#000";
    context.fill();
    context.closePath();

    // Draw the left paddle
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

    // Draw the right paddle
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    // Draw the score
    context.font = "32px Arial";
    context.fillStyle = "#fff";
    context.fillText(playerScore, 50, 50);
    context.fillText(aiScore, canvas.width - 50, 50);
  }

  // Update the ball and paddles
  function update() {
    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off the top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.dy = -ball.dy;
    }

    // Bounce off the paddles
    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + leftPaddle.height) {
      ball.dx = -ball.dx;
    } else if (ball.x + ball.radius > rightPaddle.x &&
               ball.y > rightPaddle.y &&
               ball.y < rightPaddle.y + rightPaddle.height) {
      ball.dx = -ball.dx;
    }

    // Move the paddles
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    // Prevent paddles from going out of bounds
    if (leftPaddle.y < 0) {
      leftPaddle.y = 0;
    } else if (leftPaddle.y + leftPaddle.height > canvas.height) {
      leftPaddle.y = canvas.height - leftPaddle.height;
    }

    if (rightPaddle.y < 0) {
      rightPaddle.y = 0;
    } else if (rightPaddle.y + rightPaddle.height > canvas.height) {
      rightPaddle.y = canvas.height - rightPaddle.height;
    }

    // AI controls the right paddle
    let aiPaddleY = ball.y - rightPaddle.height / 2;
    rightPaddle.dy = (aiPaddleY - rightPaddle.y) * 0.1;

    // Check if ball goes out of bounds
    if (ball.x + ball.radius < 0) {
      // AI scores
      aiScore++;
      reset();
    } else if (ball.x - ball.radius > canvas.width) {
      // Player scores
      playerScore++;
      reset();
    }
  }

  // Handle keyboard input
  function keyDownHandler(event) {
    if (event.key === "ArrowUp") {
      leftPaddle.dy = -leftPaddle.speed;
    } else if (event.key === "ArrowDown") {
      leftPaddle.dy = leftPaddle.speed;
    }
  }

  function keyUpHandler(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      leftPaddle.dy = 0;
    }
  }

  // Add event listeners for keyboard input
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  // Game loop
  function loop() {
    update();
    draw();
  requestAnimationFrame(loop);
}

  // Reset the ball and paddles
  function reset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = Math.random() * 4 - 2;

    leftPaddle.y = canvas.height / 2 - leftPaddle.height / 2;
    rightPaddle.y = canvas.height / 2 - rightPaddle.height / 2;
  }

  // Start the game
  reset();
  loop();




