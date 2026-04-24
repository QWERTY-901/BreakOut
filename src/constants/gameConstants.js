export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  BALL_LOST: 'ball_lost',
  LEVEL_COMPLETE: 'level_complete',
  GAME_OVER: 'game_over',
  WIN: 'win'
};

export const BRICK_TYPES = {
  NORMAL: 'normal',
  HARD: 'hard',
  BONUS: 'bonus'
};

export const BRICK_COLORS = {
  NORMAL: '#FF6B6B',
  HARD: '#4ECDC4',
  BONUS: '#FFD93D',
  LEVEL1: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  LEVEL2: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
  LEVEL3: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'],
  LEVEL4: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
  LEVEL5: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE']
};

export const PADDLE_CONFIG = {
  INITIAL_WIDTH: 100,
  INITIAL_HEIGHT: 10,
  INITIAL_SPEED: 8,
  MIN_WIDTH: 60,
  HEIGHT: 10
};

export const BALL_CONFIG = {
  INITIAL_RADIUS: 8,
  INITIAL_SPEED: 5,
  MAX_SPEED: 12,
  SPEED_INCREMENT: 0.5
};

export const BRICK_CONFIG = {
  ROWS: 8,
  COLS: 10,
  WIDTH: 70,
  HEIGHT: 20,
  PADDING: 5,
  OFFSET_TOP: 60,
  OFFSET_LEFT: 35
};

export const POINTS = {
  NORMAL_BRICK: 10,
  HARD_BRICK: 20,
  BONUS_BRICK: 50
};

export const LEVEL_CONFIG = {
  1: {
    name: "Beginner",
    ballSpeedMultiplier: 1,
    paddleWidthMultiplier: 1,
    brickRows: 5,
    specialBricks: 0
  },
  2: {
    name: "Easy",
    ballSpeedMultiplier: 1.1,
    paddleWidthMultiplier: 0.95,
    brickRows: 6,
    specialBricks: 2
  },
  3: {
    name: "Medium",
    ballSpeedMultiplier: 1.2,
    paddleWidthMultiplier: 0.9,
    brickRows: 7,
    specialBricks: 4
  },
  4: {
    name: "Hard",
    ballSpeedMultiplier: 1.3,
    paddleWidthMultiplier: 0.85,
    brickRows: 8,
    specialBricks: 6
  },
  5: {
    name: "Expert",
    ballSpeedMultiplier: 1.4,
    paddleWidthMultiplier: 0.8,
    brickRows: 8,
    specialBricks: 8
  }
};
