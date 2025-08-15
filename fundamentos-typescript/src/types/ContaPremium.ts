import { Conta } from "./Conta.js";
import { TipoTransacaoEnum } from "./TipoTransacaoEnum.js";
import { TransacaoType } from "./TransacaoType.js";

export class ContaPremium extends Conta{
    public constructor(protected _nome: string) {
        super(_nome);
    }

    get nome(): string {
        return this._nome;
    }

    public registrarTransacao(transacao: TransacaoType): void {
        if (transacao.tipoTransacao === TipoTransacaoEnum.DEPOSITO) {
            console.log("Ganhou um bônus de R$ 0.50 centavos!");
            transacao.valorTransacao += 0.5;
        }

        super.registrarTransacao(transacao);
    }
}

const contaPremium: ContaPremium = new ContaPremium("Ana Clara de Bessa Ferreira");
export default contaPremium;