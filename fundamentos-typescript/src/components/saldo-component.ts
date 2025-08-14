import { Conta } from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { Formatters } from "../utils/Formatters.js";

const formatador: Formatters = new Formatters();
const conta: Conta = new Conta();

const elementoSaldo: HTMLElement = document.querySelector(".cc .valor") as HTMLElement;
const elementoData: HTMLTimeElement = document.querySelector(".block-saldo time") as HTMLTimeElement;

renderizarSaldo();

if (elementoData != null) {
    elementoData.textContent = formatador.formatarData(conta.retornaDataAcesso(), FormatoData.FORMATO_DIA_SEMANA_DIA_MES_ANO);
}

function renderizarSaldo(): void {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatador.formatarSaldo(conta.getSaldo());
    }
}

const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
}
export default SaldoComponent;
