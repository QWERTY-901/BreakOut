import { 
  BRICK_CONFIG, 
  BRICK_COLORS, 
  BRICK_TYPES, 
  POINTS, 
  LEVEL_CONFIG 
} from '../constants/gameConstants';

export const createLevel = (levelNumber) => {
  const config = LEVEL_CONFIG[levelNumber] || LEVEL_CONFIG[1];
  const bricks = [];
  const colors = BRICK_COLORS[`LEVEL${levelNumber}`] || BRICK_COLORS.LEVEL1;
  
  // Create different patterns for each level
  const patterns = {
    1: createStandardPattern,
    2: createCheckerboardPattern,
    3: createPyramidPattern,
    4: createDiamondPattern,
    5: createRandomPattern
  };

  const pattern = patterns[levelNumber] || createStandardPattern;
  return pattern(levelNumber, config, colors, bricks);
};

const createStandardPattern = (level, config, colors, bricks) => {
  for (let row = 0; row < config.brickRows; row++) {
    for (let col = 0; col < BRICK_CONFIG.COLS; col++) {
      const brick = {
        x: col * (BRICK_CONFIG.WIDTH + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_LEFT,
        y: row * (BRICK_CONFIG.HEIGHT + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_TOP,
        width: BRICK_CONFIG.WIDTH,
        height: BRICK_CONFIG.HEIGHT,
        color: colors[row % colors.length],
        type: BRICK_TYPES.NORMAL,
        points: POINTS.NORMAL_BRICK,
        destroyed: false,
        hits: level > 3 ? 2 : 1 // Harder bricks in higher levels
      };
      bricks.push(brick);
    }
  }
  return bricks;
};

const createCheckerboardPattern = (level, config, colors, bricks) => {
  for (let row = 0; row < config.brickRows; row++) {
    for (let col = 0; col < BRICK_CONFIG.COLS; col++) {
      // Create checkerboard pattern
      if ((row + col) % 2 === 0) {
        const isSpecial = Math.random() < 0.2;
        const brick = {
          x: col * (BRICK_CONFIG.WIDTH + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_LEFT,
          y: row * (BRICK_CONFIG.HEIGHT + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_TOP,
          width: BRICK_CONFIG.WIDTH,
          height: BRICK_CONFIG.HEIGHT,
          color: isSpecial ? BRICK_COLORS.BONUS : colors[row % colors.length],
          type: isSpecial ? BRICK_TYPES.BONUS : BRICK_TYPES.NORMAL,
          points: isSpecial ? POINTS.BONUS_BRICK : POINTS.NORMAL_BRICK,
          destroyed: false,
          hits: isSpecial ? 1 : (level > 3 ? 2 : 1)
        };
        bricks.push(brick);
      }
    }
  }
  return bricks;
};

const createPyramidPattern = (level, config, colors, bricks) => {
  const maxCols = BRICK_CONFIG.COLS;
  const center = Math.floor(maxCols / 2);
  
  for (let row = 0; row < config.brickRows; row++) {
    const rowWidth = maxCols - row * 2;
    const startCol = center - Math.floor(rowWidth / 2);
    
    for (let col = 0; col < rowWidth; col++) {
      const actualCol = startCol + col;
      if (actualCol >= 0 && actualCol < maxCols) {
        const isSpecial = row === 0; // Top row is special
        const brick = {
          x: actualCol * (BRICK_CONFIG.WIDTH + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_LEFT,
          y: row * (BRICK_CONFIG.HEIGHT + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_TOP,
          width: BRICK_CONFIG.WIDTH,
          height: BRICK_CONFIG.HEIGHT,
          color: isSpecial ? BRICK_COLORS.BONUS : colors[row % colors.length],
          type: isSpecial ? BRICK_TYPES.BONUS : BRICK_TYPES.NORMAL,
          points: isSpecial ? POINTS.BONUS_BRICK : POINTS.NORMAL_BRICK,
          destroyed: false,
          hits: isSpecial ? 1 : (level > 2 ? 2 : 1)
        };
        bricks.push(brick);
      }
    }
  }
  return bricks;
};

const createDiamondPattern = (level, config, colors, bricks) => {
  const maxCols = BRICK_CONFIG.COLS;
  const center = Math.floor(maxCols / 2);
  
  for (let row = 0; row < config.brickRows; row++) {
    let rowWidth;
    let startCol;
    
    if (row < Math.floor(config.brickRows / 2)) {
      // Top half - expanding
      rowWidth = 1 + row * 2;
      startCol = center - Math.floor(rowWidth / 2);
    } else {
      // Bottom half - contracting
      const bottomRow = row - Math.floor(config.brickRows / 2);
      rowWidth = config.brickRows - bottomRow * 2;
      startCol = center - Math.floor(rowWidth / 2);
    }
    
    for (let col = 0; col < rowWidth; col++) {
      const actualCol = startCol + col;
      if (actualCol >= 0 && actualCol < maxCols) {
        const isSpecial = Math.abs(row - Math.floor(config.brickRows / 2)) <= 1;
        const brick = {
          x: actualCol * (BRICK_CONFIG.WIDTH + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_LEFT,
          y: row * (BRICK_CONFIG.HEIGHT + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_TOP,
          width: BRICK_CONFIG.WIDTH,
          height: BRICK_CONFIG.HEIGHT,
          color: isSpecial ? BRICK_COLORS.HARD : colors[row % colors.length],
          type: isSpecial ? BRICK_TYPES.HARD : BRICK_TYPES.NORMAL,
          points: isSpecial ? POINTS.HARD_BRICK : POINTS.NORMAL_BRICK,
          destroyed: false,
          hits: isSpecial ? 2 : 1
        };
        bricks.push(brick);
      }
    }
  }
  return bricks;
};

const createRandomPattern = (level, config, colors, bricks) => {
  for (let row = 0; row < config.brickRows; row++) {
    for (let col = 0; col < BRICK_CONFIG.COLS; col++) {
      // Random chance to place brick
      if (Math.random() < 0.8) {
        const rand = Math.random();
        let type, color, points, hits;
        
        if (rand < 0.1) {
          type = BRICK_TYPES.BONUS;
          color = BRICK_COLORS.BONUS;
          points = POINTS.BONUS_BRICK;
          hits = 1;
        } else if (rand < 0.3) {
          type = BRICK_TYPES.HARD;
          color = BRICK_COLORS.HARD;
          points = POINTS.HARD_BRICK;
          hits = 2;
        } else {
          type = BRICK_TYPES.NORMAL;
          color = colors[Math.floor(Math.random() * colors.length)];
          points = POINTS.NORMAL_BRICK;
          hits = 1;
        }
        
        const brick = {
          x: col * (BRICK_CONFIG.WIDTH + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_LEFT,
          y: row * (BRICK_CONFIG.HEIGHT + BRICK_CONFIG.PADDING) + BRICK_CONFIG.OFFSET_TOP,
          width: BRICK_CONFIG.WIDTH,
          height: BRICK_CONFIG.HEIGHT,
          color,
          type,
          points,
          destroyed: false,
          hits
        };
        bricks.push(brick);
      }
    }
  }
  return bricks;
};
