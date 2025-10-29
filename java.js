
const frases = [
      "As lágrimas do Chuck Norris curam o câncer.",
"Chuck Norris contou até o infinito. Duas vezes.",
"Chuck Norris é o único homem que conseguiu vencer a parede e quebrar o próprio recorde.",
"Chuck Norris não dorme, ele espera.",
"A Grande Muralha da China foi originalmente construída para impedir que os Chuck Norris ficassem bravos."
];


function gerarFraseAleatoria() {
    
    const indiceAleatorio = Math.floor(Math.random() * frases.length);

  
    const fraseSelecionada = frases[indiceAleatorio];

    
    document.getElementById("frase-display").textContent = fraseSelecionada;
}


window.onload = gerarFraseAleatoria;
