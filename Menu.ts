import leia from "readline-sync";
import { colors } from "./src/util/Colors";
import { Conta } from "./src/model/Conta"

export function main() {

    let opcao: number

    // Instancoar Objetos da Classe Conta

    const c1 = new Conta(1, 123, "Julio", 1, 100000.00)

    c1.visualizar();

    //Testes do Método Sacar
    console.log("Sacar 100.00: ", c1.sacar(100));
    console.log("Sacar 80000000.00: ", c1.sacar(80000000));
    console.log("Sacar 0.00: ", c1.sacar(0));

    // Testes do Método Depositar
    console.log("Depositar 0.00: ")
    c1.depositar(0)

    console.log("Depositar 100.00: ")
    c1.depositar(500)

    c1.visualizar();




    while (true) {
        console.log(colors.fg.yellow)
        console.log("*********************************************")
        console.log("                                             ")
        console.log("         Banco UltraSecretoDaChina           ")
        console.log("                                             ")
        console.log("*********************************************")
        console.log("                                             ")
        console.log("       1- Criar Conta                        ")
        console.log("       2- Listar Contas                      ")
        console.log("       3- Buscar Conta por Número            ")
        console.log("       4- Atualizar Dados da Conta           ")
        console.log("       5- Apagar Conta                       ")
        console.log("       6- Sacar                              ")
        console.log("       7- Depositar                          ")
        console.log("       8- Transferência entre contas         ")
        console.log("       9- Sair                               ")
        console.log("                                             ")
        console.log("*********************************************")
        console.log(colors.reset)

        opcao = leia.questionInt("Digite a opcao desejada: ")

        if (opcao === 9) {
            console.log(colors.fg.red)
            console.log("\nBanco UltraSecretoDaChina - Ninguém Encontra seu Dinheiro!")
            console.log(colors.reset)
            sobre()
            process.exit(0)
        }

        switch (opcao) {
            case 1:
                console.log("Criar Conta (W.I.P)")
                break
            case 2:
                console.log("Listar Contas (W.I.P)")

                break
            case 3:
                console.log("Buscar conta pelo Número (W.I.P)")

                break
            case 4:
                console.log("Atualizar dados da conta (W.I.P)")

                break
            case 5:
                console.log("Apagar Conta(W.I.P)")

                break
            case 6:
                console.log("Sacar (W.I.P)")

                break
            case 7:
                console.log("Depositar (W.I.P)")

                break
            case 8:
                console.log("Transferência entre contas (W.I.P)")

                break
            default:
                console.log("Opção indisponível")
        }
    }
}

function sobre(): void {
    console.log(colors.fg.cyan)
    console.log("---------------------------------------------------")
    console.log("                                         ")
    console.log("Programa desenvolvido por: Josué Bravo   ")
    console.log("E-mail para contato: josuebc8@gmail.com  ")
    console.log("github.com/Josue-Bravo/ContaBancaria-Generation.git")
    console.log("                                         ")
    console.log("---------------------------------------------------")
    console.log(colors.reset)
}

main()