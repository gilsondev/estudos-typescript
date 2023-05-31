import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController();
const form: HTMLElement | null = document.querySelector(".form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  controller.adiciona();
});

const botaoImporta = document.querySelector("#botao-importa");
if (botaoImporta) {
  botaoImporta.addEventListener("click", () => {
    controller.importarDados();
  });
} else {
  throw Error("Botao importa nao foi encontrado");
}
