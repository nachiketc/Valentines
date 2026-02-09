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
        name: "Teddy Cuddle",
        description: "Click to give the teddy a hug!",
        type: "clicker",
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
function getCurrentDayNumber() {
    const urlDay = getDayFromURL();
    if (urlDay) {
        return urlDay;
    }
    
    const ctx = getValentinesWeekContext();
    if (ctx.currentDayInfo) {
        const dayIndex = VALENTINES_WEEK.findIndex(day => day.name === ctx.currentDayInfo.name);
        if (dayIndex !== -1) {
            return dayIndex + 7; // Days start at 7
        }
    }
    
    // Default to Rose Day
    return 7;
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
            } else {
                // Teddy Day (10) or Hug Day (12) - use generic clicker
                initClickerGame(game, dayNumber);
            }
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
        10: createPixelTeddy(), // Teddy Day
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

// Pixel art creation functions
function createPixelTeddy() {
    return `<div class="pixel-teddy-art"></div>`;
}

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
        ? ["chocolate", "candy", "lollipop", "cookie"]
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
            return `<div class="pixel-${item}-art"></div>`;
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
