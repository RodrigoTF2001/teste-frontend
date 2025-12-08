function applyMaskDate(input) {
  let valor = input.value.replace(/\D/g, "");
  if (valor.length > 2) {
    valor = valor.substring(0, 2) + "/" + valor.substring(2);
  }
  if (valor.length > 5) {
    valor = valor.substring(0, 5) + "/" + valor.substring(5, 9);
  }

  input.value = valor.substring(0, 10);
}

document.addEventListener("DOMContentLoaded", () => {
  const dataInicioInput = document.getElementById("PesquisaDataDisponivel");
  const dataTerminoInput = document.getElementById("PesquisaDataTermino");

  if (dataInicioInput) {
    dataInicioInput.addEventListener("input", function () {
      applyMaskDate(this);
    });
  }

  if (dataTerminoInput) {
    dataTerminoInput.addEventListener("input", function () {
      applyMaskDate(this);
    });
  }
});
