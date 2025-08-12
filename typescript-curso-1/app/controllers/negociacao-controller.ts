import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";

export class NegociacaoController {
    constructor() {
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
    }

    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;

    private negociacoes: Negociacoes = new Negociacoes();
    private listaNegociacoes: ReadonlyArray<Negociacao> = this.negociacoes.negociacoes;
    // private listaNegociacoes: readonly Negociacao[];

    adiciona(): void {
        const negociacaoCriada: Negociacao = this.criaNegociacao();

        this.negociacoes.adicionaNegociacao(negociacaoCriada);
        console.log(this.listaNegociacoes);

        this.limparFormulario();
    }

    criaNegociacao(): Negociacao {
        const expressaoRegular: RegExp = /-/g;
        const data: Date = new Date(this.inputData.value.replace(expressaoRegular, ","));
        const quantidade: number = parseInt(this.inputQuantidade.value);
        const valor: number = parseFloat(this.inputValor.value);

        const negociacao: Negociacao = new Negociacao(data, quantidade, valor);

        return negociacao;
    }

    limparFormulario(): void {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";

        this.inputData.focus();
    }
}