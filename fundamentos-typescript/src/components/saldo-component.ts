import conta from "../types/Conta.js";
import { FormatoDataEnum } from "../types/FormatoDataEnum.js";
import { Formatters } from "../utils/Formatters.js";

const formatador: Formatters = new Formatters();

const elementoSaldo: HTMLElement = document.querySelector(".cc .valor") as HTMLElement;
const elementoData: HTMLTimeElement = document.querySelector(".block-saldo time") as HTMLTimeElement;

renderizarSaldo();

if (elementoData != null) {
    elementoData.textContent = formatador.formatarData(conta.retornaDataAcesso(), FormatoDataEnum.FORMATO_DIA_SEMANA_DIA_MES_ANO);
}

function renderizarSaldo(): void {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatador.formatarSaldo(conta.saldo);
    }
}

const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
}
export default SaldoComponent;
