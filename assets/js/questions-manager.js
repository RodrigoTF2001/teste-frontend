const btnMostrarForm = document.getElementById("btnMostrarForm");
const formAdicionarPergunta = document.getElementById("formAdicionarPergunta");
const containerTabela = document.querySelector(".tabela-perguntas");
const btnCancelarForm = document.getElementById("btnCancelarForm");
const btnSalvarForm = document.getElementById("btnSalvarForm");
const inputTitulo = document.getElementById("tituloPergunta");
const inputObrigatoria = document.getElementById("obrigatoria");

let editingRow = null;

containerTabela.addEventListener("click", function (e) {
  const editLink = e.target.closest('a[href*="editar-pergunta"]');

  if (editLink) {
    e.preventDefault();
    const row = editLink.closest(".tabela-row");
    if (row) {
      const questionText = row.querySelector(".pergunta").textContent.trim();
      startEdit(row, questionText);
    }
    return;
  }

  const trashLink =
    e.target.closest('a[href="#"]') ||
    e.target.closest('img[src*="trash"]')?.parentElement;

  if (trashLink) {
    e.preventDefault();

    const row = trashLink.closest(".tabela-row");
    if (row) {
      row.remove();
      updateCount();
    }
  }
});

function startEdit(row, text) {
  editingRow = row;
  inputTitulo.value = text;
  inputObrigatoria.checked = false;

  formAdicionarPergunta.classList.add("active");
  if (btnMostrarForm) btnMostrarForm.classList.add("hidden");

  btnSalvarForm.textContent = "Salvar Alterações";
}

if (btnMostrarForm) {
  btnMostrarForm.addEventListener("click", function (e) {
    e.preventDefault();
    editingRow = null;
    inputTitulo.value = "";
    inputObrigatoria.checked = false;
    btnSalvarForm.textContent = "Adicionar";

    formAdicionarPergunta.classList.add("active");
    btnMostrarForm.classList.add("hidden");
  });
}

if (btnCancelarForm) {
  btnCancelarForm.addEventListener("click", function (e) {
    e.preventDefault();
    closeForm();
  });
}

// Botão Salvar (Adicionar ou Editar)
if (btnSalvarForm) {
  btnSalvarForm.addEventListener("click", function (e) {
    e.preventDefault();

    const titulo = inputTitulo.value.trim();

    if (!titulo) {
      alert("Por favor, preencha o campo da pergunta");
      return;
    }

    if (editingRow) {
      editingRow.querySelector(".pergunta").textContent = titulo;
    } else {
      addQuestionRow(titulo);
    }

    closeForm();
  });
}

function closeForm() {
  formAdicionarPergunta.classList.remove("active");
  if (btnMostrarForm) btnMostrarForm.classList.remove("hidden");
  inputTitulo.value = "";
  inputObrigatoria.checked = false;
  editingRow = null;
}

function addQuestionRow(text) {
  const div = document.createElement("div");
  div.className = "tabela-row";
  div.innerHTML = `
            <span class="pergunta">${text}</span>
            <span class="acoes">
                <a href="./pages/editar-pergunta.html">
                    <img src="./assets/img/edit.svg" alt="Editar" width="24" height="24" />
                </a>
                <a href="#">
                    <img src="./assets/img/trash.svg" alt="Excluir" width="20" height="20" />
                </a>
            </span>
        `;
  containerTabela.appendChild(div);
  updateCount();
}

function updateCount() {
  const rows = containerTabela.querySelectorAll(".tabela-row");
  const headerSpan = containerTabela.querySelector(".tabela-header span");
  if (headerSpan) {
    headerSpan.textContent = `Perguntas (${rows.length})`;
  }
}
