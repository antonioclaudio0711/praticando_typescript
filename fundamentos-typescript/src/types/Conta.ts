import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

var saldo: number = 3500;

export class Conta {
    constructor() {}

    getSaldo(): number {
        return saldo;
    }

    retornaDataAcesso(): Date {
        return new Date();
    }

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            saldo += novaTransacao.valorTransacao;
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            saldo -= novaTransacao.valorTransacao;
        } else {
            alert("Tipo de transação inválida!");
        }

        console.log(novaTransacao);
    }
}