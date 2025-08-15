import { Armazenador } from "../utils/Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "../utils/Decorators.js";
import { GrupoTransacaoType } from "./GrupoTransacaoType.js";
import { ResumoTransacoesType } from "./ResumoTransacoesType.js";
import { TipoTransacaoEnum } from "./TipoTransacaoEnum.js";
import { TransacaoType } from "./TransacaoType.js";

// localStorage.clear();

export class Conta {
    public constructor(protected _nome: string) { }

    protected _saldo: number = Armazenador.obter<number>("saldo") || 0;
    private _transacoes: TransacaoType[] = Armazenador.obter<TransacaoType[]>("transacoes", (key: string, value: any) => {
        if (key === "dataTransacao") {
            return new Date(value);
        }

        return value;
    }) || [];

    public get saldo(): number {
        return this._saldo;
    }

    public get nome(): string {
        return this._nome;
    }

    public retornaDataAcesso(): Date {
        return new Date();
    }

    public retornaGruposTransacoes(): GrupoTransacaoType[] {
        const gruposTransacoes: GrupoTransacaoType[] = [];

        // Clone da lista de transações, evitando que qualquer modificação afete a sua referência
        const listaTransacoes: TransacaoType[] = structuredClone(this._transacoes);

        const transacoesOrdenadas: TransacaoType[] = listaTransacoes.sort((t1, t2) => t2.dataTransacao.getTime() - t1.dataTransacao.getTime());

        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.dataTransacao.toLocaleDateString("pt-br", {
                month: "long",
                year: "numeric",
            });

            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;

                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: [],
                })
            }

            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

        return gruposTransacoes;
    }

    public registrarTransacao(novaTransacao: TransacaoType): void {
        if (novaTransacao.tipoTransacao == TipoTransacaoEnum.DEPOSITO) {
            this.depositar(novaTransacao.valorTransacao);
        } else if (novaTransacao.tipoTransacao == TipoTransacaoEnum.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacaoEnum.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valorTransacao);
            novaTransacao.valorTransacao *= -1;
        } else {
            throw new Error("Tipo de transação inválido!");
        }

        this._transacoes.push(novaTransacao);
        console.log(this.retornaResumoTransacoes());
        Armazenador.salvar("transacoes", JSON.stringify(this._transacoes));
    }

    @ValidaDebito
    private debitar(valor: number) {
        this._saldo -= valor;
        Armazenador.salvar("saldo", this._saldo.toString());
    }


    @ValidaDeposito
    private depositar(valor: number) {
        this._saldo += valor;
        Armazenador.salvar("saldo", this._saldo.toString());
    }

    private retornaResumoTransacoes(): ResumoTransacoesType {
        const resumoTransacoes: ResumoTransacoesType = {
            totalDeposito: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0,
        };

        this._transacoes.forEach(transacao => {
            let tipoTransacao: TipoTransacaoEnum = transacao.tipoTransacao;

            if (tipoTransacao === TipoTransacaoEnum.DEPOSITO) {
                resumoTransacoes.totalDeposito += transacao.valorTransacao;
            } else if (tipoTransacao === TipoTransacaoEnum.TRANSFERENCIA) {
                resumoTransacoes.totalTransferencias += transacao.valorTransacao;
            } else {
                resumoTransacoes.totalPagamentosBoleto += transacao.valorTransacao;
            }
        });

        return resumoTransacoes;
    }
}

const conta: Conta = new Conta("Antônio Claudio Ferreira Filho");
export default conta;
