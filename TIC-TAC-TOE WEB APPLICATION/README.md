# 🎮 Tic-Tac-Toe Web Application

A stunning, feature-rich Tic-Tac-Toe game with modern design, multiple game modes, and an immersive user experience.

## ✨ Features

### 🎯 Multiple Pages
- **Home Page** - Beautiful landing page with animated backgrounds and feature showcase
- **Game Modes** - Choose from various play styles and difficulty levels
- **Classic Game** - The main 2-player game with score tracking
- **Leaderboard** - View rankings, achievements, and your statistics
- **About** - Learn about the game, rules, and strategies

### 🎨 Design Highlights
- Modern dark theme with stunning gradient effects
- Smooth animations and transitions
- Glassmorphism UI elements
- Animated starfield background
- Responsive design for all devices
- Glowing text effects for X and O

### 🎮 Game Features
- **2 Player Mode** - Play with friends locally
- **Score Tracking** - Persistent scores saved in browser
- **Win Detection** - Automatic win/draw detection
- **Animated Victory** - Beautiful modal with victory animations
- **Keyboard Support** - Use number keys 1-9, R to restart, ESC to close modals
- **Sound Effects** - Visual feedback for all interactions

### 📊 Statistics & Progress
- Track total games played
- Monitor win/loss records
- View win rate percentages
- Check current win streak
- Unlock achievements

### 🏆 Achievements System
- First Victory
- Hot Streak (5 wins in a row)
- Century Club (100 wins)
- AI Slayer (Beat Hard AI)
- Speed Demon (Win in under 30s)
- Legend (Reach rank 1)

## 🚀 Getting Started

### Installation
1. Download or clone this repository
2. Open `home.html` in your web browser to start

### File Structure
```
TIC-TAC-TOE WEB APPLICATION/
├── home.html              # Landing page
├── home-style.css         # Shared styles for all pages
├── home-script.js         # Landing page interactions
├── game-modes.html        # Game mode selection
├── game-modes-style.css   # Game modes styling
├── game-modes-script.js   # Statistics and animations
├── index.html             # Main 2-player game
├── style.css              # Game board styles
├── script.js              # Game logic
├── leaderboard.html       # Rankings and achievements
├── leaderboard-style.css  # Leaderboard styling
├── leaderboard-script.js  # Leaderboard data
├── about.html             # About page with game info
├── about-style.css        # About page styling
├── about-script.js        # Interactive demos
└── README.md              # This file
```

## 🎯 How to Play

1. **Start the Game**
   - Open `home.html` in your browser
   - Click "Start Playing" or navigate to Game Modes
   - Select "2 Player" mode

2. **Playing**
   - Players take turns clicking on empty cells
   - X always goes first
   - Get three in a row (horizontal, vertical, or diagonal) to win
   - If all cells are filled without a winner, it's a draw

3. **Controls**
   - **Mouse**: Click cells to place your mark
   - **Keyboard**: Press 1-9 to select cells
   - **R Key**: Restart the game
   - **ESC**: Close modals

## 💻 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript** - Game logic and interactivity
- **Local Storage** - Persistent data storage

## 🎨 Customization

### Changing Colors
Edit the CSS variables in any style file:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --player-x-color: #667eea;
    --player-o-color: #f5576c;
}
```

### Modifying Game Rules
Edit `script.js` to change:
- Winning combinations
- Score calculation
- Timer settings
- AI difficulty

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🐛 Known Issues

None at this time! If you find any bugs, please report them.

## 🚀 Future Enhancements

- [ ] Online multiplayer
- [ ] AI opponents (Easy, Medium, Hard)
- [ ] Timed game mode
- [ ] Random/chaos mode with power-ups
- [ ] Sound effects and music
- [ ] Theme customization
- [ ] Tournament mode
- [ ] Global leaderboard sync

## 📄 License

This project is open source and available for personal and educational use.

## 👨‍💻 Developer

Created with ❤️ by the SkillCraft team

---

**Enjoy the game! May the best player win! 🏆**
