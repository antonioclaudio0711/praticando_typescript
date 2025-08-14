import { Conta } from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    try {
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
        // Adição de " 00:00:00" para o JS não considerar um dia a menos na determinação das datas
        let dataTransacao = new Date(inputDataTransacao.value + " 00:00:00");
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valorTransacao: valorTransacao,
            dataTransacao: dataTransacao
        };
        const conta = new Conta();
        conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
