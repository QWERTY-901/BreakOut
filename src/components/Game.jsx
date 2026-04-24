import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { CANVAS_WIDTH, CANVAS_HEIGHT, GAME_STATES } from '../constants/gameConstants';
import { createLevel } from '../utils/levelGenerator';
import { checkCollisions } from '../utils/collisionDetection';
import { drawGame } from '../utils/renderer';
import './Game.css';

const Game = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  
  // Game state
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('breakoutHighScore') || '0');
  });

  // Game objects
  const [paddle, setPaddle] = useState({
    x: CANVAS_WIDTH / 2 - 50,
    y: CANVAS_HEIGHT - 30,
    width: 100,
    height: 10,
    speed: 8,
    dx: 0
  });

  const [ball, setBall] = useState({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - 50,
    radius: 8,
    speed: 5,
    dx: 3,
    dy: -3
  });

  const [bricks, setBricks] = useState([]);
  const [particles, setParticles] = useState([]);

  // Initialize level
  const initializeLevel = useCallback((level) => {
    const newBricks = createLevel(level);
    setBricks(newBricks);
    setBall({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 50,
      radius: 8,
      speed: 5 + (level - 1) * 0.5, // Increase speed with level
      dx: 3,
      dy: -(5 + (level - 1) * 0.5)
    });
    setPaddle(prev => ({
      ...prev,
      width: Math.max(80, 100 - (level - 1) * 5) // Decrease paddle width with level
    }));
  }, []);

  // Handle keyboard input
  useKeyboardControls(paddle, setPaddle, gameState);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameState !== GAME_STATES.PLAYING) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Update paddle
    setPaddle(prev => {
      let newX = prev.x + prev.dx;
      newX = Math.max(0, Math.min(CANVAS_WIDTH - prev.width, newX));
      return { ...prev, x: newX };
    });

    // Update ball
    setBall(prev => {
      let newX = prev.x + prev.dx;
      let newY = prev.y + prev.dy;
      let newDx = prev.dx;
      let newDy = prev.dy;

      // Wall collisions
      if (newX - prev.radius <= 0 || newX + prev.radius >= CANVAS_WIDTH) {
        newDx = -newDx;
      }
      if (newY - prev.radius <= 0) {
        newDy = -newDy;
      }

      // Bottom boundary (lose life)
      if (newY + prev.radius >= CANVAS_HEIGHT) {
        setLives(l => {
          const newLives = l - 1;
          if (newLives <= 0) {
            setGameState(GAME_STATES.GAME_OVER);
          } else {
            setGameState(GAME_STATES.BALL_LOST);
          }
          return newLives;
        });
        return prev; // Reset ball position
      }

      return { ...prev, x: newX, y: newY, dx: newDx, dy: newDy };
    });

    // Check collisions
    const collisions = checkCollisions(ball, paddle, bricks);
    
    if (collisions.paddle) {
      setBall(prev => ({
        ...prev,
        dy: -Math.abs(prev.dy),
        dx: prev.dx + (prev.x - (paddle.x + paddle.width / 2)) * 0.1 // Add spin based on hit position
      }));
    }

    if (collisions.bricks.length > 0) {
      setBricks(prev => {
        const newBricks = [...prev];
        let scoreIncrease = 0;
        
        collisions.bricks.forEach(hit => {
          const brick = newBricks[hit.index];
          if (brick && !brick.destroyed) {
            brick.destroyed = true;
            scoreIncrease = brick.points;
            
            // Create particles
            setParticles(p => [
              ...p,
              ...Array.from({ length: 5 }, () => ({
                x: brick.x + brick.width / 2,
                y: brick.y + brick.height / 2,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1,
                color: brick.color
              }))
            ]);
          }
        });
        
        setScore(s => s + scoreIncrease);
        return newBricks;
      });

      setBall(prev => ({
        ...prev,
        dy: -prev.dy
      }));
    }

    // Update particles
    setParticles(prev => 
      prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.2,
          life: p.life - 0.02
        }))
        .filter(p => p.life > 0)
    );

    // Check win condition
    setBricks(currentBricks => {
      const activeBricks = currentBricks.filter(brick => !brick.destroyed);
      if (activeBricks.length === 0) {
        if (currentLevel < 5) {
          setGameState(GAME_STATES.LEVEL_COMPLETE);
        } else {
          setGameState(GAME_STATES.WIN);
        }
      }
      return currentBricks;
    });

    // Render game
    drawGame(ctx, paddle, ball, bricks, particles);

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, paddle, ball, bricks, particles, currentLevel]);

  // Start/restart game
  const startGame = () => {
    setGameState(GAME_STATES.PLAYING);
    setScore(0);
    setLives(3);
    setCurrentLevel(1);
    initializeLevel(1);
  };

  // Next level
  const nextLevel = () => {
    const nextLevelNum = currentLevel + 1;
    setCurrentLevel(nextLevelNum);
    setGameState(GAME_STATES.PLAYING);
    initializeLevel(nextLevelNum);
  };

  // Reset ball after losing life
  const resetBall = () => {
    setBall({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 50,
      radius: 8,
      speed: 5 + (currentLevel - 1) * 0.5,
      dx: 3,
      dy: -(5 + (currentLevel - 1) * 0.5)
    });
    setPaddle(prev => ({ ...prev, x: CANVAS_WIDTH / 2 - prev.width / 2 }));
    setGameState(GAME_STATES.PLAYING);
  };

  // Handle game state changes
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      requestRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('breakoutHighScore', score.toString());
    }
  }, [score, highScore]);

  // Initialize first level
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING && bricks.length === 0) {
      initializeLevel(currentLevel);
    }
  }, [gameState, currentLevel, initializeLevel, bricks.length]);

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-info">
          <div className="score">Score: {score}</div>
          <div className="high-score">High Score: {highScore}</div>
          <div className="level">Level: {currentLevel}</div>
          <div className="lives">Lives: {'❤️'.repeat(lives)}</div>
        </div>
      </div>

      <div className="game-canvas-container">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="game-canvas"
        />
        
        {/* Game State Overlays */}
        {gameState === GAME_STATES.MENU && (
          <div className="game-overlay menu">
            <h1>Breakout Game</h1>
            <p>Break all the bricks to advance through 5 levels!</p>
            <button onClick={startGame} className="game-button">Start Game</button>
            <div className="controls">
              <p>Controls:</p>
              <p>← → Arrow Keys or A/D to move</p>
            </div>
          </div>
        )}

        {gameState === GAME_STATES.BALL_LOST && (
          <div className="game-overlay">
            <h2>Ball Lost!</h2>
            <p>Lives remaining: {lives}</p>
            <button onClick={resetBall} className="game-button">Continue</button>
          </div>
        )}

        {gameState === GAME_STATES.LEVEL_COMPLETE && (
          <div className="game-overlay">
            <h2>Level {currentLevel} Complete!</h2>
            <p>Score: {score}</p>
            <button onClick={nextLevel} className="game-button">Next Level</button>
          </div>
        )}

        {gameState === GAME_STATES.GAME_OVER && (
          <div className="game-overlay">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <p>High Score: {highScore}</p>
            <button onClick={startGame} className="game-button">Play Again</button>
          </div>
        )}

        {gameState === GAME_STATES.WIN && (
          <div className="game-overlay">
            <h2>🎉 You Win! 🎉</h2>
            <p>Congratulations! You completed all 5 levels!</p>
            <p>Final Score: {score}</p>
            <p>High Score: {highScore}</p>
            <button onClick={startGame} className="game-button">Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
