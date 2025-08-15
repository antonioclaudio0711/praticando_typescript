import conta from "../types/Conta.js";
import { TipoTransacaoEnum } from "../types/TipoTransacaoEnum.js";
import { TransacaoType } from "../types/TransacaoType.js";
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

        let tipoTransacao: TipoTransacaoEnum = inputTipoTransacao.value as TipoTransacaoEnum;
        let valorTransacao: number = inputValorTransacao.valueAsNumber;

        // Adição de " 00:00:00" para o JS não considerar um dia a menos na determinação das datas
        let dataTransacao: Date = new Date(inputDataTransacao.value + " 00:00:00");

        const novaTransacao: TransacaoType = {
            tipoTransacao: tipoTransacao,
            valorTransacao: valorTransacao,
            dataTransacao: dataTransacao
        }

        conta.registrarTransacao(novaTransacao);

        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();

        elementoFormulario.reset();
    } catch (erro) {
        alert(erro.message);
    }
});