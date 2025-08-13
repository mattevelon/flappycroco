// Flappy Croco Game
class FlappyCrocoGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = 'loading'; // loading, menu, playing, gameOver
        this.score = 0;
        this.highScore = 0;
        this.gameSpeed = 2;
        this.lastTime = 0;
        this.deltaTime = 0;
        
        // Game objects
        this.bird = null;
        this.pipes = [];
        this.ground = null;
        
        // Input handling
        this.keys = {};
        this.touchStartY = 0;
        this.isJumping = false;
        
        // Sound management
        this.soundEnabled = true;
        this.sounds = {};
        
        // SDK integration
        this.sdkReady = false;
        this.adCounter = 0;
        
        // Debug options
        this.showCollisionBoxes = true;
        
        // Base game settings (6x slower)
        this.BASE_GRAVITY = 0.13;
        this.BASE_JUMP_FORCE = -3;
        this.BASE_PIPE_SPEED = 1;
        this.BASE_PIPE_GAP = 250;
        this.BASE_PIPE_SPAWN_DISTANCE = 400;
        
        // Current game settings (will be modified by settings panel)
        this.GRAVITY = this.BASE_GRAVITY;
        this.JUMP_FORCE = this.BASE_JUMP_FORCE;
        this.PIPE_SPEED = this.BASE_PIPE_SPEED;
        this.PIPE_GAP = this.BASE_PIPE_GAP;
        this.PIPE_SPAWN_DISTANCE = this.BASE_PIPE_SPAWN_DISTANCE;
        
        // Scaling factors for settings
        this.birdSizeScale = 1.0;
        this.pipeSizeScale = 1.0;
        this.birdCollisionWidthScale = 0.5;
        this.birdCollisionHeightScale = 0.5;
        this.pipeCollisionWidthScale = 0.7;
        this.pipeCollisionHeightScale = 1.0;
        this.gameSpeedScale = 1.0;
        
        // Music control
        this.musicEnabled = true;
        
        // Background music
        this.backgroundMusic = document.getElementById('backgroundMusic');
        
        // Initialize game
        this.init();
        
        // Initialize settings panel
        this.initializeSettings();
    }

    async init() {
        this.setupCanvas();
        this.setupEventListeners();
        await this.loadAssets();
        this.setupGameObjects();
        this.loadSaveData();
        this.updateUI();
        
        // Wait for SDK if available
        this.waitForSDK();
        
        // Start game loop
        this.gameLoop();
        
        // Hide loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            this.gameState = 'menu';
            this.updateUI();
            console.log('Game ready - switched to menu state');
        }, 1000);
    }

    setupCanvas() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Disable context menu
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    resizeCanvas() {
        const container = document.getElementById('gameContainer');
        const containerRect = container.getBoundingClientRect();
        
        // Calculate optimal canvas size
        const maxWidth = Math.min(containerRect.width - 40, 800);
        const maxHeight = Math.min(containerRect.height - 40, 600);
        
        // Maintain 4:3 aspect ratio
        let width = maxWidth;
        let height = (maxWidth * 3) / 4;
        
        if (height > maxHeight) {
            height = maxHeight;
            width = (maxHeight * 4) / 3;
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Update canvas style
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
        console.log(`Canvas resized to: ${width}x${height}`);
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleJump();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Mouse controls
        this.canvas.addEventListener('click', () => {
            this.handleJump();
        });

        // Touch controls
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.touchStartY = e.touches[0].clientY;
            this.handleJump();
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });

        // UI controls
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('restartBtn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('menuBtn').addEventListener('click', () => {
            this.showMenu();
        });

        document.getElementById('soundBtn').addEventListener('click', () => {
            this.toggleSound();
        });

        // SDK ready event
        window.addEventListener('sdkReady', (e) => {
            this.sdkReady = e.detail.success;
            console.log('SDK ready status:', this.sdkReady);
        });

        // Page visibility change (pause/resume)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseGame();
            } else {
                this.resumeGame();
            }
        });
    }

    async loadAssets() {
        // Load sounds
        this.sounds = {
            jump: new Audio(),
            score: new Audio(),
            hit: new Audio()
        };

        // Load images
        this.images = {};
        
        try {
            // Load background
            this.images.background = new Image();
            this.images.background.src = '/attached_assets/background_1754947349044.png';
            
            // Load bird (crocodile)
            this.images.bird = new Image();
            this.images.bird.src = '/attached_assets/bird_1754947349045.png';
            
            // Load pipe images
            this.images.pipeTop = new Image();
            this.images.pipeTop.src = '/attached_assets/pipe_upper_1754947349046.png';
            
            this.images.pipeBottom = new Image();
            this.images.pipeBottom.src = '/attached_assets/pipe_down_1754947349046.png';
            
            // Wait for all images to load
            await Promise.all([
                this.waitForImageLoad(this.images.background),
                this.waitForImageLoad(this.images.bird),
                this.waitForImageLoad(this.images.pipeTop),
                this.waitForImageLoad(this.images.pipeBottom)
            ]);
            
            console.log('All game assets loaded successfully');
        } catch (error) {
            console.log('Error loading assets:', error);
        }

        // Generate simple audio tones for sounds
        this.generateSounds();
    }

    waitForImageLoad(img) {
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
        });
    }

    generateSounds() {
        // Generate simple audio tones using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Jump sound (short chirp)
        this.sounds.jump.src = this.generateTone(audioContext, 800, 0.1);
        
        // Score sound (pleasant ding)
        this.sounds.score.src = this.generateTone(audioContext, 1200, 0.2);
        
        // Hit sound (thud)
        this.sounds.hit.src = this.generateTone(audioContext, 200, 0.3);
    }

    generateTone(audioContext, frequency, duration) {
        const sampleRate = audioContext.sampleRate;
        const numSamples = sampleRate * duration;
        const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
        const channelData = buffer.getChannelData(0);

        for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 5); // Decay envelope
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.1;
        }

        // Convert buffer to data URL
        const offlineContext = new OfflineAudioContext(1, numSamples, sampleRate);
        const source = offlineContext.createBufferSource();
        source.buffer = buffer;
        source.connect(offlineContext.destination);
        source.start();

        return URL.createObjectURL(new Blob([''], { type: 'audio/wav' }));
    }

    setupGameObjects() {
        // Initialize bird (3x bigger)
        this.bird = {
            x: this.canvas.width * 0.2,
            y: this.canvas.height * 0.4,
            width: 120,
            height: 90,
            velocity: 0,
            rotation: 0
        };

        // Initialize ground
        this.ground = {
            y: this.canvas.height * 0.9,
            height: this.canvas.height * 0.1
        };

        // Clear pipes and spawn first pipe at safe distance
        this.pipes = [];
        // Don't spawn a pipe immediately - let bird get started first
    }

    waitForSDK() {
        // SDK integration will be handled through the global yandexSDK instance
        if (window.yandexSDK) {
            this.sdkReady = window.yandexSDK.isInitialized;
        }
    }

    handleJump() {
        if (this.gameState === 'menu') {
            this.startGame();
            return;
        }

        if (this.gameState === 'playing') {
            this.bird.velocity = this.JUMP_FORCE;
            this.bird.rotation = -30; // Tilt bird up
            this.playSound('jump');
            console.log('Bird jump - velocity:', this.bird.velocity);
        }

        if (this.gameState === 'gameOver') {
            this.startGame();
            return;
        }
    }

    startGame() {
        console.log('Starting game...');
        this.gameState = 'playing';
        this.score = 0;
        this.setupGameObjects();
        this.updateUI();
        
        // Mark gameplay start for SDK
        if (window.yandexSDK) {
            window.yandexSDK.startGameplay();
        }
    }

    pauseGame() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            console.log('Game paused');
        }
    }

    resumeGame() {
        if (this.gameState === 'paused') {
            this.gameState = 'playing';
            console.log('Game resumed');
        }
    }

    showMenu() {
        this.gameState = 'menu';
        this.updateUI();
        
        // Mark gameplay stop for SDK
        if (window.yandexSDK) {
            window.yandexSDK.stopGameplay();
        }
    }

    gameOver() {
        console.log('Game over! Final score:', this.score);
        this.gameState = 'gameOver';
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveData();
        }
        
        // Show ad occasionally
        this.adCounter++;
        if (this.adCounter >= 3 && window.yandexSDK) {
            this.adCounter = 0;
            window.yandexSDK.showInterstitialAd();
        }
        
        this.updateUI();
        this.playSound('hit');
        
        // Mark gameplay stop for SDK
        if (window.yandexSDK) {
            window.yandexSDK.stopGameplay();
        }
    }

    update(deltaTime) {
        if (this.gameState !== 'playing') return;

        // Update bird physics
        this.bird.velocity += this.GRAVITY;
        this.bird.y += this.bird.velocity;
        
        // Update bird rotation based on velocity
        this.bird.rotation = Math.min(Math.max(this.bird.velocity * 3, -30), 90);

        // Check ground collision
        if (this.bird.y + this.bird.height >= this.ground.y) {
            this.gameOver();
            return;
        }

        // Check ceiling collision
        if (this.bird.y <= 0) {
            this.bird.y = 0;
            this.bird.velocity = 0;
        }

        // Update pipes
        this.updatePipes();

        // Check pipe collisions
        this.checkCollisions();
    }

    initializeSettings() {
        // Start background music
        this.startBackgroundMusic();
        
        // Settings panel toggle
        const settingsToggle = document.getElementById('settingsToggle');
        const settingsContent = document.getElementById('settingsContent');
        
        settingsToggle?.addEventListener('click', () => {
            settingsContent.classList.toggle('active');
        });
        
        // Settings controls
        this.setupSettingSlider('birdSize', (value) => {
            this.birdSizeScale = value;
            document.getElementById('birdSizeValue').textContent = value.toFixed(1);
        });
        
        this.setupSettingSlider('pipeSize', (value) => {
            this.pipeSizeScale = value;
            document.getElementById('pipeSizeValue').textContent = value.toFixed(1);
        });
        
        this.setupSettingSlider('birdCollisionWidth', (value) => {
            this.birdCollisionWidthScale = value;
            document.getElementById('birdCollisionWidthValue').textContent = value.toFixed(1);
        });
        
        this.setupSettingSlider('birdCollisionHeight', (value) => {
            this.birdCollisionHeightScale = value;
            document.getElementById('birdCollisionHeightValue').textContent = value.toFixed(1);
        });
        
        this.setupSettingSlider('pipeCollisionWidth', (value) => {
            this.pipeCollisionWidthScale = value;
            document.getElementById('pipeCollisionWidthValue').textContent = value.toFixed(1);
        });
        
        this.setupSettingSlider('pipeCollisionHeight', (value) => {
            this.pipeCollisionHeightScale = value;
            document.getElementById('pipeCollisionHeightValue').textContent = value.toFixed(1);
        });
        
        this.setupSettingSlider('gameSpeed', (value) => {
            this.gameSpeedScale = value;
            this.updateGameSpeed();
            document.getElementById('gameSpeedValue').textContent = value.toFixed(1);
        });
        
        this.setupSettingSlider('pipeGap', (value) => {
            this.PIPE_GAP = value;
            document.getElementById('pipeGapValue').textContent = value.toString();
        });
        
        // Reset settings button
        const resetButton = document.getElementById('resetSettings');
        resetButton?.addEventListener('click', () => {
            this.resetSettings();
        });
        
        // Music toggle button
        const musicButton = document.getElementById('musicBtn');
        musicButton?.addEventListener('click', () => {
            this.toggleMusic();
        });
    }

    setupSettingSlider(id, callback) {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', (e) => {
                callback(parseFloat(e.target.value));
            });
        }
    }

    updateGameSpeed() {
        this.GRAVITY = this.BASE_GRAVITY * this.gameSpeedScale;
        this.JUMP_FORCE = this.BASE_JUMP_FORCE * this.gameSpeedScale;
        this.PIPE_SPEED = this.BASE_PIPE_SPEED * this.gameSpeedScale;
    }

    resetSettings() {
        // Reset all sliders to default values
        document.getElementById('birdSize').value = 1.0;
        document.getElementById('birdSizeValue').textContent = '1.0';
        this.birdSizeScale = 1.0;
        
        document.getElementById('pipeSize').value = 1.0;
        document.getElementById('pipeSizeValue').textContent = '1.0';
        this.pipeSizeScale = 1.0;
        
        document.getElementById('birdCollisionWidth').value = 0.5;
        document.getElementById('birdCollisionWidthValue').textContent = '0.5';
        this.birdCollisionWidthScale = 0.5;
        
        document.getElementById('birdCollisionHeight').value = 0.5;
        document.getElementById('birdCollisionHeightValue').textContent = '0.5';
        this.birdCollisionHeightScale = 0.5;
        
        document.getElementById('pipeCollisionWidth').value = 0.7;
        document.getElementById('pipeCollisionWidthValue').textContent = '0.7';
        this.pipeCollisionWidthScale = 0.7;
        
        document.getElementById('pipeCollisionHeight').value = 1.0;
        document.getElementById('pipeCollisionHeightValue').textContent = '1.0';
        this.pipeCollisionHeightScale = 1.0;
        
        document.getElementById('gameSpeed').value = 1.0;
        document.getElementById('gameSpeedValue').textContent = '1.0';
        this.gameSpeedScale = 1.0;
        
        document.getElementById('pipeGap').value = 250;
        document.getElementById('pipeGapValue').textContent = '250';
        this.PIPE_GAP = 250;
        
        this.updateGameSpeed();
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        const musicButton = document.getElementById('musicBtn');
        
        if (this.musicEnabled) {
            musicButton.textContent = '🎵 Music ON';
            this.startBackgroundMusic();
        } else {
            musicButton.textContent = '🎵 Music OFF';
            if (this.backgroundMusic) {
                this.backgroundMusic.pause();
            }
        }
        
        // Save music preference
        this.saveData();
    }

    startBackgroundMusic() {
        if (this.backgroundMusic && this.musicEnabled) {
            this.backgroundMusic.volume = 0.3; // Set volume to 30%
            this.backgroundMusic.play().catch(e => {
                console.log('Background music autoplay prevented:', e);
                // Try to play on first user interaction
                const playOnInteraction = () => {
                    if (this.musicEnabled) {
                        this.backgroundMusic.play().catch(e => console.log('Background music failed:', e));
                    }
                    document.removeEventListener('click', playOnInteraction);
                    document.removeEventListener('keydown', playOnInteraction);
                };
                document.addEventListener('click', playOnInteraction);
                document.addEventListener('keydown', playOnInteraction);
            });
        }
    }

    updatePipes() {
        // Move existing pipes
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.x -= this.PIPE_SPEED;

            // Remove pipes that are off screen
            if (pipe.x + pipe.width < 0) {
                this.pipes.splice(i, 1);
                continue;
            }

            // Check if bird passed pipe for scoring
            if (!pipe.scored && pipe.x + pipe.width < this.bird.x + this.bird.width / 2) {
                pipe.scored = true;
                this.score++;
                this.playSound('score');
                console.log('Score increased:', this.score);
                this.updateUI(); // Update UI immediately when score changes
            }
        }

        // Spawn new pipes
        const lastPipe = this.pipes[this.pipes.length - 1];
        if (!lastPipe || lastPipe.x < this.canvas.width - this.PIPE_SPAWN_DISTANCE) {
            this.spawnPipe();
        }
    }

    spawnPipe() {
        const gapY = this.canvas.height * 0.2 + Math.random() * (this.canvas.height * 0.4);
        const basePipeWidth = 180; // Base pipe width
        const pipeWidth = basePipeWidth * this.pipeSizeScale;

        this.pipes.push({
            x: this.canvas.width,
            topHeight: gapY - this.PIPE_GAP / 2,
            bottomY: gapY + this.PIPE_GAP / 2,
            bottomHeight: this.ground.y - (gapY + this.PIPE_GAP / 2),
            width: pipeWidth,
            scored: false
        });

        console.log('New pipe spawned at x:', this.canvas.width);
    }

    checkCollisions() {
        // Make collision box smaller using separate width/height scaling factors
        const collisionPadding = {
            x: this.bird.width * (1 - this.birdCollisionWidthScale) * 0.5,
            y: this.bird.height * (1 - this.birdCollisionHeightScale) * 0.5
        };
        
        const birdRect = {
            x: this.bird.x + collisionPadding.x,
            y: this.bird.y + collisionPadding.y,
            width: this.bird.width * this.birdCollisionWidthScale,
            height: this.bird.height * this.birdCollisionHeightScale
        };

        // Check collision with pipes
        for (const pipe of this.pipes) {
            // Apply pipe collision scaling
            const pipeCollisionPadding = {
                x: pipe.width * (1 - this.pipeCollisionWidthScale) * 0.5,
                y: 0 // Height scaling applied differently for top/bottom
            };
            
            // Top pipe collision
            const topPipeRect = {
                x: pipe.x + pipeCollisionPadding.x,
                y: 0,
                width: pipe.width * this.pipeCollisionWidthScale,
                height: pipe.topHeight * this.pipeCollisionHeightScale
            };

            // Bottom pipe collision
            const bottomPipeRect = {
                x: pipe.x + pipeCollisionPadding.x,
                y: pipe.bottomY + (pipe.bottomHeight * (1 - this.pipeCollisionHeightScale)),
                width: pipe.width * this.pipeCollisionWidthScale,
                height: pipe.bottomHeight * this.pipeCollisionHeightScale
            };

            if (this.rectsCollide(birdRect, topPipeRect)) {
                console.log('Top pipe collision!', 
                    'Bird:', birdRect, 
                    'TopPipe:', topPipeRect);
                this.gameOver();
                return;
            }
            
            if (this.rectsCollide(birdRect, bottomPipeRect)) {
                console.log('Bottom pipe collision!', 
                    'Bird:', birdRect, 
                    'BottomPipe:', bottomPipeRect);
                this.gameOver();
                return;
            }
        }
    }

    rectsCollide(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    render() {
        // Draw background
        if (this.images && this.images.background && this.images.background.complete) {
            // Scale background to fill canvas
            this.ctx.drawImage(this.images.background, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            // Fallback background gradient
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, '#87CEEB');
            gradient.addColorStop(0.7, '#87CEEB');
            gradient.addColorStop(0.7, '#90EE90');
            gradient.addColorStop(1, '#228B22');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        if (this.gameState === 'playing' || this.gameState === 'gameOver') {
            // Draw pipes
            this.drawPipes();

            // Draw bird
            this.drawBird();

            // Draw ground
            this.drawGround();
            
            // Draw collision boxes if debug mode is on
            if (this.showCollisionBoxes) {
                this.drawCollisionBoxes();
            }
        }
    }

    drawBird() {
        this.ctx.save();
        
        // Translate to bird center for rotation
        this.ctx.translate(this.bird.x + this.bird.width / 2, this.bird.y + this.bird.height / 2);
        this.ctx.rotate((this.bird.rotation * Math.PI) / 180);
        
        // Draw bird image if available with size scaling
        const scaledWidth = this.bird.width * this.birdSizeScale;
        const scaledHeight = this.bird.height * this.birdSizeScale;
        
        if (this.images && this.images.bird && this.images.bird.complete) {
            // Scale the crocodile image to fit bird dimensions
            this.ctx.drawImage(
                this.images.bird,
                -scaledWidth / 2,
                -scaledHeight / 2,
                scaledWidth,
                scaledHeight
            );
        } else {
            // Fallback drawing
            this.ctx.fillStyle = '#228B22';
            this.ctx.fillRect(-scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
            
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(-scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
        }
        
        this.ctx.restore();
    }

    drawPipes() {
        for (const pipe of this.pipes) {
            // Draw top pipe using image if available
            if (this.images && this.images.pipeTop && this.images.pipeTop.complete) {
                // Scale and draw top pipe image
                this.ctx.drawImage(
                    this.images.pipeTop,
                    pipe.x,
                    pipe.topHeight - this.images.pipeTop.height,
                    pipe.width,
                    this.images.pipeTop.height
                );
            } else {
                // Fallback top pipe drawing
                this.ctx.fillStyle = '#9932CC';
                this.ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = 3;
                this.ctx.strokeRect(pipe.x, 0, pipe.width, pipe.topHeight);
            }

            // Draw bottom pipe using image if available
            if (this.images && this.images.pipeBottom && this.images.pipeBottom.complete) {
                // Scale and draw bottom pipe image
                this.ctx.drawImage(
                    this.images.pipeBottom,
                    pipe.x,
                    pipe.bottomY,
                    pipe.width,
                    this.images.pipeBottom.height
                );
            } else {
                // Fallback bottom pipe drawing
                this.ctx.fillStyle = '#9932CC';
                this.ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, pipe.bottomHeight);
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = 3;
                this.ctx.strokeRect(pipe.x, pipe.bottomY, pipe.width, pipe.bottomHeight);
            }
        }
    }

    drawGround() {
        // Draw ground
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, this.ground.y, this.canvas.width, this.ground.height);
        
        // Draw ground outline
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.ground.y);
        this.ctx.lineTo(this.canvas.width, this.ground.y);
        this.ctx.stroke();
    }

    drawCollisionBoxes() {
        this.ctx.save();
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.7;

        // Draw bird collision box using separate width/height scales
        const collisionPadding = {
            x: this.bird.width * (1 - this.birdCollisionWidthScale) * 0.5,
            y: this.bird.height * (1 - this.birdCollisionHeightScale) * 0.5
        };
        
        this.ctx.strokeRect(
            this.bird.x + collisionPadding.x, 
            this.bird.y + collisionPadding.y, 
            this.bird.width * this.birdCollisionWidthScale, 
            this.bird.height * this.birdCollisionHeightScale
        );
        
        // Draw bird info
        this.ctx.fillStyle = '#FF0000';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`Bird: ${Math.round(this.bird.x)}, ${Math.round(this.bird.y)}`, this.bird.x, this.bird.y - 10);

        // Draw pipe collision boxes with scaling
        this.ctx.strokeStyle = '#00FF00';
        for (const pipe of this.pipes) {
            const pipeCollisionPadding = {
                x: pipe.width * (1 - this.pipeCollisionWidthScale) * 0.5,
                y: 0
            };
            
            // Top pipe collision box
            this.ctx.strokeRect(
                pipe.x + pipeCollisionPadding.x, 
                0, 
                pipe.width * this.pipeCollisionWidthScale, 
                pipe.topHeight * this.pipeCollisionHeightScale
            );
            
            // Bottom pipe collision box
            this.ctx.strokeRect(
                pipe.x + pipeCollisionPadding.x, 
                pipe.bottomY + (pipe.bottomHeight * (1 - this.pipeCollisionHeightScale)), 
                pipe.width * this.pipeCollisionWidthScale, 
                pipe.bottomHeight * this.pipeCollisionHeightScale
            );
            
            // Draw pipe info
            this.ctx.fillStyle = '#00FF00';
            this.ctx.fillText(`Pipe: ${Math.round(pipe.x)}`, pipe.x, pipe.topHeight + 20);
        }

        // Draw ground collision box
        this.ctx.strokeStyle = '#0000FF';
        this.ctx.strokeRect(0, this.ground.y, this.canvas.width, this.ground.height);

        this.ctx.restore();
    }

    gameLoop(currentTime = 0) {
        // Calculate delta time
        this.deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update game state
        this.update(this.deltaTime);

        // Render game
        this.render();

        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    updateUI() {
        // Update score display
        document.getElementById('currentScore').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('bestScore').textContent = this.highScore;

        // Show/hide screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        switch (this.gameState) {
            case 'menu':
                document.getElementById('menuScreen').classList.add('active');
                break;
            case 'playing':
                document.getElementById('gameHUD').classList.add('active');
                break;
            case 'gameOver':
                document.getElementById('gameOverScreen').classList.add('active');
                break;
        }

        // Update sound button
        const soundBtn = document.getElementById('soundBtn');
        if (this.soundEnabled) {
            soundBtn.textContent = '🔊 Sound ON';
            soundBtn.classList.remove('muted');
        } else {
            soundBtn.textContent = '🔇 Sound OFF';
            soundBtn.classList.add('muted');
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.updateUI();
        this.saveData();
        console.log('Sound toggled:', this.soundEnabled);
    }

    playSound(soundName) {
        if (this.soundEnabled && this.sounds[soundName]) {
            try {
                this.sounds[soundName].currentTime = 0;
                this.sounds[soundName].play().catch(e => {
                    console.log('Sound play failed:', e);
                });
            } catch (error) {
                console.log('Sound error:', error);
            }
        }
    }

    async saveData() {
        const gameData = {
            highScore: this.highScore,
            soundEnabled: this.soundEnabled,
            musicEnabled: this.musicEnabled
        };

        // Try to save via SDK first, fallback to localStorage
        if (window.yandexSDK) {
            await window.yandexSDK.saveData(gameData);
        } else {
            try {
                localStorage.setItem('flappyCrocoData', JSON.stringify(gameData));
                console.log('Data saved to localStorage');
            } catch (error) {
                console.log('Failed to save to localStorage:', error);
            }
        }
    }

    async loadSaveData() {
        let gameData = null;

        // Try to load via SDK first, fallback to localStorage
        if (window.yandexSDK) {
            gameData = await window.yandexSDK.loadData();
        } else {
            try {
                const data = localStorage.getItem('flappyCrocoData');
                if (data) {
                    gameData = JSON.parse(data);
                    console.log('Data loaded from localStorage');
                }
            } catch (error) {
                console.log('Failed to load from localStorage:', error);
            }
        }

        if (gameData) {
            this.highScore = gameData.highScore || 0;
            this.soundEnabled = gameData.soundEnabled !== undefined ? gameData.soundEnabled : true;
            this.musicEnabled = gameData.musicEnabled !== undefined ? gameData.musicEnabled : true;
            console.log('Game data loaded:', gameData);
            
            // Update music button text
            const musicButton = document.getElementById('musicBtn');
            if (musicButton) {
                musicButton.textContent = this.musicEnabled ? '🎵 Music ON' : '🎵 Music OFF';
            }
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Flappy Croco Game...');
    window.game = new FlappyCrocoGame();
});
