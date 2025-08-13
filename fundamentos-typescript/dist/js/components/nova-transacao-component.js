import { Conta } from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação!");
        return;
    }
    const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
    const inputValorTransacao = elementoFormulario.querySelector("#valor");
    const inputDataTransacao = elementoFormulario.querySelector("#data");
    let tipoTransacao = inputTipoTransacao.value;
    let valorTransacao = inputValorTransacao.valueAsNumber;
    let dataTransacao = new Date(inputDataTransacao.value);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valorTransacao: valorTransacao,
        dataTransacao: dataTransacao
    };
    const conta = new Conta();
    conta.registrarTransacao(novaTransacao);
    SaldoComponent.atualizar();
    elementoFormulario.reset();
});
