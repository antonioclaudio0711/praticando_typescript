import { Conta } from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { Formatters } from "../utils/Formatters.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();
function renderizarExtrato(): void {
    const conta: Conta = new Conta();
    const formatador: Formatters = new Formatters();

    const gruposTransacoes: Array<GrupoTransacao> = conta.retornaGruposTransacoes();

    elementoRegistroTransacoesExtrato.innerHTML = "";

    let htmlRegistroTransacoes: string = "";

    for (let grupoTransacao of gruposTransacoes) {
        let htmlTransacaoItem: string = "";
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor">${formatador.formatarSaldo(transacao.valorTransacao)}</strong>
                    </div>
                    <time class="data">${formatador.formatarData(transacao.dataTransacao, FormatoData.FORMATO_DIA_MES)}</time>
                </div>
            `;
        }

        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlTransacaoItem}
            </div>
        `;
    }

    if (htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = "<div>Não há transações registradas!</div>"
    }

    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
}

export default ExtratoComponent;