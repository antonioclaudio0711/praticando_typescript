export class Armazenador {
    constructor() { }
    static salvar(chave, valorComoString) {
        localStorage.setItem(chave, valorComoString);
    }
    static obter(chave, reviver) {
        const valorObtido = localStorage.getItem(chave);
        if (valorObtido === null) {
            return null;
        }
        if (reviver) {
            return JSON.parse(valorObtido, reviver);
        }
        return JSON.parse(valorObtido);
    }
}
