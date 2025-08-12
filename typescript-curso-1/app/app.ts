import { NegociacaoController } from "./controllers/negociacao-controller.js";

const negociacaoController = new NegociacaoController();

const formulario = document.querySelector(".form");

formulario.addEventListener("submit", (event: Event) => {
        event.preventDefault();
        negociacaoController.adiciona();
    }
)