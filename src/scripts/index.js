var acc = document.getElementsByClassName("FAQ");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// document.addEventListener("DOMContentLoaded", function () {
//     const img = document.querySelector(".bottom-right");
//     let angle = 0;
//     let increment = 0.1; // Réduit de 1 à 0.5 pour ralentir la rotation

//     function rotate() {
//         angle = (angle + increment) % 360; // Utilise une valeur d'increment plus petite
//         img.style.transform = `translate3d(50%, 50%, 0) rotate(${angle}deg)`;
//         requestAnimationFrame(rotate);
//     }

//     requestAnimationFrame(rotate);
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const img = document.querySelector(".bottom-right_text_mars");
//     let angle = 0;
//     let increment = 0.02; // Réduit de 1 à 0.5 pour ralentir la rotation

//     function rotate() {
//         angle = (angle - increment) % 360; // Utilise une valeur d'increment plus petite
//         img.style.transform = `translate3d(50%, 50%, 0) rotate(${angle}deg)`;
//         requestAnimationFrame(rotate);
//     }

//     requestAnimationFrame(rotate);
// });
