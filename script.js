const basket = document.getElementById("basket");
const item = document.getElementById("item");
const scoreDisplay = document.getElementById("score");
const playerNameDisplay = document.getElementById("player-name");
const congratulations = document.getElementById("congratulations");
const championName = document.getElementById("champion-name");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const dropdownButton = document.querySelector(".dropdown-btn");
const dropdownItems = document.querySelectorAll(".dropdown-item");

let basketPosition = 50; // Percentage
let itemPosition = -30; // Start above the game area
let score = 0;
let gameInterval;
let dropSpeed = 50; // Default speed

// Ask for the player's name at the beginning
let playerName = prompt("Veuillez saisir votre nom pour commencer:");

// Set default name if no input is provided
if (!playerName) {
    playerName = "Sabiha";
}
playerNameDisplay.textContent = playerName;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && basketPosition > 0) {
        basketPosition -= 5;
        basket.style.left = basketPosition + "%";
    }
    if (event.key === "ArrowRight" && basketPosition < 90) {
        basketPosition += 5;
        basket.style.left = basketPosition + "%";
    }
});

function dropItem() {
    itemPosition += 2;
    item.style.top = itemPosition + "px"; // Use px for top positioning

    // Check if item reaches the basket
    if (itemPosition >= 350 && // Adjusted to fit the game area
        itemPosition <= 370 &&
        basketPosition <= (parseInt(item.style.left) + 10) &&
        basketPosition >= (parseInt(item.style.left) - 10)) {
        score++;
        scoreDisplay.textContent = `Bienvenue : ${playerName} | Score: ${score}`;
        
        // Check score milestones and display alerts
        if (score === 5) {
            championName.textContent = playerName;
            congratulations.classList.add("show");
            setTimeout(() => congratulations.classList.remove("show"), 2000); // Hide after 2 seconds
        } else if (score === 10) {
            alert(`Excellent ${playerName}! Vous avez atteint 10 points.`);
        } else if (score === 20) {
            alert(`C'est magnifique ${playerName}! Vous avez atteint 20 points.`);
        }
        
        resetItem();
    } else if (itemPosition > 400) { // Adjusted to fit the game area
        // If item is not caught, reset score and restart
        alert("Vous avez manqué! Recommençons.");
        score = 0;
        scoreDisplay.textContent = `Bienvenue : ${playerName} | Score: ${score}`;
        resetItem();
    }
}

function resetItem() {
    itemPosition = -30; // Reset item to start above the game area
    item.style.top = itemPosition + "px"; // Use px for top positioning
    item.style.left = Math.random() * 90 + "%"; // Random horizontal position
}

function startGame() {
    if (!gameInterval) {
        gameInterval = setInterval(dropItem, dropSpeed);
    }
}

function stopGame() {
    clearInterval(gameInterval);
    gameInterval = null;
}

// Event listeners for buttons
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);

// Event listener for dropdown items
dropdownItems.forEach(item => {
    item.addEventListener("click", function() {
        const speed = this.getAttribute("data-speed");
        let speedText = "";
        switch (speed) {
            case "slow":
                dropSpeed = 100; // Slower speed
                speedText = "Lente";
                break;
            case "medium":
                dropSpeed = 50; // Medium speed
                speedText = "Moyenne";
                break;
            case "fast":
                dropSpeed = 25; // Faster speed
                speedText = "Rapide";
                break;
        }
        dropdownButton.textContent = speedText; // Update button text with selected speed
        if (gameInterval) {
            stopGame();
            startGame(); // Restart game with new speed
        }
    });
});
