import { colors } from "../util/Colors";
import { Conta } from "./Conta";

export class ContaCorrente extends Conta {

    // Atributos Específicos de Conta Corrente
    private _limite: number;


    constructor(
        numero: number,
        agencia: number,
        titular: string,
        tipo: number,
        saldo: number,
        limite: number) {
        super(numero, agencia, titular, tipo, saldo)
        this._limite = limite;
    }

    // Métodos Get e Set específicos da classe ContaCorrente
    public get limite(): number {
        return this._limite;
    }

    public set limite(value: number) {
        this._limite = value;
    }

    public sacar(valor: number): boolean {

        if (valor > this.saldo + this._limite) {
            console.log(
                colors.fg.red,
                "Saldo insuficiente!",
                colors.reset);
            return false
        }

        if (valor <= 0) {
            console.log(colors.fg.red, "O valor deve ser Positivo!", colors.reset);
            return false
        }

        this.saldo -= valor;
        return true;
    }
    //Método visualizar sobrescrito (Polimorfismo)
    public visualizar(): void {
        super.visualizar();
        console.log(`Limite da Conta: R$ ${this._limite.toFixed(2)}`)
    }
}
    

