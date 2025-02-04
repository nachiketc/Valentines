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