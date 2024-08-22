const basket = document.getElementById("basket");
const item = document.getElementById("item");

let basketPosition = 50; // Percentage
let itemPosition = 0; // Percentage
let score = 0;

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
    item.style.top = itemPosition + "%";

    // Check if item reaches the basket
    if (itemPosition >= 85 && 
        itemPosition <= 90 &&
        basketPosition <= (parseInt(item.style.left) + 10) &&
        basketPosition >= (parseInt(item.style.left) - 10)) {
        score++;
        resetItem();
    } else if (itemPosition > 100) {
        resetItem();
    }
}

function resetItem() {
    itemPosition = 0;
    item.style.top = itemPosition + "%";
    item.style.left = Math.random() * 90 + "%";
}

setInterval(dropItem, 50);
