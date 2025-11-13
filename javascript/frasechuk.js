const frases = [
    {"categories":[],"created_at":"2020-01-05 13:42:23.484083","icon_url":"https://api.chucknorris.io/img/avatar/chuck-norris.png","id":"VzP64l7zQyWNwvdb_tisbg","updated_at":"2020-01-05 13:42:23.484083","url":"https://api.chucknorris.io/jokes/VzP64l7zQyWNwvdb_tisbg","value":"acid rain happens when CHUCK NORRIS piss"}
];


function gerarFraseAleatoria() {
    
    const indiceAleatorio = Math.floor(Math.random() * frases.length);

  
    const fraseSelecionada = frases[indiceAleatorio];

    
    document.getElementById("frase-display").textContent = fraseSelecionada;
}


window.onload = gerarFraseAleatoria;
