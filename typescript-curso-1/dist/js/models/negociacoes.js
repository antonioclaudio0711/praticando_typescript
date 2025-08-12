export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    // private _negociacoes: Negociacao[] = [];
    adicionaNegociacao(negociacao) {
        this.negociacoes.push(negociacao);
    }
}
