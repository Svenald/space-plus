document.addEventListener("DOMContentLoaded", function () {
    const img = document.querySelector(".bottom-right");
    let angle = 0;
    let increment = 0.1; // Réduit de 1 à 0.5 pour ralentir la rotation

    function rotate() {
        angle = (angle + increment) % 360; // Utilise une valeur d'increment plus petite
        img.style.transform = `translate3d(20%, 20%, 0) rotate(${angle}deg)`;
        requestAnimationFrame(rotate);
    }

    requestAnimationFrame(rotate);
});

document.addEventListener("DOMContentLoaded", function () {
    const img = document.querySelector(".bottom-right_text_mars");
    let angle = 0;
    let increment = 0.04; // Réduit de 1 à 0.5 pour ralentir la rotation

    function rotate() {
        angle = (angle - increment) % 360; // Utilise une valeur d'increment plus petite
        img.style.transform = `translate3d(23%, 23%, 0) rotate(${angle}deg)`;
        requestAnimationFrame(rotate);
    }

    requestAnimationFrame(rotate);
});
