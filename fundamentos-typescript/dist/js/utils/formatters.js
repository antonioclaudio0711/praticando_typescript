import { FormatoData } from "../types/FormatoData.js";
export class Formatters {
    constructor() { }
    formatarSaldo(saldo) {
        let saldoRealBRConvertido = saldo.toLocaleString("pt-br", {
            currency: "BRL",
            style: "currency",
        });
        return saldoRealBRConvertido;
    }
    formatarData(data, formatoData = FormatoData.FORMATO_PADRAO) {
        let dataConvertida = "";
        if (formatoData === FormatoData.FORMATO_DIA_SEMANA_DIA_MES_ANO) {
            dataConvertida = data.toLocaleDateString("pt-br", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        }
        else if (formatoData === FormatoData.FORMATO_DIA_MES) {
            dataConvertida = data.toLocaleDateString("pt-br", {
                day: "2-digit",
                month: "2-digit",
            });
        }
        else {
            dataConvertida = data.toLocaleDateString("pt-br", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        }
        return dataConvertida;
    }
}
