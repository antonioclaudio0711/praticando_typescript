import { TipoTransacao } from "./TipoTransacao.js";
var saldo = 3500;
export class Conta {
    constructor() { }
    getSaldo() {
        return saldo;
    }
    retornaDataAcesso() {
        return new Date();
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            saldo += novaTransacao.valorTransacao;
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            saldo -= novaTransacao.valorTransacao;
        }
        else {
            alert("Tipo de transação inválida!");
        }
        console.log(novaTransacao);
    }
}
