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

// isem player
let playerName = prompt("Veuillez saisir votre nom pour commencer:");

// par defaut isem sabiha
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
    item.style.top = itemPosition + "px"; // type en px

    // planche  cherche la bole
    if (itemPosition >= 350 && // t7arek l planche
        itemPosition <= 370 &&
        basketPosition <= (parseInt(item.style.left) + 10) &&
        basketPosition >= (parseInt(item.style.left) - 10)) {
        score++;
        scoreDisplay.textContent = `Bienvenue : ${playerName} | Score: ${score}`;
        
        // calcul score
        if (score === 5) {
            championName.textContent = playerName;
            congratulations.classList.add("show");
            setTimeout(() => congratulations.classList.remove("show"), 2000); // avant  2 seconds
        } else if (score === 10) {
            alert(`Excellent ${playerName}! Vous avez atteint 10 points.`);
        } else if (score === 20) {
            alert(`C'est magnifique ${playerName}! Vous avez atteint 20 points.`);
        }
        
        resetItem();
    } else if (itemPosition > 400) { // Adjusted to fit the game area
        // tfassa5 le score et t3awed
        alert("Vous avez manqué! Recommençons.");
        score = 0;
        scoreDisplay.textContent = `Bienvenue : ${playerName} | Score: ${score}`;
        resetItem();
    }
}

function resetItem() {
    itemPosition = -30; // restart 
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

// Event listeners  buttons
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);

// Event listener 
dropdownItems.forEach(item => {
    item.addEventListener("click", function() {
        const speed = this.getAttribute("data-speed");
        let speedText = "";
        switch (speed) {
            case "slow":
                dropSpeed = 100; 
                speedText = "Lente";
                break;
            case "medium":
                dropSpeed = 50;
                speedText = "Moyenne";
                break;
            case "fast":
                dropSpeed = 25; 
                speedText = "Rapide";
                break;
        }
        dropdownButton.textContent = speedText; // Update button ili 5tartha
        if (gameInterval) {
            stopGame();
            startGame(); // Restart game 
        }
    });
});
