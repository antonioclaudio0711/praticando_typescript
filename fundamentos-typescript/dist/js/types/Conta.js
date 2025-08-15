var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Armazenador } from "../utils/Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "../utils/Decorators.js";
import { TipoTransacaoEnum } from "./TipoTransacaoEnum.js";
// localStorage.clear();
export class Conta {
    _nome;
    constructor(_nome) {
        this._nome = _nome;
    }
    _saldo = Armazenador.obter("saldo") || 0;
    _transacoes = Armazenador.obter("transacoes", (key, value) => {
        if (key === "dataTransacao") {
            return new Date(value);
        }
        return value;
    }) || [];
    get saldo() {
        return this._saldo;
    }
    get nome() {
        return this._nome;
    }
    retornaDataAcesso() {
        return new Date();
    }
    retornaGruposTransacoes() {
        const gruposTransacoes = [];
        // Clone da lista de transações, evitando que qualquer modificação afete a sua referência
        const listaTransacoes = structuredClone(this._transacoes);
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
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacaoEnum.DEPOSITO) {
            this.depositar(novaTransacao.valorTransacao);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacaoEnum.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacaoEnum.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valorTransacao);
            novaTransacao.valorTransacao *= -1;
        }
        else {
            throw new Error("Tipo de transação inválido!");
        }
        this._transacoes.push(novaTransacao);
        console.log(this.retornaResumoTransacoes());
        Armazenador.salvar("transacoes", JSON.stringify(this._transacoes));
    }
    debitar(valor) {
        this._saldo -= valor;
        Armazenador.salvar("saldo", this._saldo.toString());
    }
    depositar(valor) {
        this._saldo += valor;
        Armazenador.salvar("saldo", this._saldo.toString());
    }
    retornaResumoTransacoes() {
        const resumoTransacoes = {
            totalDeposito: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0,
        };
        this._transacoes.forEach(transacao => {
            let tipoTransacao = transacao.tipoTransacao;
            if (tipoTransacao === TipoTransacaoEnum.DEPOSITO) {
                resumoTransacoes.totalDeposito += transacao.valorTransacao;
            }
            else if (tipoTransacao === TipoTransacaoEnum.TRANSFERENCIA) {
                resumoTransacoes.totalTransferencias += transacao.valorTransacao;
            }
            else {
                resumoTransacoes.totalPagamentosBoleto += transacao.valorTransacao;
            }
        });
        return resumoTransacoes;
    }
}
__decorate([
    ValidaDebito
], Conta.prototype, "debitar", null);
__decorate([
    ValidaDeposito
], Conta.prototype, "depositar", null);
const conta = new Conta("Antônio Claudio Ferreira Filho");
export default conta;
