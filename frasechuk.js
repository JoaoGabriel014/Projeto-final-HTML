async function frasesAleatorias() {
    const resposta = await fetch("https://api.chucknorris.io/jokes/random");
    const dados = await resposta.json();
    const fraseIngles = dados.value;
    

    const traducaoResposta = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(fraseIngles)}&langpair=en|pt`);
    const traducaoDados = await traducaoResposta.json();
    const frasePortugues = traducaoDados.responseData.translatedText;

document.getElementById("frase-display").innerText = frasePortugues;
  }
window.onload = frasesAleatorias;