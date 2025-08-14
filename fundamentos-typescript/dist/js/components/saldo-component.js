import { Conta } from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { Formatters } from "../utils/Formatters.js";
const formatador = new Formatters();
const conta = new Conta();
const elementoSaldo = document.querySelector(".cc .valor");
const elementoData = document.querySelector(".block-saldo time");
renderizarSaldo();
if (elementoData != null) {
    elementoData.textContent = formatador.formatarData(conta.retornaDataAcesso(), FormatoData.FORMATO_DIA_SEMANA_DIA_MES_ANO);
}
function renderizarSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatador.formatarSaldo(conta.getSaldo());
    }
}
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
};
export default SaldoComponent;
