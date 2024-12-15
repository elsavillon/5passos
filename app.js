const etapas = {
  capa: {
    imagem: "mulher_recuperada",
    situacao: "Clique para começar.",
    audio: false,
    acoes: [
      { texto: "Iniciar", direciona: "inicio", audio:false}
    ],
  },
  inicio: {
    imagem: "static/inicio-crise-convulsiva.gif",
    situacao: "Início da crise convulsiva.",
    audio: ["audio/intro.m4a"],
    acoes: [
      { texto: "Prestar os primeiros socorros", direciona: "pessoaCai", audio: "audio/ps.m4a" },
      { texto: "Ligar para o SAMU (192)", direciona: "pessoaCai", audio: "audio/Liga-samu.m4a" },
    ],
  },
  pessoaCai: {
    imagem: "static/pessoa-cai-chao.gif",
    situacao: "A pessoa cai no chão.",
    audio: "audio/Liga_samu.m4a",
    acoes: [
      { texto: "Seguir instruções do SAMU", direciona: "pessoaDebate", audio: "audio/Calma.m4a" },
    ],
  },
  pessoaDebate: {
    imagem: "static/mulher_amparada.png",
    situacao: "A pessoa começa a se debater.",
    audio: "audio/Ps.m4a",
    acoes: [
      { texto: "C - Coloque a pessoa de lado, com a cabeça elevada para evitar sufocamento com saliva.", direciona: "pessoaContinua", audio: "audio/c.m4a" },
    ],
  },
  pessoaContinua: {
    imagem: "static/cabeca_apoiada.png",
    situacao: "Há risco da pessoa bater a cabeça.",
    acoes: [
      { texto: "A - Apoie a cabeça da pessoa com algo macio (blusa, mochila, jaleco).", direciona: "pessoaSaliva", audio: "audio/A1.m4a" },
    ],
  },
  pessoaSaliva: {
    imagem: "static/oculos.png",
    situacao: "Há salivação excessiva e risco de engasgo.",
    acoes: [
      { texto: "L - Localize e afaste objetos perigosos (retire óculos, afrouxe roupas apertadas).", direciona: "monitorarTempo", audio: "audio/L.m4a" },
    ],
  },
  monitorarTempo: {
    imagem: "static/relogio.png",
    situacao: "Monitorando o tempo da crise.",
    audio: "audio/m-calma.m4a",
    acoes: [
      { texto: "M - Monitore a duração da crise e ligue para o SAMU se durar mais de 5 minutos.", direciona: "fimCrise", audio: "audio/M.m4a" },
    ],
  },
  fimCrise: {
    imagem: "static/mulher_recuperada.png", 
    situacao: "Convulsão termina e a pessoa recupera a consciência.",
    audio: "audio/a2-calma.m4a",
    acoes: [
      { texto: "A - Acompanhe a pessoa até que ela esteja em segurança. Ligue para o SAMU se necessário.", direciona: "inicio", audio: "audio/A2.m4a" },
    ],
  },
};

let audioPlayer = null;
let isAudioPlaying = false;

// Função para tocar o áudio principal da etapa
function playMainAudio(audioSrc) {
  if (audioSrc === false || audioSrc==="false") {return};
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  audioPlayer = new Audio(audioSrc);
  isAudioPlaying = true;

  audioPlayer.play()
    .then(() => {
      audioPlayer.addEventListener("ended", () => {
        isAudioPlaying = false;
      });
    })
    .catch(error => console.error("Erro ao reproduzir áudio principal:", error));
}

// Mostrar etapa
function mostrar(nome) {
  const etapa = etapas[nome];
  let botoes = "";

  console.log (etapa.acoes)

  etapa.acoes.forEach(acao => {
    botoes += `<button onclick="mostrar('${acao.direciona}')" onmouseover="playMainAudio('${acao.audio}')">${acao.texto}</button>`;
  console.log(666)
  });

  // etapa.acoes.forEach(acao => {
  //   botoes += 'oi'
  //   console.log(acao)
  // });

  document.getElementById("narrativa").innerHTML = `
    <img src="${etapa.imagem}" alt="" />
    <p>${etapa.situacao}</p>
    <div>${botoes}</div>
  `;

  const audioSrc = etapa.audio;
  playMainAudio(audioSrc);
}

// Exibir etapa inicial
mostrar("capa");
