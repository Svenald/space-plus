document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("imageContainer");
    const videoContainer = document.getElementById("videoContainer");
    const audioContainer = document.getElementById("audioContainer");
    const cardModal = document.getElementById("cardModal");
    const modalBody = document.getElementById("modalBody");
    const closeModalButton = document.querySelector(".close");

    // Contenu de base
    const baseContent = [
        {
            title: "Nebuleuse",
            description: "Nebuleuse de la Carène (NGC 3372)",
            contentType: "image",
            contentBase64: "ressources/images/nebula.jpg",
            tags: "Espace, NASA, Galaxie",
        },
        {
            title: "Mars",
            description: "Mars vue par le rover Curiosity",
            contentType: "image",
            contentBase64: "ressources/images/mars.webp",
            tags: "Planètes, Exploration",
        },
        {
            title: "Terre depuis l'ISS",
            description:
                "La Terre vue depuis la Station Spatiale Internationale",
            contentType: "video",
            contentBase64: "ressources/videos/background.webm",
            contentFileType: "video/webm",
            tags: "ISS, Mission, Terre",
        },
        {
            title: "Direct de l'ISS",
            description: "Direct de la Station Spatiale Internationale",
            contentType: "video",
            contentBase64: "ressources/videos/background.webm",
            contentFileType: "video/webm",
            tags: "ISS, Mission, Espace",
        },
        {
            title: "Son du rover Curiosity",
            description: "Son enregistré par le rover Curiosity sur Mars",
            contentType: "audio",
            contentBase64: "data:audio/mpeg;base64,SUQzAwAA...",
            contentFileType: "audio/mpeg",
            tags: "Podcast, Exploration",
        },
        {
            title: "Interview d'astronaute",
            description:
                "Interview d'un astronaute de la NASA avant son départ pour l'ISS.",
            contentType: "audio",
            contentBase64: "data:audio/mpeg;base64,SUQzAwAA...",
            contentFileType: "audio/mpeg",
            tags: "Interview, Astronaute",
        },
        {
            title: "ISS",
            description: "Station Spatiale Internationale (ISS)",
            contentType: "image",
            contentBase64: "ressources/images/iss.webp",
            tags: "Galaxie, Univers",
        },
        {
            title: "Star Wars",
            description: "Star Wars - La Guerre des étoiles",
            contentType: "image",
            contentBase64: "ressources/images/star_wars.gif",
            tags: "Télescope, Observatoire",
        },
    ];

    function mergeContent() {
        const localStorageContent =
            JSON.parse(localStorage.getItem("contentData")) || [];
        const mergedContent = [...baseContent, ...localStorageContent];
        return mergedContent;
    }

    function showModal(data) {
        modalBody.innerHTML = "";

        const titleElement = document.createElement("h3");
        titleElement.textContent = data.title;
        modalBody.appendChild(titleElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = data.description;
        modalBody.appendChild(descriptionElement);

        const tagsElement = document.createElement("p");
        tagsElement.textContent = `Tags: ${data.tags}`;
        tagsElement.classList.add("tags");
        modalBody.appendChild(tagsElement);

        let mediaElement;
        if (data.contentType === "youtube") {
            const videoId = new URL(data.contentUrl).searchParams.get("v");
            mediaElement = document.createElement("iframe");
            mediaElement.src = `https://www.youtube.com/embed/${videoId}`;
            mediaElement.width = "100%";
            mediaElement.height = "auto";
            mediaElement.frameBorder = "0";
            mediaElement.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            mediaElement.allowFullscreen = true;
        } else {
            switch (data.contentType) {
                case "image":
                    mediaElement = document.createElement("img");
                    mediaElement.src = data.contentBase64;
                    mediaElement.alt = data.title;
                    mediaElement.style.width = "100%";
                    mediaElement.style.height = "auto";
                    break;
                case "audio":
                    mediaElement = document.createElement("audio");
                    mediaElement.controls = true;
                    const audioSource = document.createElement("source");
                    audioSource.src = data.contentBase64;
                    audioSource.type = data.contentFileType || "audio/mpeg";
                    mediaElement.appendChild(audioSource);
                    break;
                case "video":
                    mediaElement = document.createElement("video");
                    mediaElement.controls = true;
                    const videoSource = document.createElement("source");
                    videoSource.src = data.contentBase64;
                    videoSource.type = data.contentFileType || "video/mp4";
                    mediaElement.appendChild(videoSource);
                    mediaElement.style.width = "100%";
                    mediaElement.style.height = "auto";
                    break;
                default:
                    break;
            }
        }

        modalBody.appendChild(mediaElement);
        cardModal.style.display = "block";
    }

    // Fonction pour afficher les cartes de contenu
    function displayContentCards() {
        const contentData = mergeContent();
        contentData.forEach((data) => {
            const contentElement = document.createElement("div");
            contentElement.classList.add("content-element");

            const titleElement = document.createElement("h3");
            titleElement.textContent = data.title;
            contentElement.appendChild(titleElement);

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = data.description;
            contentElement.appendChild(descriptionElement);

            const tagsElement = document.createElement("p");
            tagsElement.textContent = `Tags: ${data.tags}`;
            tagsElement.classList.add("tags");
            contentElement.appendChild(tagsElement);

            let mediaElement;
            if (data.contentType === "youtube") {
                const videoId = new URL(data.contentUrl).searchParams.get("v");
                mediaElement = document.createElement("iframe");
                mediaElement.src = `https://www.youtube.com/embed/${videoId}`;
                mediaElement.width = "100%";
                mediaElement.height = "auto";
                mediaElement.frameBorder = "0";
                mediaElement.allow =
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                mediaElement.allowFullscreen = true;
            } else {
                switch (data.contentType) {
                    case "image":
                        mediaElement = document.createElement("img");
                        mediaElement.src = data.contentBase64;
                        mediaElement.alt = data.title;
                        mediaElement.style.width = "100%";
                        mediaElement.style.height = "auto";
                        break;
                    case "audio":
                        mediaElement = document.createElement("audio");
                        mediaElement.controls = true;
                        const audioSource = document.createElement("source");
                        audioSource.src = data.contentBase64;
                        audioSource.type = data.contentFileType || "audio/mpeg";
                        mediaElement.appendChild(audioSource);
                        break;
                    case "video":
                        mediaElement = document.createElement("video");
                        mediaElement.controls = true;
                        const videoSource = document.createElement("source");
                        videoSource.src = data.contentBase64;
                        videoSource.type = data.contentFileType || "video/mp4";
                        mediaElement.appendChild(videoSource);
                        mediaElement.style.width = "100%";
                        mediaElement.style.height = "auto";
                        break;
                    default:
                        break;
                }
            }

            contentElement.appendChild(mediaElement);
            contentElement.addEventListener("click", () => {
                showModal(data);
            });

            switch (data.contentType) {
                case "image":
                    imageContainer.appendChild(contentElement);
                    break;
                case "audio":
                    audioContainer.appendChild(contentElement);
                    break;
                case "video":
                case "youtube":
                    videoContainer.appendChild(contentElement);
                    break;
                default:
                    break;
            }
        });
    }

    displayContentCards();

    closeModalButton.addEventListener("click", () => {
        cardModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === cardModal) {
            cardModal.style.display = "none";
        }
    });
});
