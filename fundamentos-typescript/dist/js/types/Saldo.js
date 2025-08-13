import { Formatters } from "../utils/formatters.js";
export class Saldo {
    constructor() {
        this.formatador = new Formatters();
    }
    formatador;
    renderizarSaldo(elementoSaldo, novoSaldo) {
        if (elementoSaldo != null) {
            elementoSaldo.textContent = this.formatador.formatarSaldo(novoSaldo);
        }
    }
}
