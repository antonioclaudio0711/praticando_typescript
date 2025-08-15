import conta from "../types/Conta.js";
import { FormatoDataEnum } from "../types/FormatoDataEnum.js";
import { Formatters } from "../utils/Formatters.js";
const formatador = new Formatters();
const elementoSaldo = document.querySelector(".cc .valor");
const elementoData = document.querySelector(".block-saldo time");
renderizarSaldo();
if (elementoData != null) {
    elementoData.textContent = formatador.formatarData(conta.retornaDataAcesso(), FormatoDataEnum.FORMATO_DIA_SEMANA_DIA_MES_ANO);
}
function renderizarSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatador.formatarSaldo(conta.saldo);
    }
}
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
};
export default SaldoComponent;
