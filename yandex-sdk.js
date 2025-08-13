// Yandex Games SDK Integration
class YandexSDK {
    constructor() {
        this.isInitialized = false;
        this.ysdk = null;
        this.player = null;
        this.isPlayerInit = false;
        this.gameReady = false;
    }

    async init() {
        try {
            console.log('Initializing Yandex SDK...');
            
            // Wait for YaGames to be available
            await this.waitForYaGames();
            
            // Initialize SDK
            this.ysdk = await YaGames.init();
            this.isInitialized = true;
            console.log('Yandex SDK initialized successfully');

            // Initialize player
            await this.initPlayer();
            
            // Mark game as ready
            await this.markGameReady();
            
            return true;
        } catch (error) {
            console.log('Yandex SDK initialization failed:', error);
            // Game should still work without SDK
            return false;
        }
    }

    async waitForYaGames() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 100; // 10 seconds
            
            const checkYaGames = () => {
                if (typeof YaGames !== 'undefined') {
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('YaGames not loaded'));
                } else {
                    attempts++;
                    setTimeout(checkYaGames, 100);
                }
            };
            
            checkYaGames();
        });
    }

    async initPlayer() {
        try {
            if (this.ysdk) {
                this.player = await this.ysdk.getPlayer({ signed: false });
                this.isPlayerInit = true;
                console.log('Player initialized');
            }
        } catch (error) {
            console.log('Player initialization failed:', error);
        }
    }

    async markGameReady() {
        try {
            if (this.ysdk && this.ysdk.features && this.ysdk.features.LoadingAPI) {
                await this.ysdk.features.LoadingAPI.ready();
                this.gameReady = true;
                console.log('Game marked as ready');
            }
        } catch (error) {
            console.log('Failed to mark game as ready:', error);
        }
    }

    // Save game data
    async saveData(data) {
        try {
            if (this.ysdk && this.isPlayerInit) {
                await this.ysdk.setData(data);
                console.log('Data saved to Yandex Cloud');
                return true;
            }
        } catch (error) {
            console.log('Failed to save data to Yandex Cloud:', error);
        }
        
        // Fallback to localStorage
        try {
            localStorage.setItem('flappyCrocoData', JSON.stringify(data));
            console.log('Data saved to localStorage');
            return true;
        } catch (error) {
            console.log('Failed to save data to localStorage:', error);
            return false;
        }
    }

    // Load game data
    async loadData() {
        try {
            if (this.ysdk && this.isPlayerInit) {
                const data = await this.ysdk.getData();
                console.log('Data loaded from Yandex Cloud');
                return data;
            }
        } catch (error) {
            console.log('Failed to load data from Yandex Cloud:', error);
        }
        
        // Fallback to localStorage
        try {
            const data = localStorage.getItem('flappyCrocoData');
            if (data) {
                console.log('Data loaded from localStorage');
                return JSON.parse(data);
            }
        } catch (error) {
            console.log('Failed to load data from localStorage:', error);
        }
        
        return null;
    }

    // Show interstitial ad
    async showInterstitialAd() {
        return new Promise((resolve) => {
            try {
                if (this.ysdk && this.ysdk.adv) {
                    this.ysdk.adv.showFullscreenAdv({
                        callbacks: {
                            onClose: (wasShown) => {
                                console.log('Interstitial ad closed, was shown:', wasShown);
                                resolve(wasShown);
                            },
                            onError: (error) => {
                                console.log('Interstitial ad error:', error);
                                resolve(false);
                            }
                        }
                    });
                } else {
                    console.log('Interstitial ads not available');
                    resolve(false);
                }
            } catch (error) {
                console.log('Failed to show interstitial ad:', error);
                resolve(false);
            }
        });
    }

    // Show rewarded video ad
    async showRewardedAd() {
        return new Promise((resolve) => {
            try {
                if (this.ysdk && this.ysdk.adv) {
                    this.ysdk.adv.showRewardedVideo({
                        callbacks: {
                            onRewarded: () => {
                                console.log('Rewarded ad completed');
                                resolve(true);
                            },
                            onClose: () => {
                                console.log('Rewarded ad closed');
                                resolve(false);
                            },
                            onError: (error) => {
                                console.log('Rewarded ad error:', error);
                                resolve(false);
                            }
                        }
                    });
                } else {
                    console.log('Rewarded ads not available');
                    resolve(false);
                }
            } catch (error) {
                console.log('Failed to show rewarded ad:', error);
                resolve(false);
            }
        });
    }

    // Mark gameplay start
    startGameplay() {
        try {
            if (this.ysdk && this.ysdk.features && this.ysdk.features.GameplayAPI) {
                this.ysdk.features.GameplayAPI.start();
                console.log('Gameplay started');
            }
        } catch (error) {
            console.log('Failed to mark gameplay start:', error);
        }
    }

    // Mark gameplay stop
    stopGameplay() {
        try {
            if (this.ysdk && this.ysdk.features && this.ysdk.features.GameplayAPI) {
                this.ysdk.features.GameplayAPI.stop();
                console.log('Gameplay stopped');
            }
        } catch (error) {
            console.log('Failed to mark gameplay stop:', error);
        }
    }

    // Get player info
    getPlayerInfo() {
        if (this.player) {
            return {
                name: this.player.getName() || 'Guest',
                photo: this.player.getPhoto('small') || null
            };
        }
        return { name: 'Guest', photo: null };
    }
}

// Global SDK instance
let yandexSDK = null;

// Initialize SDK when script loads
function initSDK() {
    yandexSDK = new YandexSDK();
    yandexSDK.init().then((success) => {
        console.log('SDK initialization result:', success);
        // Dispatch custom event to notify game that SDK is ready
        window.dispatchEvent(new CustomEvent('sdkReady', { detail: { success } }));
    });
}

// If YaGames is already loaded, initialize immediately
if (typeof YaGames !== 'undefined') {
    initSDK();
}
