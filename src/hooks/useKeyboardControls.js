import { useEffect } from 'react';
import { GAME_STATES } from '../constants/gameConstants';

export const useKeyboardControls = (paddle, setPaddle, gameState) => {
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          setPaddle(prev => ({ ...prev, dx: -prev.speed }));
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          setPaddle(prev => ({ ...prev, dx: prev.speed }));
          break;
        case ' ':
        case 'Escape':
          e.preventDefault();
          // Could add pause functionality here
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'a':
        case 'A':
        case 'd':
        case 'D':
          e.preventDefault();
          setPaddle(prev => ({ ...prev, dx: 0 }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [paddle.speed, setPaddle, gameState]);
};
