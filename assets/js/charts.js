document.addEventListener("DOMContentLoaded", () => {
  const perguntas = [
    {
      id: "p1",
      texto: "Você gostou da apresentação do palestrante?",
      votos: { excelente: 28, bom: 1, regular: 1, ruim: 1, pessimo: 0 },
    },
    {
      id: "p2",
      texto: "O conteúdo apresentado foi relevante para você?",
      votos: { excelente: 28, bom: 1, regular: 1, ruim: 1, pessimo: 0 },
    },
    {
      id: "p3",
      texto: "Você gostou da apresentação do participante X?",
      votos: { excelente: 28, bom: 1, regular: 1, ruim: 2, pessimo: 0 },
    },
    {
      id: "p4",
      texto: "Você gostou da apresentação do participante X?",
      votos: { excelente: 8, bom: 7, regular: 5, ruim: 4, pessimo: 1 },
    },
    {
      id: "p5",
      texto: "Você gostou da apresentação do participante X?",
      votos: { excelente: 10, bom: 5, regular: 6, ruim: 8, pessimo: 1 },
    },
    {
      id: "p6",
      texto: "Você gostou da apresentação do participante X?",
      votos: { excelente: 7, bom: 8, regular: 9, ruim: 4, pessimo: 2 },
    },
  ];

  perguntas.forEach(criarGrafico);
});

function criarGrafico(pergunta) {
  const container = document.querySelector(`[data-id="${pergunta.id}"]`);
  if (!container) return;

  const total = Object.values(pergunta.votos).reduce((a, b) => a + b, 0);
  const maior = Math.max(...Object.values(pergunta.votos));
  const percentual = Math.round((maior / total) * 100);

  const classificacao = getLabel(percentual);

  const cores = {
    excelente: "#4CAF50",
    bom: "#8BC34A",
    regular: "#FFC107",
    ruim: "#FF4081",
    pessimo: "#E91E63",
  };

  container.innerHTML = `
    <div class="header-grafico">
      <h4>${percentual}%</h4>
      <span class="tag ${classificacao.classe}">${classificacao.texto}</span>
    </div>

    <p>${pergunta.texto}</p>

    <div class="barras">
      ${Object.keys(pergunta.votos)
        .map((key) => {
          const qty = pergunta.votos[key];
          const perc = ((qty / total) * 100).toFixed(1);

          return `
          <div class="linha">
            <div class="barra" style="width:${perc}%; background:${cores[key]}"></div>
            <span>${qty}</span>
          </div>`;
        })
        .join("")}
    </div>
  `;
}

function getLabel(percentual) {
  if (percentual >= 80) return { texto: "Excelente", classe: "excelente" };
  if (percentual >= 60) return { texto: "Bom", classe: "bom" };
  if (percentual >= 40) return { texto: "Regular", classe: "regular" };
  if (percentual >= 20) return { texto: "Ruim", classe: "ruim" };
  return { texto: "Péssimo", classe: "pessimo" };
}
