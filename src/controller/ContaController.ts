import { Conta } from "../model/Conta";
import { ContaCorrente } from "../model/ContaCorrente";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";
import { formatarMoeda } from "../util/Currency";
import { Input } from "../util/Input";

export class ContaController implements ContaRepository {

    private listaContas = new Array<Conta>();

    public numero: number = 0;


    // Métodos do CRUD
    procurarPorNumero(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            buscaConta.visualizar();
        } else {
            console.log(colors.fg.red)
            console.log("\nConta não encontrada!")
            console.log(colors.reset)
        }

    }

    procurarPorTitular(titular: string): void {
        const buscaPorTitular = this.listaContas.filter(conta => 
            conta.titular.toUpperCase().includes(titular.toUpperCase())
        );

        // Listagem dos dados filtrados
        if (buscaPorTitular.length > 0){
            buscaPorTitular.forEach( conta => conta.visualizar());
        }else{
            console.log(colors.fg.red)
            console.log("\nNenhuma Conta encontrada!")
            console.log(colors.reset)
        }
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        }
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green)
        console.log(`\nA Conta número ${conta.numero} foi cadastrada com sucesso!`)
        console.log(colors.reset)
    }

    atualizar(conta: Conta): void {
        const buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta != null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta
            console.log(colors.fg.green)
            console.log(`\nA Conta número ${conta.numero} foi Atualizada com Sucesso`)
            console.log(colors.reset)
        } else {
            console.log(colors.fg.red)
            console.log("\nConta não encontrada!")
            console.log(colors.reset)
        }
    }

    deletar(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            console.log("Tem certeza que quer apagar esta conta?")
            console.log(colors.fg.red, "\nA CONTA SERÁ PERMANENTEMENTE APAGADA.", colors.reset)
            console.log("\nDigite 'CONFIRMAR' para confirmar:")
            const confirmar = Input.question("")

            if (confirmar.toUpperCase() === "CONFIRMAR") {
                this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1)
                console.log(colors.fg.green)
                console.log(`A conta número ${numero} foi deletada com sucesso!`)
                console.log(colors.reset)
            } else {
                console.log("Confirmação negada. A conta não foi apagada.")

            }
        } else {
            console.log(colors.fg.red)
            console.log("\nConta não encontrada!")
            console.log(colors.reset)
        }
    }

    // Métodos Bancários
    sacar(numero: number, valor: number): void {
        const buscaConta = this.buscarNoArray(numero)


        if (buscaConta != null) {
            if (buscaConta.sacar(valor) === true) {
                console.log(colors.fg.green)
                console.log(`O Saque no valor de ${formatarMoeda(valor)} na Conta Número ${numero} foi realizado com sucesso!`)
                console.log(colors.reset)
            } else {
                console.log(colors.fg.red)
                console.log("\nConta não encontrada!")
                console.log(colors.reset)
            }
        }
    }

    depositar(numero: number, valor: number): void {
        const buscaConta = this.buscarNoArray(numero)


        if (buscaConta != null) {
            buscaConta.depositar(valor)
                console.log(colors.fg.green)
                console.log(`O Depósito no valor de ${formatarMoeda(valor)} na Conta Número ${numero} foi realizado com sucesso!`)
                console.log(colors.reset)
            } else {
                console.log(colors.fg.red)
                console.log("\nConta não encontrada!")
                console.log(colors.reset)
            }
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        const buscaContaOrigem = this.buscarNoArray(numeroOrigem)
        const buscaContaDestido = this.buscarNoArray(numeroDestino)


        if (buscaContaOrigem != null && buscaContaDestido !== null) {
            if (buscaContaOrigem.sacar(valor) === true) {
                buscaContaDestido.depositar(valor);
                console.log(colors.fg.green)
                console.log(`A Transferência no valor de ${formatarMoeda(valor)} da Conta número ${numeroOrigem} para a Conta número ${numeroDestino} foi realizado com sucesso!`)
                console.log(colors.reset)
            } else {
                console.log(colors.fg.red)
                console.log("\nConta de origem e/ou destino não foram encontradas.")
                console.log(colors.reset)
            }
        }
    }

    // Métodos Auxiliares

    public gerarNumero(): number {
        return ++this.numero
    }

    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero === numero)
                return conta
        }

        return null;
    }
}