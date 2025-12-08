setupConfirmModal();

const btnEnviarPrincipal = document.getElementById(
  "btnEnviarPesquisaPrincipal"
);
if (btnEnviarPrincipal) {
  btnEnviarPrincipal.addEventListener("click", function (e) {
    e.preventDefault();
    showConfirmSendModal();
  });
}

const displayNome = document.getElementById("displayNomePesquisa");
if (displayNome) {
  loadSurveyData();
}

const closeBtnModal = document.getElementById("btnCloseSuccessModal");
if (closeBtnModal) {
  closeBtnModal.addEventListener("click", function () {
    const modal = document.getElementById("customSuccessModal");
    if (modal) {
      modal.classList.remove("active");

      const isEditingPage = document.getElementById("PesquisaNome");
      if (isEditingPage) {
        window.location.href = "../index.html";
      }
    }
  });
}

const inputNome = document.getElementById("PesquisaNome");
if (inputNome) {
  prefillEditForm();

  const btnSalvar = document.querySelector(".enviar-pesquisa-btn");
  if (btnSalvar) {
    btnSalvar.addEventListener("click", function (e) {
      e.preventDefault();
      saveSurveyData();
    });
  }
} else {
  const btnEnviarPreview = document.querySelector(".enviar-pesquisa-btn");
  if (btnEnviarPreview) {
    btnEnviarPreview.addEventListener("click", function (e) {
      e.preventDefault();
      showSuccessModal(false);
    });
  }
}

function showConfirmSendModal() {
  const modal = document.getElementById("modalConfirmacaoEnvio");
  if (modal) {
    modal.classList.add("active");
  } else {
    console.error("Modal #modalConfirmacaoEnvio não encontrado!");
  }
}

function hideConfirmSendModal() {
  const modal = document.getElementById("modalConfirmacaoEnvio");
  if (modal) modal.classList.remove("active");
}

function setupConfirmModal() {
  const btnCancel = document.getElementById("btnCancelarEnvio");
  const btnConfirm = document.getElementById("btnConfirmarEnvio");

  if (btnCancel) {
    btnCancel.addEventListener("click", hideConfirmSendModal);
  }

  if (btnConfirm) {
    btnConfirm.addEventListener("click", function () {
      hideConfirmSendModal();

      const btnMain = document.getElementById("btnEnviarPesquisaPrincipal");
      disableSendButton(btnMain);
    });
  }
}

function disableSendButton(btn) {
  if (!btn) return;
  btn.disabled = true;
  btn.innerText = "Enviar Pesquisa";
  btn.style.backgroundColor = "#ccc";
  btn.style.cursor = "not-allowed";
  btn.style.borderColor = "#ccc";
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
    typePublico: radioPublico ? radioPublico.value : "0",
  };

  localStorage.setItem("dadosPesquisa", JSON.stringify(surveyData));
  showSuccessModal();
}

function showSuccessModal(redirect = true) {
  const modal = document.getElementById("customSuccessModal");
  if (modal) {
    modal.classList.add("active");
    if (redirect) {
      setTimeout(function () {
        window.location.href = "../index.html";
      }, 3000);
    }
  } else {
    if (redirect) {
      window.location.href = "../index.html";
    }
  }
}

function loadSurveyData() {
  const dataJSON = localStorage.getItem("dadosPesquisa");
  if (!dataJSON) return;
  const surveyData = JSON.parse(dataJSON);

  const elNome = document.getElementById("displayNomePesquisa");
  const elData = document.getElementById("displayDataPesquisa");
  const elPublico = document.getElementById("displayPublicoPesquisa");
  const elStatus = document.getElementById("displayStatusPesquisa");

  if (elNome) elNome.textContent = surveyData.nome;
  if (elData) elData.textContent = surveyData.dataInicio;

  if (elPublico) {
    elPublico.textContent =
      surveyData.typePublico === "1"
        ? "Só participantes credenciados"
        : "Todos os confirmados";
  }

  if (elStatus) {
    if (surveyData.isAtivo) {
      elStatus.classList.remove("indisponivel");
      elStatus.innerHTML = '<span class="dot"></span> Disponível';
    } else {
      elStatus.classList.add("indisponivel");
      elStatus.innerHTML = '<span class="dot"></span> Indisponível';
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
    `input[name="data[Pesquisa][enviar_para]"][value="${surveyData.typePublico}"]`
  );
  if (radioToCheck) radioToCheck.checked = true;
}
