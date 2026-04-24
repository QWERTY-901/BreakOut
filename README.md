# 🎮 Breakout Game

A modern, fully-featured Breakout game built with React and Vite, featuring 5 levels of increasing difficulty, particle effects, and smooth animations.

## 🎯 Features

- **5 Progressive Levels**: Each level increases in difficulty with faster ball speed, smaller paddle, and more complex brick patterns
- **Unique Brick Patterns**: 
  - Level 1: Standard pattern
  - Level 2: Checkerboard pattern
  - Level 3: Pyramid pattern
  - Level 4: Diamond pattern
  - Level 5: Random pattern with mixed brick types
- **Particle Effects**: Visual feedback when bricks are destroyed
- **Score System**: Points for different brick types with persistent high score
- **Lives System**: 3 lives to complete all levels
- **Smooth Controls**: Arrow keys or A/D keys for paddle movement
- **Responsive Design**: Scales properly on different screen sizes
- **Modern UI**: Beautiful gradient backgrounds and smooth animations

## 🎮 How to Play

1. **Move the paddle**: Use ← → arrow keys or A/D keys
2. **Break all bricks**: Hit the ball with your paddle to destroy all bricks
3. **Advance levels**: Complete each level to progress to the next
4. **Score points**: Different bricks give different points
5. **Don't lose the ball**: You have 3 lives - lose them all and it's game over!

### Scoring System
- 🔴 Normal Bricks: 10 points
- 🔵 Hard Bricks: 20 points (require 2 hits)
- 🟡 Bonus Bricks: 50 points

### Level Progression
- **Level 1 (Beginner)**: Standard speed, full paddle width, 5 brick rows
- **Level 2 (Easy)**: 10% faster ball, 5% smaller paddle, 6 brick rows
- **Level 3 (Medium)**: 20% faster ball, 10% smaller paddle, 7 brick rows
- **Level 4 (Hard)**: 30% faster ball, 15% smaller paddle, 8 brick rows
- **Level 5 (Expert)**: 40% faster ball, 20% smaller paddle, 8 brick rows with special bricks

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
git clone https://github.com/your-username/breakout-game.git
cd breakout-game
npm install
```

### Development
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🛠️ Technical Stack

- **React 19**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Canvas API**: Hardware-accelerated 2D graphics rendering
- **CSS3**: Smooth animations and responsive design
- **GitHub Actions**: Automated CI/CD pipeline
- **GitHub Pages**: Free hosting for the game

## 📁 Project Structure

```
src/
├── components/
│   └── Game.jsx          # Main game component
├── constants/
│   └── gameConstants.js  # Game configuration
├── hooks/
│   └── useKeyboardControls.js  # Keyboard input handling
├── utils/
│   ├── levelGenerator.js     # Brick pattern generation
│   ├── collisionDetection.js # Physics and collision detection
│   └── renderer.js          # Canvas rendering
├── App.jsx                 # Main application component
└── App.css                 # Global styles
```

## 🎨 Game Architecture

### Core Components
- **Game Loop**: 60 FPS game loop using requestAnimationFrame
- **Collision Detection**: Precise circle-rectangle collision with side detection
- **Physics Engine**: Ball velocity, paddle deflection, and wall bouncing
- **Level System**: Procedural brick generation with increasing difficulty
- **Particle System**: Visual effects for brick destruction
- **State Management**: React hooks for game state, score, and lives

### Rendering Pipeline
1. Clear canvas with background
2. Render particle effects (bottom layer)
3. Render bricks with shadows and highlights
4. Render paddle with gradient effect
5. Render ball with radial gradient
6. Render UI overlays (menus, score, etc.)

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### CI/CD Pipeline
- **Trigger**: Push to main branch
- **Build**: Automated testing and production build
- **Deploy**: Automatic deployment to GitHub Pages
- **Environment**: Production with optimized assets

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy `dist` folder to your hosting service
3. Ensure base path is correctly configured in `vite.config.js`

## 🎮 Game Controls

| Action | Keyboard |
|--------|----------|
| Move Left | ← Arrow / A |
| Move Right | → Arrow / D |
| Pause | Space / Escape |

## 🐛 Troubleshooting

### Common Issues
1. **Game not loading**: Check browser console for errors
2. **Controls not working**: Ensure the game canvas has focus
3. **Performance issues**: Try reducing browser tab count or closing other applications
4. **Mobile issues**: Game is optimized for desktop but should work on touch devices

### Performance Tips
- Use modern browsers (Chrome, Firefox, Safari, Edge)
- Ensure hardware acceleration is enabled
- Close unnecessary browser tabs for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] Sound effects and music
- [ ] Power-ups (multi-ball, larger paddle, slow-motion)
- [ ] Leaderboard system
- [ ] Mobile touch controls
- [ ] Additional brick types
- [ ] Boss battles
- [ ] Achievement system
- [ ] Theme customization

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vite.dev/)
- Inspired by the classic Atari Breakout game
- Thanks to the open-source community for amazing tools and libraries

---

**🎮 Play the game here: [Live Demo](https://your-username.github.io/breakout-game/)**

*Made with ❤️ and React*
