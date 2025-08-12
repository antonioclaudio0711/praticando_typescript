import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.listaNegociacoes = this.negociacoes.negociacoes;
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
    }
    // private listaNegociacoes: readonly Negociacao[];
    adiciona() {
        const negociacaoCriada = this.criaNegociacao();
        this.negociacoes.adicionaNegociacao(negociacaoCriada);
        console.log(this.listaNegociacoes);
        this.limparFormulario();
    }
    criaNegociacao() {
        const expressaoRegular = /-/g;
        const data = new Date(this.inputData.value.replace(expressaoRegular, ","));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        const negociacao = new Negociacao(data, quantidade, valor);
        return negociacao;
    }
    limparFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
}
