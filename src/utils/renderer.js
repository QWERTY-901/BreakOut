export const drawGame = (ctx, paddle, ball, bricks, particles) => {
  // Clear canvas
  ctx.clearRect(0, 0, 800, 600);

  // Draw background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, 800, 600);

  // Draw particles (behind everything else)
  particles.forEach(particle => {
    ctx.globalAlpha = particle.life;
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
  });
  ctx.globalAlpha = 1;

  // Draw bricks
  bricks.forEach(brick => {
    if (!brick.destroyed) {
      // Brick shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(brick.x + 2, brick.y + 2, brick.width, brick.height);
      
      // Main brick
      ctx.fillStyle = brick.color;
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
      
      // Brick highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(brick.x, brick.y, brick.width, 2);
      ctx.fillRect(brick.x, brick.y, 2, brick.height);
      
      // Brick shadow (inner)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(brick.x, brick.y + brick.height - 2, brick.width, 2);
      ctx.fillRect(brick.x + brick.width - 2, brick.y, 2, brick.height);
    }
  });

  // Draw paddle
  // Paddle shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(paddle.x + 2, paddle.y + 2, paddle.width, paddle.height);
  
  // Main paddle
  const gradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.height);
  gradient.addColorStop(0, '#4ECDC4');
  gradient.addColorStop(1, '#2A9D8F');
  ctx.fillStyle = gradient;
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  
  // Paddle highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, 2);

  // Draw ball
  // Ball shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.arc(ball.x + 2, ball.y + 2, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Main ball
  const ballGradient = ctx.createRadialGradient(
    ball.x - ball.radius / 3, 
    ball.y - ball.radius / 3, 
    0,
    ball.x, 
    ball.y, 
    ball.radius
  );
  ballGradient.addColorStop(0, '#FFD93D');
  ballGradient.addColorStop(1, '#FFA500');
  ctx.fillStyle = ballGradient;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Ball highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.arc(ball.x - ball.radius / 3, ball.y - ball.radius / 3, ball.radius / 3, 0, Math.PI * 2);
  ctx.fill();
};
