import { Conta } from "./Conta.js";
import { TipoTransacaoEnum } from "./TipoTransacaoEnum.js";
export class ContaPremium extends Conta {
    _nome;
    constructor(_nome) {
        super(_nome);
        this._nome = _nome;
    }
    get nome() {
        return this._nome;
    }
    registrarTransacao(transacao) {
        if (transacao.tipoTransacao === TipoTransacaoEnum.DEPOSITO) {
            console.log("Ganhou um bônus de R$ 0.50 centavos!");
            transacao.valorTransacao += 0.5;
        }
        super.registrarTransacao(transacao);
    }
}
const contaPremium = new ContaPremium("Ana Clara de Bessa Ferreira");
export default contaPremium;
