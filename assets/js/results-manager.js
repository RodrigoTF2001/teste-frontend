const STATUS_CONFIG = {
  excelente: { color: "#66BB33", label: "Excelente" },
  bom: { color: "#C5C772", label: "Bom" },
  regular: { color: "#DFAD40", label: "Regular" },
  ruim: { color: "#E66699", label: "Ruim" },
  pessimo: { color: "#FF2B34", label: "Péssimo" },
};

const questionsData = [
  {
    id: 1,
    text: "Você gostou da apresentação do participante x?",
    stats: {
      excelente: 28,
      bom: 10,
      regular: 5,
      ruim: 2,
      pessimo: 1,
    },
  },
  {
    id: 2,
    text: "Qual nota você daria para a organização?",
    stats: {
      excelente: 5,
      bom: 8,
      regular: 12,
      ruim: 15,
      pessimo: 20,
    },
  },
  {
    id: 3,
    text: "Como você avalia a qualidade do coffee break?",
    stats: {
      excelente: 45,
      bom: 30,
      regular: 5,
      ruim: 0,
      pessimo: 0,
    },
  },
  {
    id: 4,
    text: "O credenciamento foi rápido e eficiente?",
    stats: {
      excelente: 60,
      bom: 15,
      regular: 5,
      ruim: 0,
      pessimo: 0,
    },
  },
  {
    id: 5,
    text: "Como você avalia a limpeza do local?",
    stats: {
      excelente: 10,
      bom: 40,
      regular: 20,
      ruim: 5,
      pessimo: 2,
    },
  },
  {
    id: 6,
    text: "Os temas abordados foram relevantes?",
    stats: {
      excelente: 5,
      bom: 10,
      regular: 30,
      ruim: 15,
      pessimo: 5,
    },
  },
];

function renderQuestionCards() {
  const container = document.querySelector(".grid-cards-destaque");
  if (!container) return;

  container.innerHTML = "";

  questionsData.forEach((question, index) => {
    const cardHTML = createCardHTML(question, index + 1);
    container.insertAdjacentHTML("beforeend", cardHTML);
  });
}

function createCardHTML(question, number) {
  const totalVotes = Object.values(question.stats).reduce((a, b) => a + b, 0);

  let maxVoteKey = "excelente";
  let maxVoteCount = -1;

  for (const [key, value] of Object.entries(question.stats)) {
    if (value > maxVoteCount) {
      maxVoteCount = value;
      maxVoteKey = key;
    }
  }

  const percentage = ((maxVoteCount / totalVotes) * 100).toFixed(0);
  const dominantColor = STATUS_CONFIG[maxVoteKey].color;
  const dominantLabel = STATUS_CONFIG[maxVoteKey].label;

  let barsHTML = "";
  const categories = ["excelente", "bom", "regular", "ruim", "pessimo"];

  categories.forEach((cat) => {
    const count = question.stats[cat];
    const percentBar = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
    const color = STATUS_CONFIG[cat].color;
    const label = STATUS_CONFIG[cat].label;

    barsHTML += `
            <div class="barra-row">
                <div class="barra-item">
                    <div class="barra-progresso">
                        <div class="barra-preenchimento" 
                             style="width: ${percentBar}%; background-color: ${color};">
                        </div>
                    </div>
                </div>
                <div class="stat-linha">
                    <span>${label}</span><strong>${count}</strong>
                </div>
            </div>
        `;
  });

  return `
        <div class="grafico-destaque" id="card-${question.id}">
            <div class="pergunta-destaque">
                <div style="display: flex; justify-content: space-between;">
                    <div style="display: flex; flex-direction: column; max-width: 175px;">
                        <span class="numero-pergunta">0${number}</span>
                        <span>${question.text}</span>
                    </div>
                    
                    <div style="flex-direction: column; display: flex; align-items: center;">
                        <div class="numero-destaque" style="color: ${dominantColor}">${percentage}%</div>
                        <div class="avaliacao-destaque" style="background-color: ${dominantColor}">
                            ${dominantLabel}
                        </div>
                    </div>
                </div>
            </div>

            <div class="barras-container">
                ${barsHTML}
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
  renderQuestionCards();
});
