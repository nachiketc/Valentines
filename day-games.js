// Games for each day of Valentine's Week

const DAY_GAMES = {
    7: { // Rose Day
        name: "Rose Garden",
        description: "Click to grow roses! Collect as many as you can!",
        type: "clicker",
        emoji: "🌹"
    },
    8: { // Propose Day
        name: "Find the Ring",
        description: "Click the tiles to find the hidden ring!",
        type: "find-ring",
        emoji: "💍"
    },
    9: { // Chocolate Day
        name: "Chocolate Match",
        description: "Match the chocolate pairs!",
        type: "memory",
        emoji: "🍫"
    },
    10: { // Teddy Day
        name: "Give the Teddy Hugs",
        description: "Click the teddy to give it hugs!",
        type: "teddy-hugs",
        emoji: "🧸"
    },
    11: { // Promise Day
        name: "Promise Keeper",
        description: "Type your promise and see it appear!",
        type: "typing",
        emoji: "🤝"
    },
    12: { // Hug Day
        name: "Virtual Hug",
        description: "Click to send hugs!",
        type: "clicker",
        emoji: "🤗"
    },
    13: { // Kiss Day
        name: "Kiss Collector",
        description: "Catch the falling kisses!",
        type: "catch",
        emoji: "💋"
    },
    14: { // Valentine's Day
        name: "Love Letters",
        description: "Match the love letters!",
        type: "memory",
        emoji: "❤️"
    }
};

// Get day number from URL parameter or current date
function getDayFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const dayParam = urlParams.get('day');
    if (dayParam) {
        const dayNum = parseInt(dayParam);
        if (dayNum >= 7 && dayNum <= 14) {
            return dayNum;
        }
    }
    return null;
}

// Get current day number
// STATIC: Always return Teddy Day (10) for now
function getCurrentDayNumber() {
    // Always return Teddy Day
    return 10;
}

// Initialize game - dynamic based on current day or URL parameter
function initDayGame() {
    const dayNumber = getCurrentDayNumber();
    const game = DAY_GAMES[dayNumber] || DAY_GAMES[7];
    const gameContainer = document.getElementById("day-game");
    
    if (!gameContainer) return;
    
    // Clear any existing content
    gameContainer.innerHTML = "";
    
    gameContainer.innerHTML = `
        <div class="game-header">
            <h2 class="pixel-text">${game.name} ${game.emoji}</h2>
            <p class="pixel-text">${game.description}</p>
        </div>
        <div id="game-area" class="game-area"></div>
    `;
    
    // Initialize specific game based on day
    switch(game.type) {
        case "clicker":
            if (dayNumber === 7) {
                initRoseDayGame(game, dayNumber);
            } else if (dayNumber === 12) {
                // Hug Day - use generic clicker
                initClickerGame(game, dayNumber);
            } else {
                initClickerGame(game, dayNumber);
            }
            break;
        case "teddy-hugs":
            initTeddyHugsGame(game, dayNumber);
            break;
        case "find-ring":
            initFindRingGame(game, dayNumber);
            break;
        case "memory":
            // Chocolate Day (9) or Valentine's Day (14)
            initMemoryGame(game, dayNumber);
            break;
        case "typing":
            // Promise Day (11)
            initTypingGame(game, dayNumber);
            break;
        case "catch":
            // Kiss Day (13)
            initCatchGame(game, dayNumber);
            break;
        default:
            initRoseDayGame(game, dayNumber); // Default fallback
    }
}

// Rose Day - Special random popup game
function initRoseDayGame(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    let score = 0;
    let gameInterval;
    let timerInterval;
    let gameDuration = 30000; // 30 seconds
    let startTime = Date.now();
    let gameActive = true;
    
    function startGame() {
        score = 0;
        gameActive = true;
        startTime = Date.now();
        
        gameArea.innerHTML = `
            <div class="rose-garden-game">
                <div class="score-display pixel-text">Roses Collected: <span id="game-score">0</span></div>
                <div class="time-display pixel-text">Time: <span id="time-left">30</span>s</div>
                <div class="garden-area" id="garden-area"></div>
                <p class="pixel-text" style="margin-top: 20px;">Click the roses as they appear!</p>
                <button id="retry-btn" class="button" style="display: none; margin-top: 15px;">Retry</button>
            </div>
        `;
        
        const gardenArea = document.getElementById("garden-area");
        const scoreDisplay = document.getElementById("game-score");
        const timeDisplay = document.getElementById("time-left");
        const retryBtn = document.getElementById("retry-btn");
        
        function createRose() {
            if (!gameActive) return;
            
            const rose = document.createElement("div");
            rose.className = "pixel-rose";
            rose.textContent = "🌹";
            rose.style.fontSize = "40px";
            rose.style.cursor = "pointer";
            
            // Random position within garden area
            const maxX = gardenArea.offsetWidth - 60;
            const maxY = gardenArea.offsetHeight - 60;
            rose.style.left = Math.random() * maxX + "px";
            rose.style.top = Math.random() * maxY + "px";
            
            // Random delay before appearing
            rose.style.opacity = "0";
            rose.style.transform = "scale(0)";
            gardenArea.appendChild(rose);
            
            // Animate in
            setTimeout(() => {
                rose.style.transition = "all 0.3s";
                rose.style.opacity = "1";
                rose.style.transform = "scale(1)";
            }, Math.random() * 500);
            
            // Click handler
            rose.addEventListener("click", function() {
                if (rose.classList.contains("collected") || !gameActive) return;
                
                rose.classList.add("collected");
                score++;
                scoreDisplay.textContent = score;
                
                // Animate collection
                rose.style.transition = "all 0.5s";
                rose.style.transform = "scale(1.5)";
                rose.style.opacity = "0";
                
                setTimeout(() => rose.remove(), 500);
            });
            
            // Auto-remove after 3 seconds if not clicked
            setTimeout(() => {
                if (!rose.classList.contains("collected")) {
                    rose.style.transition = "all 0.5s";
                    rose.style.opacity = "0";
                    rose.style.transform = "scale(0)";
                    setTimeout(() => rose.remove(), 500);
                }
            }, 3000);
        }
        
        // Create roses periodically
        gameInterval = setInterval(createRose, 1500);
        
        // Create first rose immediately
        setTimeout(createRose, 500);
        
        // Timer
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, Math.ceil((gameDuration - elapsed) / 1000));
            timeDisplay.textContent = remaining;
            
            if (remaining === 0) {
                gameActive = false;
                clearInterval(gameInterval);
                clearInterval(timerInterval);
                retryBtn.style.display = "inline-block";
                setTimeout(() => {
                    alert(`Time's up! You collected ${score} roses! 🌹`);
                }, 500);
            }
        }, 100);
        
        // Retry button
        retryBtn.addEventListener("click", function() {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            startGame();
        });
    }
    
    startGame();
}

// Create pixel art rose using CSS
function createPixelRose() {
    return `
        <div class="pixel-rose-art">
            <div class="rose-petal petal-1"></div>
            <div class="rose-petal petal-2"></div>
            <div class="rose-petal petal-3"></div>
            <div class="rose-petal petal-4"></div>
            <div class="rose-center"></div>
            <div class="rose-stem"></div>
            <div class="rose-leaf leaf-1"></div>
            <div class="rose-leaf leaf-2"></div>
        </div>
    `;
}

// Teddy Day / Hug Day - Clicker Game
function initClickerGame(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    let score = 0;
    
    const pixelArts = {
        12: createPixelHug()    // Hug Day
    };
    
    const pixelArt = pixelArts[dayNumber] || createPixelHeart();
    
    gameArea.innerHTML = `
        <div class="clicker-game">
            <div class="score-display pixel-text">Score: <span id="game-score">0</span></div>
            <div class="click-target" id="click-target">${pixelArt}</div>
            <p class="pixel-text" style="margin-top: 20px;">Click to collect!</p>
        </div>
    `;
    
    const clickTarget = document.getElementById("click-target");
    const scoreDisplay = document.getElementById("game-score");
    
    clickTarget.addEventListener("click", function() {
        score++;
        scoreDisplay.textContent = score;
        
        // Animate click
        clickTarget.style.transform = "scale(1.2)";
        setTimeout(() => {
            clickTarget.style.transform = "scale(1)";
        }, 200);
    });
}

// Teddy Day - Give the Teddy Hugs Game
function initTeddyHugsGame(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    let hugs = 0;
    let gameActive = true;
    let gameDuration = 30000; // 30 seconds
    let startTime = Date.now();
    let timerInterval;
    
    gameArea.innerHTML = `
        <div class="teddy-hugs-game">
            <div class="score-display pixel-text">Hugs Given: <span id="hug-count">0</span></div>
            <div class="time-display pixel-text">Time: <span id="time-left">30</span>s</div>
            <div class="teddy-hug-container" id="teddy-hug-container">
                <img src="bear-Photoroom.png" alt="Bear" class="huggable-teddy" id="huggable-teddy">
            </div>
            <p class="pixel-text" id="game-message">Click the teddy to give it hugs! 💕</p>
            <button id="retry-btn" class="button" style="display: none; margin-top: 15px;">Play Again</button>
        </div>
    `;
    
    const teddy = document.getElementById("huggable-teddy");
    const hugCount = document.getElementById("hug-count");
    const timeLeft = document.getElementById("time-left");
    const message = document.getElementById("game-message");
    const retryBtn = document.getElementById("retry-btn");
    
    function startGame() {
        hugs = 0;
        gameActive = true;
        startTime = Date.now();
        hugCount.textContent = "0";
        retryBtn.style.display = "none";
        message.textContent = "Click the teddy to give it hugs! 💕";
        message.style.color = "";
        
        // Timer
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, Math.ceil((gameDuration - elapsed) / 1000));
            timeLeft.textContent = remaining;
            
            if (remaining === 0) {
                gameActive = false;
                clearInterval(timerInterval);
                retryBtn.style.display = "inline-block";
                setTimeout(() => {
                    alert(`Time's up! You gave the teddy ${hugs} hugs! 🧸`);
                }, 500);
            }
        }, 100);
    }
    
    function giveHug() {
        if (!gameActive) return;
        
        hugs++;
        hugCount.textContent = hugs;
        
        // Shake animation - reset first to ensure it triggers
        teddy.style.animation = "none";
        // Force reflow
        void teddy.offsetWidth;
        teddy.style.animation = "teddyShake 0.6s ease-out";
        setTimeout(() => {
            teddy.style.animation = "none";
        }, 600);
        
        // Special messages at milestones
        if (hugs === 10) {
            message.textContent = "10 hugs! The teddy is so happy! 🧸💕";
            message.style.color = "#880E4F";
        } else if (hugs === 25) {
            message.textContent = "25 hugs! The teddy loves you! 🧸❤️";
            message.style.color = "#AD1457";
        } else if (hugs === 50) {
            message.textContent = "50 hugs! The teddy is overjoyed! 🧸💖";
            message.style.color = "#FFD700";
            teddy.style.animation = "teddyBigShake 1s ease-out";
            setTimeout(() => {
                teddy.style.animation = "none";
            }, 1000);
        } else if (hugs === 100) {
            message.textContent = "100 hugs! The teddy gives you a giant hug back! 🧸💕💕💕";
            message.style.color = "#FFD700";
            teddy.style.animation = "teddyGiantShake 1.5s ease-out";
            setTimeout(() => {
                teddy.style.animation = "none";
            }, 1500);
        } else if (hugs % 5 === 0) {
            message.textContent = `${hugs} hugs! Keep going! 🧸`;
            message.style.color = "#880E4F";
        }
    }
    
    teddy.addEventListener("click", giveHug);
    
    // Retry button
    retryBtn.addEventListener("click", function() {
        clearInterval(timerInterval);
        startGame();
    });
    
    // Start the game
    startGame();
}

// Old catch game - keeping for reference
function initCatchTeddyGame_OLD(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    let score = 0;
    let gameInterval = null;
    let timerInterval = null;
    let gameDuration = 30000; // 30 seconds
    let gameActive = false;
    let mouseMoveHandler = null;
    
    gameArea.innerHTML = `
        <div class="catch-teddy-game">
            <div class="score-display pixel-text">Teddies Caught: <span id="teddy-score">0</span></div>
            <div class="time-display pixel-text">Time: <span id="time-left">30</span>s</div>
            <div class="catch-area" id="catch-area">
                <div class="basket" id="basket">🧺</div>
            </div>
            <p class="pixel-text">Move your mouse to catch the teddies! 🧸</p>
            <button id="retry-btn" class="button" style="display: none; margin-top: 15px;">Play Again</button>
        </div>
    `;
    
    const catchArea = document.getElementById("catch-area");
    const basket = document.getElementById("basket");
    const scoreDisplay = document.getElementById("teddy-score");
    const timeLeft = document.getElementById("time-left");
    const retryBtn = document.getElementById("retry-btn");
    
    function startGame() {
        // Clear previous intervals
        if (gameInterval) clearInterval(gameInterval);
        if (timerInterval) clearInterval(timerInterval);
        
        score = 0;
        gameActive = true;
        const startTime = Date.now();
        scoreDisplay.textContent = "0";
        retryBtn.style.display = "none";
        
        // Clear any existing teddies
        const existingTeddies = catchArea.querySelectorAll(".falling-teddy");
        existingTeddies.forEach(teddy => teddy.remove());
        
        // Remove old event listener if exists
        if (mouseMoveHandler) {
            catchArea.removeEventListener("mousemove", mouseMoveHandler);
        }
        
        // Move basket with mouse
        let basketX = catchArea.offsetWidth / 2;
        mouseMoveHandler = function(e) {
            const rect = catchArea.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            basketX = Math.max(30, Math.min(mouseX, rect.width - 30));
            basket.style.left = (basketX - 30) + "px";
            basket.style.transform = "none";
        };
        catchArea.addEventListener("mousemove", mouseMoveHandler);
        
        // Initialize basket position
        basket.style.left = (catchArea.offsetWidth / 2 - 30) + "px";
        basket.style.transform = "none";
        
        // Create falling teddies
        function createTeddy() {
            if (!gameActive) return;
            
            const teddy = document.createElement("div");
            teddy.className = "falling-teddy";
            teddy.textContent = "🧸";
            const maxLeft = Math.max(0, catchArea.offsetWidth - 60);
            teddy.style.left = Math.random() * maxLeft + "px";
            teddy.style.top = "0px";
            catchArea.appendChild(teddy);
            
            let position = 0;
            const fall = setInterval(() => {
                if (!gameActive) {
                    clearInterval(fall);
                    if (teddy.parentNode) teddy.remove();
                    return;
                }
                
                position += 3;
                teddy.style.top = position + "px";
                
                if (position > catchArea.offsetHeight) {
                    // Missed - remove teddy
                    if (teddy.parentNode) teddy.remove();
                    clearInterval(fall);
                    return;
                }
                
                // Check collision
                const teddyRect = teddy.getBoundingClientRect();
                const basketRect = basket.getBoundingClientRect();
                
                // Simple collision check
                if (teddyRect.bottom >= basketRect.top - 10 && 
                    teddyRect.top <= basketRect.bottom &&
                    teddyRect.left < basketRect.right &&
                    teddyRect.right > basketRect.left) {
                    // Caught!
                    score++;
                    scoreDisplay.textContent = score;
                    if (teddy.parentNode) teddy.remove();
                    clearInterval(fall);
                    
                    // Celebration animation
                    basket.style.animation = "basketCatch 0.3s ease-out";
                    setTimeout(() => {
                        basket.style.animation = "none";
                    }, 300);
                }
            }, 20);
        }
        
        // Create teddies periodically
        gameInterval = setInterval(createTeddy, 800);
        
        // Create first teddy immediately
        setTimeout(createTeddy, 500);
        
        // Timer
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, Math.ceil((gameDuration - elapsed) / 1000));
            timeLeft.textContent = remaining;
            
            if (remaining === 0) {
                gameActive = false;
                clearInterval(gameInterval);
                clearInterval(timerInterval);
                gameInterval = null;
                timerInterval = null;
                retryBtn.style.display = "inline-block";
                setTimeout(() => {
                    alert(`Time's up! You caught ${score} teddies! 🧸`);
                }, 500);
            }
        }, 100);
    }
    
    // Retry button
    retryBtn.addEventListener("click", function() {
        startGame();
    });
    
    // Start the game
    startGame();
}


// Teddy Day - Collect Teddies Game
function initCollectTeddyGame(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    let score = 0;
    let gameInterval;
    let timerInterval;
    let gameDuration = 30000; // 30 seconds
    let startTime = Date.now();
    let gameActive = true;
    
    gameArea.innerHTML = `
        <div class="collect-teddy-game">
            <div class="score-display pixel-text">Teddies Collected: <span id="teddy-score">0</span></div>
            <div class="time-display pixel-text">Time: <span id="time-left">30</span>s</div>
            <div class="teddy-play-area" id="teddy-play-area"></div>
            <p class="pixel-text" style="margin-top: 20px;">Click the teddies as they appear! 🧸</p>
            <button id="retry-btn" class="button" style="display: none; margin-top: 15px;">Play Again</button>
        </div>
    `;
    
    const playArea = document.getElementById("teddy-play-area");
    const scoreDisplay = document.getElementById("teddy-score");
    const timeLeft = document.getElementById("time-left");
    const retryBtn = document.getElementById("retry-btn");
    
    function startGame() {
        score = 0;
        gameActive = true;
        startTime = Date.now();
        scoreDisplay.textContent = "0";
        retryBtn.style.display = "none";
        
        // Clear any existing teddies
        playArea.innerHTML = "";
        
        function createTeddy() {
            if (!gameActive) return;
            
            const teddy = document.createElement("div");
            teddy.className = "collectible-teddy";
            teddy.textContent = "🧸";
            teddy.style.left = Math.random() * (playArea.offsetWidth - 80) + "px";
            teddy.style.top = Math.random() * (playArea.offsetHeight - 80) + "px";
            
            teddy.addEventListener("click", function() {
                if (!gameActive) return;
                
                score++;
                scoreDisplay.textContent = score;
                
                // Animate collection
                teddy.style.animation = "teddyCollected 0.5s ease-out";
                teddy.style.transform = "scale(1.5)";
                teddy.style.opacity = "0";
                
                setTimeout(() => {
                    if (teddy.parentNode) teddy.remove();
                }, 500);
            });
            
            playArea.appendChild(teddy);
            
            // Auto-remove after 3 seconds if not clicked
            setTimeout(() => {
                if (teddy.parentNode && !teddy.classList.contains("collected")) {
                    teddy.style.transition = "all 0.5s";
                    teddy.style.opacity = "0";
                    teddy.style.transform = "scale(0.5)";
                    setTimeout(() => {
                        if (teddy.parentNode) teddy.remove();
                    }, 500);
                }
            }, 3000);
        }
        
        // Create teddies periodically
        gameInterval = setInterval(createTeddy, 1200);
        
        // Create first teddy immediately
        setTimeout(createTeddy, 500);
        
        // Timer
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, Math.ceil((gameDuration - elapsed) / 1000));
            timeLeft.textContent = remaining;
            
            if (remaining === 0) {
                gameActive = false;
                clearInterval(gameInterval);
                clearInterval(timerInterval);
                retryBtn.style.display = "inline-block";
                setTimeout(() => {
                    alert(`Time's up! You collected ${score} teddies! 🧸`);
                }, 500);
            }
        }, 100);
    }
    
    // Retry button
    retryBtn.addEventListener("click", function() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        startGame();
    });
    
    startGame();
}

// Old growing teddy function - keeping for reference
function initGrowingTeddyGame_OLD(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    let hugs = 0;
    let currentSize = 1;
    const sizeIncrement = 0.1;
    const maxSize = 3;
    
    gameArea.innerHTML = `
        <div class="growing-teddy-game">
            <div class="score-display pixel-text">Hugs Given: <span id="hug-count">0</span></div>
            <div class="size-display pixel-text">Size: <span id="size-display">100%</span></div>
            <div class="teddy-container" id="teddy-container">
                <div class="growing-teddy" id="growing-teddy">🧸</div>
                <div class="hug-hearts" id="hug-hearts"></div>
            </div>
            <p class="pixel-text" id="game-message">Click the teddy to give it a hug! 💕</p>
            <button id="reset-btn" class="button" style="margin-top: 15px;">Reset</button>
        </div>
    `;
    
    const teddy = document.getElementById("growing-teddy");
    const hugCount = document.getElementById("hug-count");
    const sizeDisplay = document.getElementById("size-display");
    const message = document.getElementById("game-message");
    const hugHearts = document.getElementById("hug-hearts");
    const resetBtn = document.getElementById("reset-btn");
    
    function giveHug() {
        hugs++;
        hugCount.textContent = hugs;
        
        // Grow the teddy
        if (currentSize < maxSize) {
            currentSize += sizeIncrement;
            const sizePercent = Math.round(currentSize * 100);
            teddy.style.transform = `scale(${currentSize})`;
            teddy.style.setProperty('--current-scale', currentSize);
            sizeDisplay.textContent = sizePercent + "%";
        }
        
        // Animate teddy
        teddy.style.animation = "teddyHugAnimation 0.6s ease-out";
        setTimeout(() => {
            teddy.style.animation = "none";
        }, 600);
        
        // Create floating hearts
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement("div");
            heart.className = "floating-heart";
            heart.textContent = i === 0 ? "💕" : (i === 1 ? "❤️" : "💖");
            heart.style.left = (50 + (Math.random() - 0.5) * 40) + "%";
            heart.style.animationDelay = (i * 0.1) + "s";
            hugHearts.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) heart.remove();
            }, 2000);
        }
        
        // Special messages at milestones
        if (hugs === 10) {
            message.textContent = "10 hugs! The teddy is getting bigger! 🧸💕";
            message.style.color = "#880E4F";
        } else if (hugs === 25) {
            message.textContent = "25 hugs! The teddy loves you! 🧸❤️";
            message.style.color = "#AD1457";
        } else if (hugs === 50) {
            message.textContent = "50 hugs! The teddy is huge now! 🧸💖";
            message.style.color = "#FFD700";
            // Special big hug animation
            teddy.style.animation = "bigHug 1s ease-out";
            setTimeout(() => {
                teddy.style.animation = "none";
            }, 1000);
        } else if (hugs === 100) {
            message.textContent = "100 hugs! The teddy gives you a giant hug back! 🧸💕💕💕";
            message.style.color = "#FFD700";
            teddy.style.animation = "giantHug 1.5s ease-out";
            setTimeout(() => {
                teddy.style.animation = "none";
            }, 1500);
        } else if (hugs % 5 === 0) {
            message.textContent = `${hugs} hugs! Keep going! 🧸`;
            message.style.color = "#880E4F";
        }
    }
    
    teddy.addEventListener("click", giveHug);
    
    // Reset button
    resetBtn.addEventListener("click", function() {
        hugs = 0;
        currentSize = 1;
        hugCount.textContent = "0";
        sizeDisplay.textContent = "100%";
        teddy.style.transform = "scale(1)";
        teddy.style.setProperty('--current-scale', 1);
        message.textContent = "Click the teddy to give it a hug! 💕";
        message.style.color = "";
        hugHearts.innerHTML = "";
    });
}

// Teddy Day - Teddy Stack Game
function initTeddyStackGame(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    let stackHeight = 0;
    let gameActive = true;
    let fallInterval;
    
    gameArea.innerHTML = `
        <div class="teddy-stack-game">
            <div class="score-display pixel-text">Stack Height: <span id="stack-height">0</span> teddies</div>
            <div class="stack-area" id="stack-area">
                <div class="base-platform"></div>
            </div>
            <p class="pixel-text" style="margin-top: 20px;">Click anywhere to drop a teddy! 🧸</p>
            <button id="reset-btn" class="button" style="margin-top: 15px;">Reset Stack</button>
        </div>
    `;
    
    const stackArea = document.getElementById("stack-area");
    const stackHeightDisplay = document.getElementById("stack-height");
    const resetBtn = document.getElementById("reset-btn");
    
    let currentTeddy = null;
    let isFalling = false;
    let stackTeddies = [];
    
    function createFallingTeddy() {
        if (isFalling || !gameActive) return;
        
        isFalling = true;
        currentTeddy = document.createElement("div");
        currentTeddy.className = "falling-stack-teddy";
        currentTeddy.textContent = "🧸";
        currentTeddy.style.left = Math.random() * (stackArea.offsetWidth - 80) + "px";
        currentTeddy.style.top = "0px";
        stackArea.appendChild(currentTeddy);
        
        let position = 0;
        const baseHeight = stackArea.offsetHeight - 40;
        const fallSpeed = 2;
        
        fallInterval = setInterval(() => {
            if (!gameActive || !currentTeddy) {
                clearInterval(fallInterval);
                return;
            }
            
            position += fallSpeed;
            const targetY = baseHeight - (stackTeddies.length * 60);
            
            if (position >= targetY) {
                // Landed on stack
                currentTeddy.style.top = targetY + "px";
                currentTeddy.classList.add("stacked-teddy");
                stackTeddies.push(currentTeddy);
                stackHeight++;
                stackHeightDisplay.textContent = stackHeight;
                currentTeddy = null;
                isFalling = false;
                clearInterval(fallInterval);
            } else {
                currentTeddy.style.top = position + "px";
            }
        }, 16);
    }
    
    // Click to drop teddy
    stackArea.addEventListener("click", function(e) {
        if (isFalling || !gameActive) return;
        createFallingTeddy();
    });
    
    // Reset button
    resetBtn.addEventListener("click", function() {
        gameActive = false;
        if (fallInterval) clearInterval(fallInterval);
        if (currentTeddy && currentTeddy.parentNode) {
            currentTeddy.remove();
        }
        stackTeddies.forEach(teddy => {
            if (teddy.parentNode) teddy.remove();
        });
        stackTeddies = [];
        stackHeight = 0;
        stackHeightDisplay.textContent = "0";
        isFalling = false;
        currentTeddy = null;
        gameActive = true;
    });
}

// Pixel art creation functions
function createPixelHug() {
    return `<div class="pixel-hug-art"></div>`;
}

function createPixelHeart() {
    return `<div class="pixel-heart-art"></div>`;
}

// Propose Day - Find the Ring Game
function initFindRingGame(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    let attempts = 0;
    let found = false;
    const gridSize = 3; // 3x3 grid = 9 tiles
    let ringPosition = Math.floor(Math.random() * (gridSize * gridSize));
    
    // Decoy items (things that aren't the ring)
    const decoyItems = ["💌", "🌹", "🕯️", "🎈", "💝", "🎁", "✨", "⭐"];
    
    gameArea.innerHTML = `
        <div class="find-ring-game">
            <div class="score-display pixel-text">Attempts: <span id="attempts">0</span></div>
            <div class="ring-grid" id="ring-grid"></div>
            <p id="game-message" class="pixel-text">Click the tiles to find the hidden ring! 💍</p>
            <button id="retry-btn" class="button" style="display: none; margin-top: 15px;">Play Again</button>
        </div>
    `;
    
    const grid = document.getElementById("ring-grid");
    const attemptsDisplay = document.getElementById("attempts");
    const message = document.getElementById("game-message");
    const retryBtn = document.getElementById("retry-btn");
    
    function resetGame() {
        found = false;
        attempts = 0;
        attemptsDisplay.textContent = "0";
        message.textContent = "Click the tiles to find the hidden ring! 💍";
        message.style.color = "";
        retryBtn.style.display = "none";
        ringPosition = Math.floor(Math.random() * (gridSize * gridSize));
        
        // Clear and recreate grid
        grid.innerHTML = "";
        for (let i = 0; i < gridSize * gridSize; i++) {
            const tile = createTile(i);
            grid.appendChild(tile);
        }
    }
    
    function createTile(index) {
        const tile = document.createElement("div");
        tile.className = "ring-tile";
        tile.dataset.index = index;
        tile.innerHTML = '<div class="tile-back">?</div>';
        
        tile.addEventListener("click", function() {
            if (found || tile.classList.contains("flipped")) return;
            
            attempts++;
            attemptsDisplay.textContent = attempts;
            tile.classList.add("flipped");
            
            if (index === ringPosition) {
                // Found the ring!
                found = true;
                tile.innerHTML = '<div class="ring-found">💍</div>';
                tile.classList.add("ring-tile-found");
                message.innerHTML = '<span style="color: #FFD700; font-size: 1.2em;">✨ You found the ring! 💍✨</span>';
                message.style.color = "#FFD700";
                
                // Show retry button
                retryBtn.style.display = "inline-block";
                
                // Celebrate animation
                tile.style.animation = "ringCelebration 0.8s ease-out";
            } else {
                // Show decoy item
                const decoy = decoyItems[index % decoyItems.length];
                tile.innerHTML = `<div class="tile-content">${decoy}</div>`;
                tile.classList.add("wrong-tile");
                message.textContent = "Not here! Keep looking... 💍";
            }
        });
        
        return tile;
    }
    
    // Create grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        grid.appendChild(createTile(i));
    }
    
    // Retry button - restart the game
    retryBtn.addEventListener("click", resetGame);
}

// Chocolate Day / Valentine's Day - Memory Game
function initMemoryGame(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    const items = dayNumber === 9 
        ? ["🍫", "🍬", "🍭", "🍪"]  // Chocolate emojis
        : ["heart", "heart2", "heart3", "heart4"];
    const cards = [...items, ...items].sort(() => Math.random() - 0.5);
    let flipped = [];
    let matched = 0;
    
    gameArea.innerHTML = `
        <div class="memory-game">
            <div class="score-display pixel-text">Matches: <span id="matches">0</span>/4</div>
            <div class="memory-grid" id="memory-grid"></div>
        </div>
    `;
    
    const grid = document.getElementById("memory-grid");
    const matchesDisplay = document.getElementById("matches");
    
    function getPixelArt(item) {
        if (dayNumber === 9) {
            // Use emojis for Chocolate Day
            return `<div class="chocolate-emoji">${item}</div>`;
        } else {
            return `<div class="pixel-heart-art pixel-heart-${item}"></div>`;
        }
    }
    
    cards.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.dataset.item = item;
        card.dataset.index = index;
        card.innerHTML = '<div class="card-back">?</div>';
        
        card.addEventListener("click", function() {
            if (flipped.length === 2 || card.classList.contains("flipped")) return;
            
            card.innerHTML = getPixelArt(item);
            card.classList.add("flipped");
            flipped.push({card, item, index});
            
            if (flipped.length === 2) {
                setTimeout(() => {
                    if (flipped[0].item === flipped[1].item && flipped[0].index !== flipped[1].index) {
                        flipped[0].card.classList.add("matched");
                        flipped[1].card.classList.add("matched");
                        matched++;
                        matchesDisplay.textContent = matched;
                        
                        if (matched === 4) {
                            setTimeout(() => {
                                alert("Perfect match! You won! 🎉");
                            }, 500);
                        }
                    } else {
                        flipped[0].card.innerHTML = '<div class="card-back">?</div>';
                        flipped[1].card.innerHTML = '<div class="card-back">?</div>';
                        flipped[0].card.classList.remove("flipped");
                        flipped[1].card.classList.remove("flipped");
                    }
                    flipped = [];
                }, 1000);
            }
        });
        
        grid.appendChild(card);
    });
}

// Promise Day - Typing Game
function initTypingGame(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    const promises = [
        "I promise to love you forever",
        "I promise to always be there",
        "I promise to make you smile",
        "I promise to cherish you always"
    ];
    
    gameArea.innerHTML = `
        <div class="typing-game">
            <div class="promise-display pixel-text" id="promise-display"></div>
            <input type="text" id="promise-input" class="promise-input pixel-text" placeholder="Type your promise here...">
            <button id="submit-promise" class="button">Submit Promise</button>
            <div id="promises-list" class="promises-list"></div>
        </div>
    `;
    
    const input = document.getElementById("promise-input");
    const submitBtn = document.getElementById("submit-promise");
    const promisesList = document.getElementById("promises-list");
    const display = document.getElementById("promise-display");
    
    display.textContent = promises[Math.floor(Math.random() * promises.length)];
    
    submitBtn.addEventListener("click", function() {
        const promise = input.value.trim();
        if (promise) {
            const promiseEl = document.createElement("div");
            promiseEl.className = "promise-item pixel-text";
            promiseEl.textContent = "🤝 " + promise;
            promisesList.appendChild(promiseEl);
            input.value = "";
            
            // Animate
            promiseEl.style.opacity = "0";
            promiseEl.style.transform = "translateY(-20px)";
            setTimeout(() => {
                promiseEl.style.transition = "all 0.5s";
                promiseEl.style.opacity = "1";
                promiseEl.style.transform = "translateY(0)";
            }, 10);
        }
    });
    
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            submitBtn.click();
        }
    });
}

// Kiss Day - Catch Game
function initCatchGame(game, dayNumber) {
    const gameArea = document.getElementById("game-area");
    let score = 0;
    let gameInterval;
    
    gameArea.innerHTML = `
        <div class="catch-game">
            <div class="score-display pixel-text">Kisses Caught: <span id="kiss-score">0</span></div>
            <div class="catch-area" id="catch-area">
                <div class="catcher" id="catcher"><div class="pixel-kiss-art"></div></div>
            </div>
            <p class="pixel-text">Move mouse to catch kisses!</p>
        </div>
    `;
    
    const catchArea = document.getElementById("catch-area");
    const catcher = document.getElementById("catcher");
    const scoreDisplay = document.getElementById("kiss-score");
    
    catchArea.addEventListener("mousemove", function(e) {
        const rect = catchArea.getBoundingClientRect();
        catcher.style.left = (e.clientX - rect.left - 30) + "px";
    });
    
    function createKiss() {
        const kiss = document.createElement("div");
        kiss.className = "falling-kiss";
        kiss.innerHTML = '<div class="pixel-kiss-art"></div>';
        kiss.style.left = Math.random() * 90 + "%";
        catchArea.appendChild(kiss);
        
        let position = 0;
        const fall = setInterval(() => {
            position += 2;
            kiss.style.top = position + "px";
            
            const kissRect = kiss.getBoundingClientRect();
            const catcherRect = catcher.getBoundingClientRect();
            
            if (kissRect.bottom >= catcherRect.top && 
                kissRect.left >= catcherRect.left && 
                kissRect.right <= catcherRect.right) {
                score++;
                scoreDisplay.textContent = score;
                kiss.remove();
                clearInterval(fall);
            } else if (position > catchArea.offsetHeight) {
                kiss.remove();
                clearInterval(fall);
            }
        }, 20);
    }
    
    gameInterval = setInterval(createKiss, 1000);
    
    // Stop after 30 seconds
    setTimeout(() => {
        clearInterval(gameInterval);
        alert(`Game Over! You caught ${score} kisses!`);
    }, 30000);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("day-game")) {
        initDayGame();
    }
});
