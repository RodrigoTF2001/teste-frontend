const btnMostrarForm = document.getElementById("btnMostrarForm");
const formAdicionarPergunta = document.getElementById("formAdicionarPergunta");
const btnCancelarForm = document.getElementById("btnCancelarForm");
const btnSalvarForm = document.getElementById("btnSalvarForm");

if (btnMostrarForm && formAdicionarPergunta) {
  btnMostrarForm.addEventListener("click", function (e) {
    e.preventDefault();
    formAdicionarPergunta.classList.add("active");
    btnMostrarForm.classList.add("hidden");
  });

  btnCancelarForm.addEventListener("click", function () {
    formAdicionarPergunta.classList.remove("active");
    btnMostrarForm.classList.remove("hidden");
    limparFormulario();
  });

  btnSalvarForm.addEventListener("click", function () {
    const titulo = document.getElementById("tituloPergunta").value;
    const obrigatoria = document.getElementById("obrigatoria").checked;

    if (!titulo.trim()) {
      alert("Por favor, preencha o campo da pergunta");
      return;
    }

    console.log("Pergunta salva:", { titulo, obrigatoria });

    formAdicionarPergunta.classList.remove("active");
    btnMostrarForm.classList.remove("hidden");
    limparFormulario();
  });
}

function limparFormulario() {
  document.getElementById("tituloPergunta").value = "";
  document.getElementById("obrigatoria").checked = false;
}
