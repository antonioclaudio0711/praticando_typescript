import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

// localStorage.clear();
var saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
    if (key === "dataTransacao") {
        return new Date(value);
    } else {
        return value;
    }
}) || [];

export class Conta {
    constructor() { }

    getSaldo(): number {
        return saldo;
    }

    retornaDataAcesso(): Date {
        return new Date();
    }

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valorTransacao);
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valorTransacao);
            novaTransacao.valorTransacao *= -1;
        } else {
            throw new Error("Tipo de transação inválido!");
        }

        transacoes.push(novaTransacao);
        console.log(this.retornaResumoTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }

    debitar(valor: number) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        } else {
            if (valor > saldo) {
                throw new Error("O valor a ser debitado é maior que o saldo disponível!");
            } else {
                saldo -= valor;
            }
        }

        localStorage.setItem("saldo", saldo.toString());
    }

    depositar(valor: number) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        } else {
            saldo += valor;
        }

        localStorage.setItem("saldo", saldo.toString());
    }

    retornaGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];

        // Clone da lista de transações, evitando que qualquer modificação afete a sua referência
        const listaTransacoes: Transacao[] = structuredClone(transacoes);

        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.dataTransacao.getTime() - t1.dataTransacao.getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.dataTransacao.toLocaleDateString("pt-br", {
                month: "long",
                year: "numeric",
            });

            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;

                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: [],
                })
            }

            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

        return gruposTransacoes;
    }

    retornaResumoTransacoes(): ResumoTransacoes {
        const resumoTransacoes: ResumoTransacoes = {
            totalDeposito: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0,
        };

        transacoes.forEach(transacao => {
            let tipoTransacao: TipoTransacao = transacao.tipoTransacao;

            if (tipoTransacao === TipoTransacao.DEPOSITO) {
                resumoTransacoes.totalDeposito += transacao.valorTransacao;
            } else if (tipoTransacao === TipoTransacao.TRANSFERENCIA) {
                resumoTransacoes.totalTransferencias += transacao.valorTransacao;
            } else {
                resumoTransacoes.totalPagamentosBoleto += transacao.valorTransacao;
            }
        });

        return resumoTransacoes;
    }
}