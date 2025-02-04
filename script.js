function goToPage(page) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = page;
    }, 500);
}

function goBack() {
    window.history.back();
}

document.getElementById("yesButton").addEventListener("click", function() {
    document.getElementById("messages").innerHTML = "Yay! Can't wait to spend Valentine's Day with you! ❤️";
    startConfetti();
});

// Confetti Effect
function startConfetti() {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff758c', '#ff7eb3', '#ff4081', '#ff1744']
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

    let timeText = `${months} months, ${days} days, ${hours} hours, ${minutes} minutes ❤️`;
    if (years > 0) {
        timeText = `${years} years, ` + timeText;
    }

    document.getElementById("daysCounter").innerText = `It's been ${timeText} \n since we got together! ❤️`;
}



// No Button Behavior
document.addEventListener("DOMContentLoaded", function () {
    let noButton = document.getElementById("noButton");
    let movedOnce = false;

    noButton.addEventListener("mouseover", function () {
        if (!movedOnce) {
            noButton.innerText = "Are you sure? 😢";
            movedOnce = true;
        } else {
            let x = Math.random() * (window.innerWidth - 100);
            let y = Math.random() * (window.innerHeight - 50);
            noButton.style.left = `${x}px`;
            noButton.style.top = `${y}px`;
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