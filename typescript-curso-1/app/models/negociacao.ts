export class Negociacao {
    constructor(data: Date, quantidade: number, valor: number) {
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    };

    private _data: Date;
    private _quantidade: number;
    private _valor: number;

    get data(): Date {
        return this._data;
    }

    get quantidade(): number {
        return this._quantidade;
    }

    get valor(): number {
        return this._valor;
    }

    get volume(): number {
        let volume: number = this._quantidade * this._valor;
        return volume;
    }
}