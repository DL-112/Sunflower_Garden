document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("sunflowerCanvas");
    const ctx = canvas.getContext("2d");

    const petalColors = ["#f8c610", "#efbc09", "#dfa60c", "#ce9407"];
    const centerColors = ["#2a0e00", "#4b2509", '#441507']
    const textLines = [
        "My life felt dull back then, just the same old routine every day.",
        "It was okay, but kinda heavy.",
        "Then you came along, reaching out to me, even when I hesitated.",
        "You saw something beautiful in me, even when I couldn't see it myself.",
        "You make every day feel like an adventure, full of happiness and new experiences.",
        "You're like a teenage dream come true, making life exciting and fun.",
        "So, I just want to say thank you.",
        "Thank you for everything. ❤️"
    ];
    let index = 0

    document.getElementById("growButton").addEventListener("click", function () {

        if (index < textLines.length){
            const text = document.querySelector(".text");
            text.classList.remove("show");
            setTimeout(() => {
                document.getElementById("text").innerHTML = textLines[index]
            }, 1000);
            setTimeout(() => {
                text.classList.add("show");
                index += 1
            }, 1500);
        }

        const numberOfFlowers = Math.floor(Math.random() * 5) + 1;
        let frameCount = 0;

        function drawFlowers() {
            frameCount++;
            if (frameCount <= 1) {
                requestAnimationFrame(drawFlowers);
            }
            for (let i = 0; i < numberOfFlowers; i++) {
                drawSunflower();
            }
        }

        requestAnimationFrame(drawFlowers);
    });

    function drawSunflower() {
        const centerX = Math.random() * canvas.width;
        const stemLength = Math.random() * 100 + 100;
        let stemHeight = 0;
        const centerY = canvas.height;
        const radius = Math.random() * 30 + 20;
        const petalCount = 20;
        const petalWidth = 20;

        // Animation for stem
        function drawStem() {
            if (stemHeight <= stemLength) {
                requestAnimationFrame(drawStem);
            }
            ctx.beginPath();
            ctx.moveTo(centerX, canvas.height);
            ctx.lineTo(centerX, canvas.height - stemHeight);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "rgba(54, 72, 34, 0.9)";
            ctx.stroke();
            ctx.closePath();
            stemHeight += 5; // Speed
        }

        // Draw stem first
        drawStem();

        // Animation for leaves
        function drawLeaves() {
            if (stemHeight >= stemLength) {
                // Calculate leaf position
                const leafY = centerY - stemHeight + (stemLength * 3) / 6;

                // Draw leaves
                ctx.beginPath();
                ctx.moveTo(centerX, leafY);
                ctx.lineTo(centerX - 30, leafY - 20); // First leaf
                ctx.lineTo(centerX - 40, leafY - 40);
                ctx.lineTo(centerX, leafY - 20);
                ctx.lineTo(centerX, leafY);
                ctx.lineTo(centerX + 30, leafY - 20); // Second leaf
                ctx.lineTo(centerX + 40, leafY - 40);
                ctx.lineTo(centerX, leafY - 20);
                ctx.lineTo(centerX, leafY);
                ctx.fillStyle = "#446327";
                ctx.fill();
                ctx.closePath();
            } else {
                requestAnimationFrame(drawLeaves);
            }
        }

        drawLeaves();

        // Draw flower center after leaves
        function drawFlowerCenter() {
            let centerRadius = 0;
            const randomCenterColor = centerColors[Math.floor(Math.random() * centerColors.length)];

            function animateCenter() {
                if (centerRadius <= radius / 2) {
                    requestAnimationFrame(animateCenter);
                }
                ctx.beginPath();
                ctx.arc(centerX, centerY - stemHeight, centerRadius, 0, Math.PI * 2);
                ctx.fillStyle = randomCenterColor;
                ctx.fill();
                ctx.closePath();
                centerRadius += 1; // Speed
            }

            animateCenter();
        }

        setTimeout(() => {
            drawFlowerCenter();
        }, 1000);

        // Draw petals after flower center
        function drawPetals() {
            const randomColor = petalColors[Math.floor(Math.random() * petalColors.length)];

            for (let i = 0; i < petalCount; i++) {
                const angle = (Math.PI * 2 / petalCount) * i;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY - stemHeight + Math.sin(angle) * radius;

                ctx.beginPath();
                ctx.moveTo(centerX, centerY - stemHeight);
                ctx.quadraticCurveTo(x, y, x + petalWidth * Math.cos(angle + Math.PI / 2), y + petalWidth * Math.sin(angle + Math.PI / 2));
                ctx.lineTo(centerX, centerY - stemHeight);
                ctx.fillStyle = randomColor; // Use the randomly chosen color
                ctx.fill();
                ctx.closePath();
            }
        }

        setTimeout(() => {
            drawPetals();
        }, 1000); // Delay
    }
});
