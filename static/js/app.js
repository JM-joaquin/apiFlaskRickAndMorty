const api = "http://127.0.0.1:3000";

const character = (number) =>{
    return fetch(`${api}/character/${number}`)
        .then(response => response.json())
        .then(data => {
           return data
        });
}

const allCharacter = () =>{
    let page = 6;
    return fetch(`${api}/allCharacters/${page}`)
    .then(response => response.json())
    .then(data => {
        return data;
    });
}


const all_char = async () => {
    const content = document.getElementById("content")
    let data = await allCharacter()
    console.log("aca pasa algo " + data.results.length)
    for (let i = 0; i < data.results.length; i++) {
        content.innerHTML += `
        <img class="m-2" src=${data.results[i].image}></img>
        `     
    } 
}

const id_char = async () => {
    const content = document.getElementById("content")
    let id = document.getElementById("id");
    let data = await character(id.value);
    content.innerHTML = `
    <div>
        <img src=${data.image}></img>
        <h3> Name : ${data.name}</h3>
        <h3> Status: ${data.status}</h3>
        <h3> Species: ${data.species}</h3>
        <h3> Episode: ${data.episode.length}</h3>
    </div>
    `
}
