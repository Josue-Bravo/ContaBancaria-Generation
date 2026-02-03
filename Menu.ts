import leia from "readline-sync";
import { colors } from "./src/util/colors";

let continuar:boolean = true
let opcao:number

while(continuar){
    console.log(colors.fg.yellow)
    console.log("*********************************************")
    console.log("                                             ")
    console.log("         Banco UltraSecretoDaChina           ")
    console.log("                                             ")
    console.log("*********************************************")
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

    if (opcao === 9){
        console.log("\nBanco UltraSecretoDaChina - Ninguém Encontra seu Dinheiro!")
        sobre()
        process.exit(0)
    }

    switch(opcao){
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

function sobre():void{
    console.log(colors.fg.cyan)
    console.log("---------------------------------------------------")
    console.log("                                         ")
    console.log("Programa desenvolvido por: Josué Bravo   ")
    console.log("E-mail para contato: josuébc8@gmail.com  ")
    console.log("github.com/Josue-Bravo/ContaBancaria-Generation.git")
    console.log("                                         ")
    console.log("---------------------------------------------------")
    console.log(colors.reset)
}