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

// Text messages for each day
const DAY_TEXTS = {
    7: { // Rose Day
        title: "To my amazing baiko",
        messages: [
            "I love you, mera shonu monu. I appreciate you deeply, and I am truly proud of how far you have come and the effort you have put into working on yourself. You think deeply and you feel deeply too, and that is something I respect so much about you.",
            "When I think about you, I don't think of big words or big gestures. I just feel like loving you, caring for you, and being there for you in the ways that matter every day. I know I have a partner who understands the world really well, and that is something no one can ever take away from you.",
            "You are so beautiful and strong like a rose. I love all parts of you the beautiful and the thorny. I will keep loving you and taking care of you."
        ],
        gifs: ["dudu-giving-flowers-bubu-flowers.gif"]
    },
    8: { // Propose Day
        title: "To my amazing baiko",
        messages: [
            "When I think about proposing, I don't think of one big moment. I think about choosing you, again and again, in small and real ways.",
            "I choose you for who you are today. I choose you for your heart, your depth, and the way you understand the world and obviously for how beautiful you are inside and outside. I feel lucky to have a partner like you who has all these qualities and is so beautiful and so kind, and I don't take that lightly.",
            "For me choosing you means loving you, caring for you, and standing by you even when things are not easy. It means learning how to be better for you and growing together, slowly and honestly.",
            "I choose you and will always choose you. And I'm happy doing that."
        ],
        gifs: ["bubududu-propose.gif"]
    },
    9: { // Chocolate Day
        title: "To my amazing baiko",
        messages: [
            "I love you mera shonu monu. I love having you in my life. You make me feel better and I can't go have a normal day without checking up on you. Chocolate feels like a sweet indulgence but dark chocolate can be very healthy for you. Talking to you makes me feel warm and comfortable, even with the bitterness that comes out sometimes. I like dark chocolate if you have noticed.",
            "People get addicted to chocolate, I feel I am addicted to talking to you. I love talking to you, listening to you, even sharing silence with you feels relaxing, like the times when we are doing our own work and we stay silent on the call together.",
            "You are not just there for happy moments. You make normal days better too, without trying too hard. That's what you are to me."
        ],
        gifs: ["dudu-eating-chocolate-eating.gif"]
    },
    10: { // Teddy Day
        title: "To my amazing baiko",
        messages: [
            "I love you, mera shonu monu. Teddy Day makes me think about comfort and safety, and about being there for someone in a soft and steady way.",
            "I know I don't always express myself well, and sometimes my fear comes out the wrong way. I'm learning that what matters more is showing up gently, without defensiveness.",
            "I want to be your teddy in that sense I want to be someone you can lean on, talk to, or sit quietly with, without feeling judged or pressured.",
            "Your presence already brings me that comfort. I want to offer the same to you, in my own way."
      ],
        gifs: ["bubududu-teddy.gif"]
    },
    11: { // Promise Day
        title: "To my amazing baiko",
        messages: [
            "I promise to love you through everything. I promise to be there for you, to support you, and to grow with you.",
            "I promise to cherish every moment we have together."
        ],
        gifs: ["bubu-dudu-promise.gif"]
    },
    12: { // Hug Day
        title: "To my amazing baiko",
        messages: [
            "Your hugs are my favorite thing in the world. They make everything better, they make me feel safe, they make me feel loved.",
            "I wish I could hug you right now and never let go."
        ],
        gifs: ["bubududu-hug.gif"]
    },
    13: { // Kiss Day
        title: "To my amazing baiko",
        messages: [
            "Every kiss from you is a reminder of how much I love you. Every moment with you is precious.",
            "I can't wait to give you all my kisses and all my love."
        ],
        gifs: ["bubududu-kiss.gif"]
    },
    14: { // Valentine's Day
        title: "To my amazing baiko",
        messages: [
            "Happy Valentine's Day, my love! Today and every day, I celebrate you, I celebrate us, and I celebrate the beautiful love we share.",
            "You are my everything, my forever, my always. I love you more than words can express."
        ],
        gifs: ["dudu-giving-flowers-bubu-flowers.gif"]
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

// Get current day info (with URL parameter support)
// STATIC: Always return Teddy Day for now
function getCurrentDayInfo() {
    // Always return Teddy Day
    return VALENTINES_WEEK.find(day => day.date === 10) || VALENTINES_WEEK[3];
}

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
    // Counter page: update Next button to include current day
    var counterNextButton = document.getElementById("counterNextButton");
    if (counterNextButton) {
        var dayInfo = getCurrentDayInfo();
        counterNextButton.href = "text.html?day=" + dayInfo.date;
    }
    
    // Day page: show current day dynamically
    var dayTitleEl = document.getElementById("dayTitle");
    if (dayTitleEl) {
        var emojiEl = document.getElementById("dayEmoji");
        var dayInfo = getCurrentDayInfo();
        var backButton = document.getElementById("backButton");
        
        emojiEl.textContent = dayInfo.emoji;
        dayTitleEl.textContent = dayInfo.name;
        document.title = dayInfo.name;
        
        // Update back button to include day parameter if viewing specific day
        var urlDay = getDayFromURL();
        if (backButton) {
            if (urlDay) {
                backButton.href = "text.html?day=" + urlDay;
            } else {
                // If no day parameter, use current day
                backButton.href = "text.html?day=" + dayInfo.date;
            }
        }
    }
    
    // Show day navigation after Feb 14
    var ctx = getValentinesWeekContext();
    var now = new Date();
    var afterValentines = now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14);
    
    if (afterValentines) {
        var dayNav = document.getElementById("day-navigation");
        if (dayNav) {
            dayNav.style.display = "block";
        }
    }
    
    // Text page: show current day text dynamically
    var textTitle = document.getElementById("textTitle");
    var textMessage1 = document.getElementById("textMessage1");
    var textMessage2 = document.getElementById("textMessage2");
    var textMessage3 = document.getElementById("textMessage3");
    var textGifs = document.getElementById("textGifs");
    
    if (textTitle) {
        var dayInfo = getCurrentDayInfo();
        var dayText = DAY_TEXTS[dayInfo.date] || DAY_TEXTS[7];
        
        // Update title
        textTitle.textContent = dayText.title;
        
        // Update messages
        if (textMessage1 && dayText.messages[0]) {
            textMessage1.textContent = dayText.messages[0];
            textMessage1.style.display = "block";
        }
        if (textMessage2 && dayText.messages[1]) {
            textMessage2.textContent = dayText.messages[1];
            textMessage2.style.display = "block";
        } else if (textMessage2) {
            textMessage2.style.display = "none";
        }
        if (textMessage3 && dayText.messages[2]) {
            textMessage3.textContent = dayText.messages[2];
            textMessage3.style.display = "block";
        } else if (textMessage3) {
            textMessage3.style.display = "none";
        }
        
        // Update GIFs
        if (textGifs && dayText.gifs) {
            textGifs.innerHTML = "";
            dayText.gifs.forEach(gif => {
                var img = document.createElement("img");
                img.src = gif;
                img.alt = dayInfo.name;
                img.className = "pixel-image";
                textGifs.appendChild(img);
            });
        }
        
        document.title = dayInfo.name + " - " + dayText.title;
        
        // Update navigation buttons to include day parameter
        var urlDay = getDayFromURL();
        var textBackButton = document.getElementById("textBackButton");
        var textNextButton = document.getElementById("textNextButton");
        
        if (urlDay) {
            if (textNextButton) {
                textNextButton.href = "day.html?day=" + urlDay;
            }
        } else {
            // If no day parameter, use current day
            var dayInfo = getCurrentDayInfo();
            if (textNextButton) {
                textNextButton.href = "day.html?day=" + dayInfo.date;
            }
        }
    }
    
    // Show day navigation after Feb 14
    var ctx = getValentinesWeekContext();
    var now = new Date();
    var afterValentines = now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14);
    
    if (afterValentines) {
        var dayNav = document.getElementById("day-navigation");
        if (dayNav) {
            dayNav.style.display = "block";
        }
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
