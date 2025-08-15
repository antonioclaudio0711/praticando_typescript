import { TransacaoType } from "./TransacaoType.js"

export type GrupoTransacaoType = {
    label: String,
    transacoes: TransacaoType[],
}