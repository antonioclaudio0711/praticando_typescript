import { FormatoData } from "../types/FormatoData.js";

export class Formatters {
    constructor() { }

    formatarSaldo(saldo: number): string {
        let saldoRealBRConvertido: string = saldo.toLocaleString("pt-br", {
            currency: "BRL",
            style: "currency",
        })

        return saldoRealBRConvertido;
    }

    formatarData(data: Date, formatoData: FormatoData = FormatoData.FORMATO_PADRAO): string {
        let dataConvertida: string = "";

        if (formatoData === FormatoData.FORMATO_DIA_SEMANA_DIA_MES_ANO) {
            dataConvertida = data.toLocaleDateString("pt-br", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        } else if (formatoData === FormatoData.FORMATO_DIA_MES) {
            dataConvertida = data.toLocaleDateString("pt-br", {
                day: "2-digit",
                month: "2-digit",
            });
        } else {
            dataConvertida = data.toLocaleDateString("pt-br", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        }

        return dataConvertida;
    }
}