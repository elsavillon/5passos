const etapas = {
  inicio: {
    imagem: "inicio-crise-convulsiva.gif",
    situacao: "Início da crise convulsiva.",
    acoes: [
      { texto: "Prestar os primeiros socorros", direciona: "pessoaCai" },
      { texto: "Ligar para o SAMU (192)", direciona: "pessoaCai" },
    ],
  },
  pessoaCai: {
    imagem: "pessoa-cai-chao.gif",
    situacao: "A pessoa cai no chão.",
    acoes: [
      { texto: "Virar a pessoa de lado", direciona: "pessoaDebate" },
      { texto: "Aguardar o SAMU", direciona: "pessoaDebate" },
    ],
  },
  pessoaDebate: {
    imagem: "pessoa-debate.gif",
    situacao: "A pessoa começa a se debater.",
    acoes: [
      { texto: "Não tentar imobilizar", direciona: "pessoaContinua" },
      { texto: "Tentar falar com a pessoa", direciona: "pessoaContinua" },
    ],
  },
  pessoaContinua: {
    imagem: "pessoa-continua-debatendo.gif",
    situacao: "A pessoa continua se debatendo.",
    acoes: [
      { texto: "Afastar os objetos perigosos", direciona: "pessoaSaliva" },
      { texto: "Pedir calma", direciona: "pessoaSaliva" },
    ],
  },
  pessoaSaliva: {
    imagem: "pessoa-saliva.gif",
    situacao: "A pessoa saliva e há riscos associados.",
    acoes: [
      { texto: "Colocar uma colher na boca", direciona: "fimCrise" },
      { texto: "Esperar a crise passar", direciona: "fimCrise" },
    ],
  },
  fimCrise: {
    imagem: "fim-crise.gif",
    situacao: "Fim da crise.",
    acoes: [
      { texto: "Colocar na posição de recuperação", direciona: "inicio" },
      { texto: "Ir embora", direciona: "inicio" },
    ],
  },
};

function mostrar(nome) {
  const etapa = etapas[nome];
  let botoes = "";

  // Gerar botões com ações
  for (let acao of etapa.acoes) {
    botoes += `<button onclick="mostrar('${acao.direciona}')">${acao.texto}</button>`;
  }

  // Atualizar o conteúdo do quadro interativo
  document.getElementById("narrativa").innerHTML = `
    <img src="${etapa.imagem}" alt="" />
    <p>${etapa.situacao}</p>
    <div>${botoes}</div>
  `;
}

// Inicializar com a primeira etapa
mostrar("inicio");
