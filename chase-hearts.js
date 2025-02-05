const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");

let score = 0;
let speed = 2000; // Initial speed (2 seconds per move)

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

// Function to create and move hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";

    const randomX = Math.random() * (window.innerWidth - 50);
    const randomY = Math.random() * (window.innerHeight - 50);

    heart.style.left = `${randomX}px`;
    heart.style.top = `${randomY}px`;

    // Move heart to a new random position every few seconds
    function moveHeart() {
        const newX = Math.random() * (window.innerWidth - 50);
        const newY = Math.random() * (window.innerHeight - 50);

        heart.style.left = `${newX}px`;
        heart.style.top = `${newY}px`;
    }

    const moveInterval = setInterval(moveHeart, speed);

    // When heart is clicked
    heart.addEventListener("click", function() {
        clearInterval(moveInterval);
        heart.innerText = messages[Math.floor(Math.random() * messages.length)];
        heart.style.animation = "none"; // Stop movement

        setTimeout(() => {
            heart.remove();
            score++;
            scoreDisplay.innerText = score;

            // Increase game speed slightly after every 5 catches
            if (score % 5 === 0 && speed > 800) {
                speed -= 200;
            }

            createHeart(); // Add a new heart
        }, 1000);
    });

    gameArea.appendChild(heart);
}

// Start the game by spawning the first heart
createHeart();
