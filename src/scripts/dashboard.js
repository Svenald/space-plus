document.addEventListener("DOMContentLoaded", () => {
    const contentForm = document.getElementById("contentForm");
    const previewContainer = document.getElementById("previewContainer");
    const modal = document.getElementById("contentModal");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.querySelector(".close");
    const contentTypeSelect = document.getElementById("contentType");
    const fileInputContainer = document.getElementById("fileInputContainer");
    const urlInputContainer = document.getElementById("urlInputContainer");

    const contentTypes = [
        { value: "image", text: "Image" },
        { value: "audio", text: "Son" },
        { value: "video", text: "Vidéo" },
        { value: "youtube", text: "Vidéo YouTube" },
    ];

    contentTypes.forEach((type) => {
        const option = document.createElement("option");
        option.value = type.value;
        option.textContent = type.text;
        contentTypeSelect.appendChild(option);
    });

    function displayContentCards() {
        previewContainer.innerHTML = "";
        const contentData =
            JSON.parse(localStorage.getItem("contentData")) || [];
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
                mediaElement.height = "60%";
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
                        audioSource.type = data.contentFileType;
                        mediaElement.appendChild(audioSource);
                        break;
                    case "video":
                        mediaElement = document.createElement("video");
                        mediaElement.controls = true;
                        const videoSource = document.createElement("source");
                        videoSource.src = data.contentBase64;
                        videoSource.type = data.contentFileType;
                        mediaElement.appendChild(videoSource);
                        mediaElement.style.width = "100%";
                        mediaElement.style.height = "auto";
                        break;
                    default:
                        break;
                }
            }

            contentElement.appendChild(mediaElement);
            previewContainer.appendChild(contentElement);
        });
    }

    openModalButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    contentTypeSelect.addEventListener("change", () => {
        if (contentTypeSelect.value === "youtube") {
            fileInputContainer.style.display = "none";
            urlInputContainer.style.display = "block";
        } else {
            fileInputContainer.style.display = "block";
            urlInputContainer.style.display = "none";
        }
    });

    contentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const contentType = contentTypeSelect.value;
        const tags = document.getElementById("tags").value;
        let contentFile, contentUrl;

        if (contentType === "youtube") {
            contentUrl = document.getElementById("contentUrl").value;
            const contentData =
                JSON.parse(localStorage.getItem("contentData")) || [];
            contentData.push({
                title,
                description,
                contentType,
                contentUrl,
                tags,
            });
            localStorage.setItem("contentData", JSON.stringify(contentData));
            displayContentCards();
        } else {
            contentFile = document.getElementById("contentFile").files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const contentBase64 = e.target.result;
                const contentData =
                    JSON.parse(localStorage.getItem("contentData")) || [];
                contentData.push({
                    title,
                    description,
                    contentType,
                    contentFileType: contentFile.type,
                    contentBase64,
                    tags,
                });
                localStorage.setItem(
                    "contentData",
                    JSON.stringify(contentData)
                );
                displayContentCards();
            };
            reader.readAsDataURL(contentFile);
        }

        modal.style.display = "none";
        contentForm.reset();
    });

    displayContentCards();
});
