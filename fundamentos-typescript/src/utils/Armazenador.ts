export class Armazenador {
    private constructor() {}

    static salvar(chave: string, valorComoString: string): void {
        localStorage.setItem(chave, valorComoString);
    }

    static obter<T>(chave: string, reviver?: (this: any, key: string, value: any) => any): T | null {
        const valorObtido = localStorage.getItem(chave);

        if (valorObtido === null) {
            return null;
        }

        if (reviver) {
            return JSON.parse(valorObtido, reviver) as T;
        }

        
        return JSON.parse(valorObtido) as T;
    }
}