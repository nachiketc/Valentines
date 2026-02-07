// Valentine's Week: 7 days before Feb 14 (Feb 7–13) + Valentine's Day (Feb 14)
const VALENTINES_WEEK = [
    { name: "Rose Day", date: 7, emoji: "🌹", tagline: "A rose for you" },
    { name: "Propose Day", date: 8, emoji: "💍", tagline: "Will you be mine?" },
    { name: "Chocolate Day", date: 9, emoji: "🍫", tagline: "Sweet like you" },
    { name: "Teddy Day", date: 10, emoji: "🧸", tagline: "Hugs & cuddles" },
    { name: "Promise Day", date: 11, emoji: "🤝", tagline: "Forever with you" },
    { name: "Hug Day", date: 12, emoji: "🤗", tagline: "Warm embrace" },
    { name: "Kiss Day", date: 13, emoji: "💋", tagline: "All my love" },
    { name: "Valentine's Day", date: 14, emoji: "❤️", tagline: "Happy Valentine's!" }
];

function getValentinesWeekContext() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();
    const currentYear = now.getFullYear();

    // Valentine's Day for this year (Feb 14)
    const valentinesDate = new Date(currentYear, 1, 14);
    const today = new Date(currentYear, currentMonth, currentDay);
    
    // Calculate days until Valentine's Day
    let daysUntil = Math.ceil((valentinesDate - now) / (1000 * 60 * 60 * 24));
    
    // Calculate which day of Valentine's Week we're in (or would be)
    let currentDayInfo = null;
    let isValentinesWeek = false;
    let nextDayInfo = null;
    let daysUntilNextDay = null;

    // If we're in February
    if (currentMonth === 1) {
        if (currentDay >= 7 && currentDay <= 14) {
            // We're in Valentine's Week
            isValentinesWeek = true;
            currentDayInfo = VALENTINES_WEEK[Math.min(currentDay - 7, 7)];
        } else if (currentDay < 7) {
            // Before Valentine's Week - show next day
            nextDayInfo = VALENTINES_WEEK[0]; // Rose Day
            daysUntilNextDay = 7 - currentDay;
        } else if (currentDay > 14) {
            // After Valentine's Day - show Valentine's Day info
            currentDayInfo = VALENTINES_WEEK[7]; // Valentine's Day
        }
    } else if (currentMonth < 1) {
        // Before February - show Rose Day (first day)
        nextDayInfo = VALENTINES_WEEK[0];
        const daysUntilFeb = Math.ceil((new Date(currentYear, 1, 7) - now) / (1000 * 60 * 60 * 24));
        daysUntilNextDay = daysUntilFeb;
    } else {
        // After February - show Valentine's Day for next year
        const nextYearValentines = new Date(currentYear + 1, 1, 14);
        daysUntil = Math.ceil((nextYearValentines - now) / (1000 * 60 * 60 * 24));
        currentDayInfo = VALENTINES_WEEK[7]; // Valentine's Day
    }

    return {
        isValentinesWeek,
        currentDayInfo,
        nextDayInfo,
        daysUntil: Math.max(0, daysUntil),
        daysUntilNextDay,
        isValentinesDay: currentMonth === 1 && currentDay === 14,
        valentinesDate
    };
}

function goToPage(page) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = page;
    }, 500);
}

function goBack() {
    window.history.back();
}

var yesBtn = document.getElementById("yesButton");
if (yesBtn) {
    yesBtn.addEventListener("click", function() {
        var messages = document.getElementById("messages");
        if (messages) messages.innerHTML = "Yay! Can't wait to spend Valentine's Day with you! ❤️";
        startConfetti();
    });
}

// Handle pixel art button clicks (for image buttons)
document.addEventListener("DOMContentLoaded", function() {
    var yesImgBtn = document.getElementById("yesButton");
    if (yesImgBtn && yesImgBtn.tagName === "IMG") {
        yesImgBtn.style.cursor = "pointer";
    }
});

// Confetti Effect
function startConfetti() {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#E91E63', '#F48FB1', '#F8BBD9', '#AD1457', '#FF80AB']
    });
}


function updateDaysCounter() {
    const startDate = new Date("July 9, 2024 23:38:00");
    const currentDate = new Date();

    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();
    let hours = currentDate.getHours() - startDate.getHours();
    let minutes = currentDate.getMinutes() - startDate.getMinutes();

    if (minutes < 0) {
        minutes += 60;
        hours -= 1;
    }
    if (hours < 0) {
        hours += 24;
        days -= 1;
    }
    if (days < 0) {
        let prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += prevMonth.getDate();
        months -= 1;
    }
    if (months < 0) {
        months += 12;
        years -= 1;
    }

    // Fix singular/plural
    const yearText = years === 1 ? "year" : "years";
    const monthText = months === 1 ? "month" : "months";
    const dayText = days === 1 ? "day" : "days";
    
    let timeText = `${months} ${monthText} ${days} ${dayText} `;
    if (years > 0) {
        timeText = `${years} ${yearText} ${months} ${monthText} ${days} ${dayText} `;
    }

    document.getElementById("daysCounter").innerHTML = `It's been<br><span class="counter-numbers">${timeText}</span><br>since we got together! `;
}



// Valentine's Week landing: set day badge only (runs on index.html)
document.addEventListener("DOMContentLoaded", function () {
    var badgeEl = document.getElementById("dayBadge");
    if (badgeEl) {
        var ctx = getValentinesWeekContext();
        if (ctx.isValentinesDay) {
            badgeEl.textContent = "Happy Valentine's Day!";
        } else if (ctx.currentDayInfo) {
            badgeEl.textContent = "Today is " + ctx.currentDayInfo.name + " " + ctx.currentDayInfo.emoji;
        } else {
            badgeEl.textContent = "Valentine's Week";
        }
    }
    // Day page: always show Rose Day for now
    var dayTitleEl = document.getElementById("dayTitle");
    if (dayTitleEl) {
        var emojiEl = document.getElementById("dayEmoji");
        // Always Rose Day
        emojiEl.textContent = "🌹";
        dayTitleEl.textContent = "Rose Day";
        document.title = "Rose Day";
    }
});

// No button: starts aligned with Yes; on first hover move to overlay and animate away
var NO_BUTTON_MESSAGES = [
    "Really? No?",
    "Try again!",
    "Say yes please!",
    "You don't mean that!",
    "Wrong answer — try Yes",
    "Pretty please?",
    "I'll make it worth it",
    "Not that one!",
    "Yes is over here",
    "Nope, pick Yes!",
    "One more chance?"
];
document.addEventListener("DOMContentLoaded", function () {
    var noButton = document.getElementById("noButton");
    if (!noButton) return;
    var msgIndex = 0;
    var padding = 80;
    var inOverlay = false;
    var overlay = null;

    function getRandomPosition() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var left = padding + Math.random() * (w - 2 * padding - 120);
        var top = padding + Math.random() * (h - 2 * padding - 50);
        return { left: left, top: top };
    }

    noButton.addEventListener("mouseenter", function () {
        // For image buttons, we don't change text, just move them
        msgIndex++;
        if (!inOverlay) {
            inOverlay = true;
            var rect = noButton.getBoundingClientRect();
            overlay = document.createElement("div");
            overlay.className = "no-button-wrapper";
            document.body.appendChild(overlay);
            overlay.appendChild(noButton);
            noButton.classList.add("moved");
            noButton.style.transition = "none";
            noButton.style.left = rect.left + "px";
            noButton.style.top = rect.top + "px";
            noButton.offsetHeight; // reflow
            noButton.style.transition = "";
            requestAnimationFrame(function () {
                var pos = getRandomPosition();
                noButton.style.left = pos.left + "px";
                noButton.style.top = pos.top + "px";
            });
        } else {
            var pos = getRandomPosition();
            noButton.style.left = pos.left + "px";
            noButton.style.top = pos.top + "px";
        }
    });
});

function toggleMusic() {
    const music = document.getElementById("backgroundMusic");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}


// Minigame (Catch the Hearts)
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("gameCanvas");
    if (canvas) {
        let ctx = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 400;

        let hearts = [];
        let player = { x: 180, y: 350, width: 40, height: 40 };
        let score = 0;

        function spawnHeart() {
            hearts.push({ x: Math.random() * 360, y: 0, width: 20, height: 20, speed: 2 });
        }

        function updateGame() {
            console.log('Updating game...'); // This will show in the console
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
        
            // Draw player
            ctx.fillStyle = "red";
            ctx.fillRect(player.x, player.y, player.width, player.height);
        
            // Move and draw hearts
            for (let i = 0; i < hearts.length; i++) {
                hearts[i].y += hearts[i].speed;
                ctx.fillStyle = "pink";
                ctx.beginPath();
                ctx.arc(hearts[i].x, hearts[i].y, hearts[i].width, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
        
                // Check for collision
                if (hearts[i].y + hearts[i].height >= player.y &&
                    hearts[i].x >= player.x &&
                    hearts[i].x <= player.x + player.width) {
                    score++;
                    hearts.splice(i, 1);
                    i--;
                }
            }
        
            // Display score
            ctx.fillStyle = "black";
            ctx.fillText("Score: " + score, 10, 20);
        
            requestAnimationFrame(updateGame);  // Keep looping
        }
        

        spawnHeart();
        setInterval(spawnHeart, 500);  // Faster spawning of hearts
        updateGame();

        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
            if (e.key === "ArrowRight" && player.x < canvas.width - player.width) player.x += 20;
        });
    }
});

// Envelope Interaction (Optional - inspired by valentine-ask)
// Uncomment and enable in HTML to use envelope interaction
document.addEventListener("DOMContentLoaded", function () {
    const envelope = document.getElementById("envelope-container");
    const card = document.querySelector(".card");
    
    if (envelope) {
        envelope.addEventListener("click", () => {
            envelope.style.display = "none";
            if (card) {
                card.style.display = "block";
                card.style.opacity = "0";
                card.style.transform = "scale(1.2)";
                setTimeout(() => {
                    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 50);
            }
        });
    }
});
