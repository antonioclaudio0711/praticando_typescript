import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    constructor() {}

    public readonly negociacoes: Array<Negociacao> = [];
    // private _negociacoes: Negociacao[] = [];

    adicionaNegociacao(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }
}