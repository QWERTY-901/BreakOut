export const checkCollisions = (ball, paddle, bricks) => {
  const collisions = {
    paddle: null,
    bricks: []
  };

  // Check paddle collision
  if (checkPaddleCollision(ball, paddle)) {
    collisions.paddle = true;
  }

  // Check brick collisions
  bricks.forEach((brick, index) => {
    if (!brick.destroyed && checkBrickCollision(ball, brick)) {
      collisions.bricks.push({ index, brick });
    }
  });

  return collisions;
};

const checkPaddleCollision = (ball, paddle) => {
  return (
    ball.x + ball.radius >= paddle.x &&
    ball.x - ball.radius <= paddle.x + paddle.width &&
    ball.y + ball.radius >= paddle.y &&
    ball.y - ball.radius <= paddle.y + paddle.height
  );
};

const checkBrickCollision = (ball, brick) => {
  return (
    ball.x + ball.radius >= brick.x &&
    ball.x - ball.radius <= brick.x + brick.width &&
    ball.y + ball.radius >= brick.y &&
    ball.y - ball.radius <= brick.y + brick.height
  );
};

// More precise collision detection for better gameplay
export const checkCircleRectCollision = (circle, rect) => {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  
  const distanceX = circle.x - closestX;
  const distanceY = circle.y - closestY;
  
  const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
  return distanceSquared < (circle.radius * circle.radius);
};

// Determine which side of the brick was hit for more accurate ball deflection
export const getCollisionSide = (ball, brick) => {
  const ballCenterX = ball.x;
  const ballCenterY = ball.y;
  const brickCenterX = brick.x + brick.width / 2;
  const brickCenterY = brick.y + brick.height / 2;
  
  const dx = ballCenterX - brickCenterX;
  const dy = ballCenterY - brickCenterY;
  
  const width = (brick.width + ball.radius * 2) / 2;
  const height = (brick.height + ball.radius * 2) / 2;
  
  const crossWidth = width * dy;
  const crossHeight = height * dx;
  
  if (Math.abs(crossWidth) > Math.abs(crossHeight)) {
    return crossWidth > 0 ? 'top' : 'bottom';
  } else {
    return crossHeight > 0 ? 'left' : 'right';
  }
};
