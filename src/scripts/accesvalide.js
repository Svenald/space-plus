window.addEventListener("load", () => {
    // Vérifiez si l'utilisateur est connecté
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
    } else {
        document.body.classList.remove("loading"); // Révélez le contenu si l'utilisateur est connecté
    }

    // Ajoutez le nom d'utilisateur au texte de bienvenue
    const username = sessionStorage.getItem("username");
    if (username) {
        document.getElementById("bonjour").textContent = `Bonjour ${username}`;
    }

    // Ajoutez un écouteur d'événement pour le bouton de déconnexion
    document.getElementById("logout").addEventListener("click", () => {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("username");
        localStorage.removeItem("contentData");
        window.location.href = "login.html";
    });
});
