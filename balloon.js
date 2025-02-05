const messages = [
    "I love you! ❤️",
    "Meri panda 😘",
    "Meri jojo 💖",
    "Meri ushu! 😘",
    "Meri basuketoboru ☀️",
    "Meri pushu! 😍", 
    "Mera babu! 😘",
    "Meri bubu! 😍"
];

function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.innerText = "🎈";
    
    const randomLeft = Math.random() * 80 + 10; // Ensures it stays on screen
    balloon.style.left = `${randomLeft}%`;

    balloon.addEventListener("click", function() {
        balloon.classList.add("popped");
        balloon.innerText = messages[Math.floor(Math.random() * messages.length)];
        balloon.style.animation = "none"; // Stop movement so message stays readable

        setTimeout(() => balloon.remove(), 2000); // Message stays for 2 seconds
    });

    document.getElementById("balloon-container").appendChild(balloon);

    setTimeout(() => {
        if (!balloon.classList.contains("popped")) {
            balloon.remove();
        }
    }, 9000); // Balloons last longer on screen
}

// Generate balloons every 1.5 seconds instead of 1 second
setInterval(createBalloon, 1500);

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
            ctx.clearRect(0, 0, canvas.width, canvas.height);

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

            ctx.fillStyle = "black";
            ctx.fillText("Score: " + score, 10, 20);

            requestAnimationFrame(updateGame);
        }

        spawnHeart();
        setInterval(spawnHeart, 1000);
        updateGame();

        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
            if (e.key === "ArrowRight" && player.x < canvas.width - player.width) player.x += 20;
        });
    }
});
