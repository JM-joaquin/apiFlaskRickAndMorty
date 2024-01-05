const api = "http://127.0.0.1:3000";

const character = (number, controller) => {
    const signal = controller.signal;
    return fetch(`${api}/character/${number}`, { signal })
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

const allCharacter = (page, controller) => {
    const signal = controller.signal;
    return fetch(`${api}/allCharacters/${page}`, { signal })
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

const clearContent = () => {
    const content = document.getElementById("content");
    content.innerHTML = "";
}

let currentController; // Variable global para mantener el controlador actual

const stopFetching = () => {
    if (currentController) {
        currentController.abort(); // Cancelar la petición actual
        currentController = null; // Restablecer el controlador
    }
}

const all_char = async () => {
    stopFetching(); // Detener la petición anterior (si existe)
    currentController = new AbortController(); // Crear un nuevo controlador
    clearContent();
    const content = document.getElementById("content");

    try {
        let data = await allCharacter(1, currentController);
        console.log(data);

        for (let i = 1; i < data.info.pages; i++) {
            if (currentController.signal.aborted) {
                console.log("Request aborted");
                return;
            }

            data = await allCharacter(i, currentController);
            for (let i = 0; i < data.results.length; i++) {
                content.innerHTML += `
                <div class="card m-2" style="width: 18rem; background-color: rgba(255, 255, 255, 0.8);">
                    <img src=${data.results[i].image} class="card-img-top" alt="Character Image" onclick="showImage('${data.results[i].image}')">
                    <div class="card-body">
                        <h5 class="card-title">${data.results[i].name}</h5>
                        <p class="card-text">
                            Status: ${data.results[i].status} <br>
                            Species: ${data.results[i].species} <br>
                            Episodes: ${data.results[i].episode.length}
                        </p>
                    </div>
                </div>
                `;
            }
        }
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Request aborted");
        } else {
            console.error("Error:", error);
        }
    }
}

function showImage(imageUrl) {
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    
    const modalImage = document.createElement("img");
    modalImage.src = imageUrl;
    
    modalContent.appendChild(modalImage);
    modalContainer.appendChild(modalContent);
    
    document.body.appendChild(modalContainer);
    
    modalContainer.addEventListener("click", () => {
        document.body.removeChild(modalContainer);
    });
}

const id_char = async () => {
    stopFetching(); // Detener la petición anterior (si existe)
    currentController = new AbortController(); // Crear un nuevo controlador
    clearContent();
    const content = document.getElementById("content");
    let id = document.getElementById("id");

    try {
        let data = await character(id.value, currentController);
        console.log(data);

        content.innerHTML = `
        <div class="card m-2" style="width: 18rem; background-color: rgba(255, 255, 255, 0.8);">
            <img src=${data.image} class="card-img-top" alt="Character Image" onclick="showImage('${data.image}')">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">
                    Status: ${data.status} <br>
                    Species: ${data.species} <br>
                    Episodes: ${data.episode.length}
                </p>
            </div>
        </div>
        `;
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Request aborted");
        } else {
            console.error("Error:", error);
        }
    }
}

