import { colors } from "./src/util/Colors";
import { Input } from "./src/util/Input";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";
import { Conta } from "./src/model/Conta";
import { formatarMoeda } from "./src/util/Currency";

// Criar um Objeto Global da Classe ContaController
const contas = new ContaController();

// Criar um array contendo os tipos de conta 
const tipoContas = ['Conta Corrente', 'Conta Poupanca'];

export function main() {

    let opcao: number

    criarContasTeste();

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
        console.log("       4- Buscar Conta por Titular           ")
        console.log("       5- Atualizar Dados da Conta           ")
        console.log("       6- Apagar Conta                       ")
        console.log("       7- Sacar                              ")
        console.log("       8- Depositar                          ")
        console.log("       9- Transferência entre contas         ")
        console.log("       0- Sair                               ")
        console.log("                                             ")
        console.log("*********************************************")
        console.log(colors.reset)

        console.log("Digite a opção desejada: ");
        opcao = Input.questionInt("");

        if (opcao === 0) {
            console.log(colors.fg.red)
            console.log("\nBanco UltraSecretoDaChina - Ninguém Encontra seu Dinheiro!")
            console.log(colors.reset)
            sobre()
            process.exit(0)
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, "Criar Conta", colors.reset)
                criarConta()
                KeyPress()
                break
            case 2:
                console.log(colors.fg.whitestrong, "Listar Contas", colors.reset)
                contas.listarTodas()
                KeyPress()
                break
            case 3:
                console.log(colors.fg.whitestrong, "Buscar conta pelo Número", colors.reset)
                busacrContaPorNumero()
                KeyPress()
                break
            case 4:
                console.log(colors.fg.whitestrong, "Buscar conta pelo nome do Titular", colors.reset)
                procurarPorTitular()
                KeyPress()
                break
            case 5:
                console.log(colors.fg.whitestrong, "Atualizar dados da conta", colors.reset)
                atualizarConta()
                KeyPress()
                break
            case 6:
                console.log(colors.fg.whitestrong, "Apagar Conta", colors.reset)
                deletarContaPorNumero()
                KeyPress()
                break
            case 7:
                console.log(colors.fg.whitestrong, "Sacar", colors.reset)
                sacar()
                KeyPress()
                break
            case 8:
                console.log(colors.fg.whitestrong, "Depositar", colors.reset)
                depositar()
                KeyPress()
                break
            case 9:
                console.log(colors.fg.whitestrong, "Transferência entre contas", colors.reset)
                transferir()
                break
            default:
                console.log(colors.fg.red, "Opção indisponível", colors.reset)
                KeyPress()
        }
    }
}


// Opção 1: Criar uma nova Conta

function criarConta() {

    console.log("Digite o número da agência")
    const agencia = Input.questionInt("")

    console.log("Digite o nome do titular")
    const titular = Input.question("")

    console.log("Selecione o tipo da conta: ")
    const tipo = Input.keyInSelect(tipoContas, "", { cancel: false }) + 1

    console.log("Digite o saldo da conta")
    const saldo = Input.questionFloat("")

    switch (tipo) {
        case 1: // Conta Corrente
            console.log("Digite o limite da conta: ")
            const limite = Input.questionFloat("")
            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, titular, tipo, saldo, limite));
            break
        case 2: // Conta Poupança
            console.log("Digite o dia do aniversário da conta")
            const aniversario = Input.questionInt("")
            contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, titular, tipo, saldo, aniversario));
            break
    }


}

// Opção 3: Procurar por número
function busacrContaPorNumero(): void {
    console.log("Digite o número da conta: ")
    const numero = Input.questionInt("");

    contas.procurarPorNumero(numero)
}


// Opção 4: Procurar por Titular
function procurarPorTitular(): void{
    console.log("Digite o Nome do Titular: ")
    const titular = Input.question("");

    contas.procurarPorTitular(titular)
}

// Opção 5: Atualizar uma Conta
function atualizarConta(): void {

    // Solicita o número da conta
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    // Verifica se a conta existe
    const conta = contas.buscarNoArray(numero);

    // Se a conta existir...
    if (conta !== null) {

        /**
         * Guarda os valores atuais da conta em variáveis
         * Exceto tipo que não será aramazenado em uma constante
         * porque não terá o seu valor modificado
         */
        let agencia: number = conta.agencia;
        let titular: string = conta.titular;
        const tipo: number = conta.tipo;
        let saldo: number = conta.saldo;

        /**
         * Atualização da Agência
         * 
         * 1. Exibe o valor atual da agência
         * 2. Se pressionar ENTER o valor atual será mantido
         * 3. Para o ENTER funcionar, passamos o parâmetro
         *    default input, que indica o valor padrão (solução mais simples)
         * 4. Caso contrário o valor atual será substituído
         * 5. Como estamos usando o  método questionInt, 
         *    a validação dos dados está garantida
         * 
         * Os demais atributos seguirão a mesma lógica, alterando
         * apenas a função de input, de acordo com o tipo.
         */
        console.log(`\nAgência atual: ${agencia}`);
        console.log("Digite o novo número da agência: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        agencia = Input.questionInt("", { defaultInput: agencia });

        // Atualização da Titular
        console.log(`\nTitular atual: ${titular}`);
        console.log("Digite o novo nome do titular: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        titular = Input.question("", { defaultInput: titular });

        // Atualização do Saldo
        console.log(`\nSaldo atual: ${formatarMoeda(saldo)}`);
        console.log("Digite o valor do novo saldo: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        saldo = Input.questionFloat("", { defaultInput: saldo });

        // Atualização do Tipo
        switch (tipo) {
            case 1: // Conta Corrente

                /**
                 * Como o objeto 'conta' é do tipo genérico Conta, 
                 * precisamos converter o objeto (casting) para o tipo 
                 * ContaCorrente.
                 * Isso é necessário porque apenas a classe ContaCorrente 
                 * possui o atributo 'limite'.
                 * Após o casting, conseguimos acessar o atributo limite.
                 * O mesmo será feito com o atributo aniversario da classe
                 * ContPoupanca
                 */
                let limite: number = (conta as ContaCorrente).limite;

                // Atualização do Limite
                console.log(`\nLimite atual: ${formatarMoeda(limite)}`);
                console.log("Digite o valor do novo limite: ");
                console.log("(Pressione ENTER para manter o valor atual)");
                limite = Input.questionFloat("", { defaultInput: limite });

                /**
                * Na atualização não utilizamos o método gerarNumero() no atributo 'numero'.
                * O número da conta já existe e identifica unicamente essa conta.
                * 
                * Se chamarmos o método 'gerarNumero()', um novo número seria criado e 
                * substituiria o antigo, o que impediria a atualização dos dados.
                * 
                * O mesmo vale para a classe ContaPoupanca
                */
                contas.atualizar(new ContaCorrente(numero, agencia, titular, tipo, saldo, limite));
                break;

            case 2: // Conta Poupança

                let aniversario: number = (conta as ContaPoupanca).aniversario;

                // Atualização do Aniversário
                console.log(`\nAniversário Atual: ${aniversario}`);
                console.log("Digite o novo dia do aniversário: ");
                console.log("(Pressione ENTER para manter o valor atual)");
                aniversario = Input.questionInt("", { defaultInput: aniversario });

                contas.atualizar(new ContaPoupanca(numero, agencia, titular, tipo, saldo, aniversario));

                break;
        }

    } else {
        console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);
    }
}

// Opção 6: Deletar Conta por numero
function deletarContaPorNumero(): void {
    console.log("Digite o número da conta: ")
    let numero = Input.questionInt("");

    contas.deletar(numero)
}

// Opção 7: Sacar
function sacar(): void {
    console.log("Digite o número da conta: ")
    let numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero)

    if (conta !== null) {
        console.log("Digite o valor do saque: ")
        let valor = Input.questionInt("");

        contas.sacar(numero, valor)
    } else {console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);
    }
}

// Opção 8: Depositar
function depositar(): void {
    console.log("Digite o número da conta: ")
    let numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero)

    if (conta !== null) {
        console.log("Digite o valor do depósito: ")
        let valor = Input.questionInt("");

        contas.depositar(numero, valor)
    } else {console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);}
}

// Opção 9: Transferência entre contas
function transferir(): void {
    console.log("Digite o numero da conta de Origem")
    let numeroOrigem = Input.questionInt("")

    console.log("Digite o numero da conta de Destino")
    let numeroDestino = Input.questionInt("")

    const contaOrigem = contas.buscarNoArray(numeroOrigem)
    const contaDestino = contas.buscarNoArray(numeroDestino)

    if(contaOrigem === null){
        console.log(colors.fg.red, `A conta de Origem não foi encontrada!`, colors.reset)
    }else if (contaDestino === null){
        console.log(colors.fg.red, `A conta de Destino não foi encontrada!`, colors.reset)
    }else{
        console.log("Digite o valor da transferência: ")
        const valor =  Input.questionFloat("")

        contas.transferir(numeroOrigem,numeroDestino,valor)
    }
}


// Função com os dado da pessoa desenvolvedora. 
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

function KeyPress(): void {
    console.log("\nPressione Enter para continuar...")
    Input.prompt()
}

function criarContasTeste() {
    // Instâncias da Classe ContaCorrente
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 'Amanda Magro', 1, 1000000.00, 100000.00));
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 'João da Silva', 1, 1000.00, 100.00));

    // Instâncias da Classe ContaPoupança
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, "Geana Almeida", 2, 10000, 10));
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, "Jean Lima", 2, 15000, 15));
}


main()