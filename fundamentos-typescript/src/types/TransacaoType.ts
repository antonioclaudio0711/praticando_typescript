import { TipoTransacaoEnum } from "./TipoTransacaoEnum.js";

export type TransacaoType = {
    tipoTransacao: TipoTransacaoEnum,
    valorTransacao: number,
    dataTransacao: Date,
}
