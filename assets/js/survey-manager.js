const displayNome = document.getElementById("displayNomePesquisa");
const btnSalvarPesquisa = document.querySelector(".enviar-pesquisa-btn");
const closeBtnModal = document.getElementById("btnCloseSuccessModal");

if (displayNome) {
  loadSurveyData();
}

if (closeBtnModal) {
  closeBtnModal.addEventListener("click", function () {
    window.location.href = "../index.html";
  });
}

if (btnSalvarPesquisa) {
  prefillEditForm();

  btnSalvarPesquisa.addEventListener("click", function (e) {
    e.preventDefault();
    saveSurveyData();
  });
}

function saveSurveyData() {
  const inputNome = document.getElementById("PesquisaNome");
  const inputData = document.getElementById("PesquisaDataDisponivel");
  const checkAtivo = document.getElementById("PesquisaAtivo");
  const radioPublico = document.querySelector(
    'input[name="data[Pesquisa][enviar_para]"]:checked'
  );

  const surveyData = {
    nome: inputNome ? inputNome.value : "Pesquisa Sem Nome",
    dataInicio: inputData ? inputData.value : "--/--/----",
    isAtivo: checkAtivo ? checkAtivo.checked : false,
    tipoPublico: radioPublico ? radioPublico.value : "0",
  };

  localStorage.setItem("dadosPesquisa", JSON.stringify(surveyData));
  console.log("oi");
  showSuccessModal();
}

function showSuccessModal() {
  const modal = document.getElementById("customSuccessModal");
  if (modal) {
    modal.classList.add("active");

    setTimeout(function () {
      window.location.href = "../index.html";
    }, 3000);
  } else {
    window.location.href = "../index.html";
  }
}

function loadSurveyData() {
  const dataJSON = localStorage.getItem("dadosPesquisa");
  if (!dataJSON) return;

  const surveyData = JSON.parse(dataJSON);

  const displayNome = document.getElementById("displayNomePesquisa");
  const displayData = document.getElementById("displayDataPesquisa");
  const displayPublico = document.getElementById("displayPublicoPesquisa");
  const displayStatus = document.getElementById("displayStatusPesquisa");

  if (displayNome) displayNome.textContent = surveyData.nome;

  if (displayData) displayData.textContent = surveyData.dataInicio;

  if (displayPublico) {
    const textoPublico =
      surveyData.tipoPublico === "1"
        ? "Só participantes credenciados"
        : "Todos os confirmados";
    displayPublico.textContent = textoPublico;
  }

  if (displayStatus) {
    if (surveyData.isAtivo) {
      displayStatus.innerHTML =
        '<span class="dot" style="background-color: #27ae60;"></span> Disponível';
    } else {
      displayStatus.innerHTML =
        '<span class="dot" style="background-color: #aaa;"></span> Indisponível';
    }
  }
}

function prefillEditForm() {
  const dataJSON = localStorage.getItem("dadosPesquisa");
  if (!dataJSON) return;

  const surveyData = JSON.parse(dataJSON);

  const inputNome = document.getElementById("PesquisaNome");
  const inputData = document.getElementById("PesquisaDataDisponivel");
  const checkAtivo = document.getElementById("PesquisaAtivo");

  if (inputNome) inputNome.value = surveyData.nome;
  if (inputData) inputData.value = surveyData.dataInicio;
  if (checkAtivo) checkAtivo.checked = surveyData.isAtivo;

  const radioToCheck = document.querySelector(
    `input[name="data[Pesquisa][enviar_para]"][value="${surveyData.tipoPublico}"]`
  );
  if (radioToCheck) radioToCheck.checked = true;
}
