import { Conta } from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";

const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

elementoFormulario.addEventListener("submit", function (event) {
    try {
        event.preventDefault();

        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }

        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
        const inputValorTransacao = elementoFormulario.querySelector("#valor") as HTMLInputElement;
        const inputDataTransacao = elementoFormulario.querySelector("#data") as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let valorTransacao: number = inputValorTransacao.valueAsNumber;

        // Adição de " 00:00:00" para o JS não considerar um dia a menos na determinação das datas
        let dataTransacao: Date = new Date(inputDataTransacao.value + " 00:00:00");

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valorTransacao: valorTransacao,
            dataTransacao: dataTransacao
        }

        const conta: Conta = new Conta();
        conta.registrarTransacao(novaTransacao);

        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();

        elementoFormulario.reset();
    } catch (erro) {
        alert(erro.message);
    }
});