# Flappy Croco Game

A modern web-based implementation of the classic Flappy Bird game featuring a crocodile character. Built with HTML5 Canvas and designed for deployment on the Yandex.Games platform with comprehensive SDK integration.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
- [Development](#development)
- [Game Mechanics](#game-mechanics)
- [Customization](#customization)
- [Platform Integration](#platform-integration)
- [File Structure](#file-structure)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

Flappy Croco is a pixel art styled endless runner game where players control a crocodile character navigating through pipes. The game features:

- **Retro pixel art aesthetic** with sky blue background (#87CEEB), forest green pipes (#228B22), and golden yellow accents (#FFD700)
- **Responsive design** for both desktop and mobile devices
- **Yandex.Games SDK integration** for platform publishing and monetization
- **Comprehensive settings panel** for gameplay customization
- **Background music** and sound effects
- **Visual debugging tools** for development

## Features

### Core Gameplay
- ✅ Classic Flappy Bird mechanics with crocodile character
- ✅ Responsive touch and keyboard controls (spacebar/click to jump)
- ✅ Score tracking with high score persistence
- ✅ Collision detection with visual debugging
- ✅ Endless pipe generation with randomized gaps

### Customization
- ✅ **Settings Panel**: Adjustable game parameters via intuitive UI
  - Bird size scaling (0.5x - 2.0x)
  - Pipe size scaling (0.5x - 2.0x)
  - Bird collision box width/height (0.3x - 1.0x)
  - Pipe collision box width/height (0.3x - 1.2x)
  - Game speed multiplier (0.5x - 3.0x)
  - Pipe gap size (150px - 350px)

### Audio System
- ✅ Background music with toggle control
- ✅ Sound effects for jumps, scoring, and collisions
- ✅ Volume control and mute functionality
- ✅ User preference persistence

### Platform Integration
- ✅ **Yandex.Games SDK** for platform compliance
- ✅ Advertisement integration (interstitial ads)
- ✅ Cloud save functionality for cross-device progress
- ✅ Authentication system (optional Yandex ID login)

### Development Tools
- ✅ Visual collision debugging with colored boxes
- ✅ Performance monitoring and logging
- ✅ Responsive canvas resizing
- ✅ Asset loading management

## Architecture

### Technology Stack
- **Frontend**: HTML5 Canvas with vanilla JavaScript
- **Backend**: Express.js with TypeScript (for full-stack version)
- **Database**: PostgreSQL with Drizzle ORM (for user data)
- **Build Tools**: Vite for development and production builds
- **Styling**: CSS3 with custom pixel art aesthetic

### Game Loop Architecture
```
Game Initialization
├── Asset Loading (sprites, audio)
├── Canvas Setup & Resize Handling
├── SDK Integration (Yandex.Games)
└── Settings Panel Initialization

Main Game Loop
├── Input Processing (keyboard/touch)
├── Physics Update (gravity, velocity, collision)
├── Game State Management (menu/playing/gameOver)
├── Rendering (sprites, UI, debug info)
└── Audio Management
```

### State Management
The game uses a simple state machine with four primary states:
- `loading`: Initial asset loading
- `menu`: Main menu screen
- `playing`: Active gameplay
- `gameOver`: End game screen with restart options

## Setup & Installation

### Prerequisites
- Node.js 18+ (for full-stack version)
- Modern web browser with HTML5 Canvas support
- (Optional) PostgreSQL database for user data

### Quick Start
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flappy-croco
   ```

2. **For standalone HTML5 version**:
   ```bash
   # Serve the files locally
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **For full-stack version**:
   ```bash
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:8000` or `http://localhost:5000`

### Environment Variables
For full-stack deployment:
```env
DATABASE_URL=postgresql://user:password@host:port/database
PGPORT=5432
PGUSER=your_user
PGPASSWORD=your_password
PGDATABASE=your_database
PGHOST=your_host
```

## Development

### File Structure
```
flappy-croco/
├── assets/                     # Game assets
│   ├── attached_assets/        # Audio and sprite files
│   │   ├── background music_*.mp3
│   │   ├── bird_*.png
│   │   ├── pipe_*.png
│   │   └── background_*.png
├── client/                     # React frontend (full-stack)
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── pages/
├── server/                     # Express backend (full-stack)
│   ├── index.ts
│   ├── routes.ts
│   └── storage.ts
├── shared/                     # Shared types/schemas
├── game.js                     # Main game logic
├── index.html                  # Game UI and layout
├── style.css                   # Game styling
├── yandex-sdk.js              # Platform SDK integration
└── README.md                   # This file
```

### Core Game Files

#### `game.js` - Main Game Engine
The primary game logic containing:
- **FlappyCrocoGame class**: Main game controller
- **Physics engine**: Gravity, collision detection, movement
- **Rendering system**: Canvas drawing and sprite management
- **Settings management**: Real-time parameter adjustment
- **Audio system**: Music and sound effect control

Key methods:
```javascript
class FlappyCrocoGame {
    init()                    // Initialize game systems
    loadAssets()             // Load sprites and audio
    gameLoop()               // Main render/update loop
    update(deltaTime)        // Physics and logic updates
    render()                 // Canvas rendering
    checkCollisions()        // Collision detection
    spawnPipe()             // Procedural pipe generation
    updateSettings()         // Real-time setting updates
}
```

#### `index.html` - Game UI Structure
Contains:
- **Canvas element**: Main game rendering surface
- **UI overlays**: Menu screens, HUD, game over screen
- **Settings panel**: Comprehensive game customization controls
- **Audio elements**: Background music integration

#### `style.css` - Visual Design
Implements:
- **Pixel art aesthetic**: Retro gaming visual style
- **Responsive design**: Mobile and desktop compatibility
- **UI components**: Buttons, sliders, overlays
- **Animation effects**: Smooth transitions and hover states

#### `yandex-sdk.js` - Platform Integration
Handles:
- **SDK initialization**: Yandex.Games platform setup
- **Advertisement system**: Interstitial ad display
- **Data persistence**: Cloud save/load functionality
- **Authentication**: Optional user login

### Development Workflow

#### Adding New Features
1. **Modify game logic** in `game.js`
2. **Update UI elements** in `index.html`
3. **Add styling** in `style.css`
4. **Test across devices** for responsiveness
5. **Update settings panel** if configurable

#### Asset Management
Assets are loaded dynamically in `loadAssets()` method:
```javascript
// Adding new sprites
this.images.newSprite = new Image();
this.images.newSprite.src = 'path/to/sprite.png';
this.images.newSprite.onload = () => { /* handle load */ };
```

#### Settings Integration
New customizable parameters:
1. **Add slider to HTML**:
   ```html
   <div class="setting-group">
       <label>New Setting:</label>
       <input type="range" id="newSetting" min="0.1" max="2.0" step="0.1" value="1.0">
       <span id="newSettingValue">1.0</span>
   </div>
   ```

2. **Initialize in JavaScript**:
   ```javascript
   this.setupSettingSlider('newSetting', (value) => {
       this.newSettingValue = value;
       document.getElementById('newSettingValue').textContent = value.toFixed(1);
   });
   ```

3. **Apply in game logic**:
   ```javascript
   // Use this.newSettingValue in relevant calculations
   ```

## Game Mechanics

### Physics System
- **Gravity**: Constant downward acceleration (base: 0.13)
- **Jump Force**: Upward velocity on input (base: -3)
- **Pipe Speed**: Horizontal movement speed (base: 1)
- **Collision Detection**: AABB (Axis-Aligned Bounding Box) with scaling

### Collision System
The game implements separate collision scaling for enhanced gameplay:

#### Bird Collision
- **Width Scale**: 0.3 - 1.0 (default: 0.5)
- **Height Scale**: 0.3 - 1.0 (default: 0.5)
- **Application**: Centers scaled collision box within sprite bounds

#### Pipe Collision
- **Width Scale**: 0.3 - 1.2 (default: 0.7)
- **Height Scale**: 0.8 - 1.2 (default: 1.0)
- **Application**: Adjusts collision area while maintaining visual appearance

### Scoring System
- **Points**: +1 for each pipe successfully passed
- **Detection**: Triggered when bird's center passes pipe's right edge
- **High Score**: Automatically saved with user preferences

### Procedural Generation
- **Pipe Spawning**: Automatic generation at configurable intervals
- **Gap Positioning**: Randomized within safe boundaries
- **Difficulty**: Consistent throughout gameplay (no progression)

## Customization

### Game Parameters
All parameters are adjustable via the settings panel:

| Setting | Range | Default | Effect |
|---------|-------|---------|---------|
| Bird Size | 0.5x - 2.0x | 1.0x | Visual sprite scaling |
| Pipe Size | 0.5x - 2.0x | 1.0x | Visual sprite scaling |
| Bird Collision Width | 0.3x - 1.0x | 0.5x | Hitbox width |
| Bird Collision Height | 0.3x - 1.0x | 0.5x | Hitbox height |
| Pipe Collision Width | 0.3x - 1.2x | 0.7x | Pipe hitbox width |
| Pipe Collision Height | 0.8x - 1.2x | 1.0x | Pipe hitbox height |
| Game Speed | 0.5x - 3.0x | 1.0x | Overall game speed |
| Pipe Gap | 150px - 350px | 250px | Vertical gap size |

### Visual Debugging
Toggle collision visualization for development:
- **Red boxes**: Bird collision areas
- **Green boxes**: Pipe collision areas
- **Blue boxes**: Ground collision areas
- **Debug info**: Real-time position and velocity data

### Color Scheme
Primary colors following retro aesthetic:
```css
:root {
    --sky-blue: #87CEEB;
    --forest-green: #228B22;
    --golden-yellow: #FFD700;
    --dark-red: #DC143C;
    --brown: #8B4513;
}
```

## Platform Integration

### Yandex.Games SDK
The game integrates with Yandex.Games platform for:

#### Advertisement System
```javascript
// Interstitial ads shown every 3 game overs
if (this.adCounter >= 3 && window.yandexSDK) {
    this.adCounter = 0;
    window.yandexSDK.showInterstitialAd();
}
```

#### Data Persistence
```javascript
// Save game data to cloud
await window.yandexSDK.saveData({
    highScore: this.highScore,
    soundEnabled: this.soundEnabled,
    musicEnabled: this.musicEnabled
});

// Load game data from cloud
const gameData = await window.yandexSDK.loadData();
```

#### Gameplay Events
```javascript
// Mark gameplay start/stop for analytics
window.yandexSDK.startGameplay();
window.yandexSDK.stopGameplay();
```

### Fallback Systems
When SDK is unavailable:
- **localStorage**: Local data persistence
- **Direct asset loading**: No CDN dependencies
- **Graceful degradation**: Full functionality without platform features

## API Reference

### FlappyCrocoGame Class

#### Constructor
```javascript
new FlappyCrocoGame()
```
Initializes the game with default settings and begins asset loading.

#### Core Methods

##### `init()`
Initializes canvas, sets up event listeners, and starts the game loop.

##### `loadAssets()`
Asynchronously loads all game sprites and audio files.
- Returns: `Promise<void>`
- Throws: Asset loading errors

##### `startGame()`
Begins a new game session.
- Resets bird position and velocity
- Clears existing pipes
- Sets game state to 'playing'

##### `gameOver()`
Handles game end logic.
- Updates high score if applicable
- Triggers advertisement system
- Saves game data

##### `jump()`
Applies upward velocity to bird.
- Sets `bird.velocity` to `JUMP_FORCE`
- Plays jump sound effect

##### `updateSettings()`
Applies current setting values to game parameters.
- Called automatically when settings change
- Updates physics constants based on scaling factors

#### Properties

##### Game State
- `gameState`: Current game phase ('loading'|'menu'|'playing'|'gameOver')
- `score`: Current game score
- `highScore`: Best score achieved

##### Physics
- `GRAVITY`: Downward acceleration constant
- `JUMP_FORCE`: Upward velocity on jump
- `PIPE_SPEED`: Horizontal pipe movement speed

##### Scaling Factors
- `birdSizeScale`: Visual bird size multiplier
- `pipeSizeScale`: Visual pipe size multiplier
- `birdCollisionWidthScale`: Bird hitbox width multiplier
- `birdCollisionHeightScale`: Bird hitbox height multiplier
- `pipeCollisionWidthScale`: Pipe hitbox width multiplier
- `pipeCollisionHeightScale`: Pipe hitbox height multiplier

### Settings Panel API

#### Slider Configuration
```javascript
this.setupSettingSlider(id, callback)
```
- `id`: HTML element ID of the range input
- `callback`: Function called with new value when slider changes

#### Example Implementation
```javascript
this.setupSettingSlider('gameSpeed', (value) => {
    this.gameSpeedScale = value;
    this.updateGameSpeed();
    document.getElementById('gameSpeedValue').textContent = value.toFixed(1);
});
```

## Troubleshooting

### Common Issues

#### Assets Not Loading
**Symptoms**: Black screen, missing sprites
**Solutions**:
- Verify file paths in `attached_assets/` directory
- Check browser console for 404 errors
- Ensure image files are properly formatted (PNG/JPG)

#### Audio Not Playing
**Symptoms**: Silent gameplay, audio errors in console
**Solutions**:
- Check audio file format (MP3 recommended)
- Verify autoplay policies (user interaction may be required)
- Test audio controls in main menu

#### Performance Issues
**Symptoms**: Low FPS, stuttering gameplay
**Solutions**:
- Reduce game speed setting
- Disable collision debugging (`showCollisionBoxes = false`)
- Check browser hardware acceleration

#### SDK Integration Errors
**Symptoms**: Platform features not working
**Solutions**:
- Verify Yandex.Games SDK is properly loaded
- Check console for SDK initialization errors
- Test with fallback localStorage system

### Debug Mode
Enable comprehensive debugging:
```javascript
// In game.js
this.showCollisionBoxes = true;  // Show collision areas
this.debugMode = true;           // Enable console logging
```

### Performance Monitoring
Monitor game performance:
```javascript
// Check frame rate
console.log('Delta time:', this.deltaTime);
console.log('FPS:', 1000 / this.deltaTime);
```

## Contributing

### Code Style
- Use consistent indentation (4 spaces)
- Add comments for complex logic
- Follow existing naming conventions
- Test on multiple devices/browsers

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Implement changes with tests
4. Update documentation
5. Submit pull request with description

### Bug Reports
Include:
- Browser and version
- Device type (desktop/mobile)
- Steps to reproduce
- Expected vs actual behavior
- Console error messages

### Feature Requests
Specify:
- Use case and motivation
- Proposed implementation approach
- Compatibility considerations
- Impact on existing gameplay

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For technical support or questions:
- Check the troubleshooting section above
- Review browser console for error messages
- Test with different browsers/devices
- Verify asset file integrity

---

**Game Version**: 1.0.0  
**Last Updated**: August 2025  
**Platform**: Yandex.Games Compatible  
**Compatibility**: Modern browsers with HTML5 Canvas support