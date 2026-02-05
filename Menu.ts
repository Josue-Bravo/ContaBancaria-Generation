import { colors } from "./src/util/Colors";
import { Input } from "./src/util/Input";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";

export function main() {

    let opcao: number

    const cc1 = new ContaCorrente(2,5678,"Bianca",1,200000,2000)

    cc1.agencia = 1234
    
    cc1.visualizar();

    console.log(cc1.sacar(1000))
    console.log(cc1.sacar(200000))

    cc1.visualizar()

    const cp1 = new ContaPoupanca(2,4541,"Hugo",2,10000,23)

    cp1.visualizar()


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

        console.log("Digite a opção desejada: ");
        opcao = Input.questionInt("");

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
                
                KeyPress()
                break
            case 2:
                console.log("Listar Contas (W.I.P)")

                KeyPress()
                break
            case 3:
                console.log("Buscar conta pelo Número (W.I.P)")

                KeyPress()
                break
            case 4:
                console.log("Atualizar dados da conta (W.I.P)")

                KeyPress()
                break
            case 5:
                console.log("Apagar Conta(W.I.P)")

                KeyPress()
                break
            case 6:
                console.log("Sacar (W.I.P)")

                KeyPress()
                break
            case 7:
                console.log("Depositar (W.I.P)")

                KeyPress()
                break
            case 8:
                console.log("Transferência entre contas (W.I.P)")

                KeyPress()
                break
            default:
                console.log("Opção indisponível")
                KeyPress()
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

function KeyPress(): void{
    console.log("\nPressione Enter para continuar...")
    Input.prompt()
}

main()