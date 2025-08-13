import { TipoTransacao } from "./TipoTransacao.js";

export type Transacao = {
    tipoTransacao: TipoTransacao,
    valorTransacao: number,
    dataTransacao: Date,
}
