import { Negociacao } from "../models/negociacao.js";

export class NegociacaoController {
    constructor() {
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
    }

    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;

    adiciona() {
        const expressaoRegular: RegExp = /-/g;
        const data: Date = new Date(this.inputData.value.replace(expressaoRegular, ","));
        const quantidade: number = parseInt(this.inputQuantidade.value);
        const valor: number = parseFloat(this.inputValor.value);

        const negociacao: Negociacao = new Negociacao(data, quantidade, valor);
        console.log(negociacao);
    }
}