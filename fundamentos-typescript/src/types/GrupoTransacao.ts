import { Transacao } from "./Transacao.js"

export type GrupoTransacao = {
    label: String,
    transacoes: Transacao[],
}