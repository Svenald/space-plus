function toggleMenu() {
    var menu = document.getElementById("hidden-menu");
    menu.classList.toggle("visible");
}
var s;

function setup(
    starDensity,
    planetDensity,
    maxSpeed,
    objectLabelling,
    drawCube,
    drawSphere
) {
    s = new StarField(
        starDensity,
        planetDensity,
        maxSpeed,
        objectLabelling,
        drawCube,
        drawSphere
    );
}

function draw(g) {
    s.draw(g);
}

let users = [
    {
        id: "Carbonix974@gmail.com",
        password: "123456",
        username: "Yoan",
    },
    {
        id: "svenald@gmail.com",
        password: "987654",
        username: "Loic",
    },
    {
        id: "1234",
        password: "0000",
        username: "admin",
    },
    {
        id: "anthony@outlook.com",
        password: "1234",
        username: "Anthony",
    },
];

let loginAttempt = 3;

function validation(event) {
    event.preventDefault(); // Empêcher le formulaire de soumettre normalement

    let id = document.getElementById("id").value;
    let password = document.getElementById("password").value;

    if (id === "" || password === "") {
        alert("Veuillez entrer un nom d'utilisateur et un mot de passe !");
        return;
    }

    let estValide = false;

    for (let user of users) {
        if (id === user.id && password === user.password) {
            estValide = true;
            alert("Connexion réussie !");
            sessionStorage.setItem("isLoggedIn", "true"); // Indiquer que l'utilisateur est connecté
            sessionStorage.setItem("username", user.username); // Stocker le nom d'utilisateur
            window.location.href = "content.html";
            break;
        }
    }

    if (!estValide) {
        loginAttempt--;
        alert("Il reste " + loginAttempt + " tentatives !");

        if (loginAttempt === 0) {
            document.getElementById("id").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("login").disabled = true;
            alert(
                "Nom d'utilisateur ou mot de passe incorrect, veuillez contacter le service !"
            );
            window.location.href = "login.html";
        }
    }
}

window.addEventListener("load", () => {
    document.getElementById("loginForm").addEventListener("submit", validation);
});
