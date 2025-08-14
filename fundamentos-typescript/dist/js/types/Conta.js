import { TipoTransacao } from "./TipoTransacao.js";
// localStorage.clear();
var saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
    if (key === "dataTransacao") {
        return new Date(value);
    }
    else {
        return value;
    }
}) || [];
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
            this.depositar(novaTransacao.valorTransacao);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valorTransacao);
            novaTransacao.valorTransacao *= -1;
        }
        else {
            throw new Error("Tipo de transação inválido!");
        }
        transacoes.push(novaTransacao);
        console.log(this.retornaResumoTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        else {
            if (valor > saldo) {
                throw new Error("O valor a ser debitado é maior que o saldo disponível!");
            }
            else {
                saldo -= valor;
            }
        }
        localStorage.setItem("saldo", saldo.toString());
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
        else {
            saldo += valor;
        }
        localStorage.setItem("saldo", saldo.toString());
    }
    retornaGruposTransacoes() {
        const gruposTransacoes = [];
        // Clone da lista de transações, evitando que qualquer modificação afete a sua referência
        const listaTransacoes = structuredClone(transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.dataTransacao.getTime() - t1.dataTransacao.getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.dataTransacao.toLocaleDateString("pt-br", {
                month: "long",
                year: "numeric",
            });
            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: [],
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    }
    retornaResumoTransacoes() {
        const resumoTransacoes = {
            totalDeposito: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0,
        };
        transacoes.forEach(transacao => {
            let tipoTransacao = transacao.tipoTransacao;
            if (tipoTransacao === TipoTransacao.DEPOSITO) {
                resumoTransacoes.totalDeposito += transacao.valorTransacao;
            }
            else if (tipoTransacao === TipoTransacao.TRANSFERENCIA) {
                resumoTransacoes.totalTransferencias += transacao.valorTransacao;
            }
            else {
                resumoTransacoes.totalPagamentosBoleto += transacao.valorTransacao;
            }
        });
        return resumoTransacoes;
    }
}
