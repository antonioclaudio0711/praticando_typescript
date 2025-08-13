// // Tipos primitivos de variáveis
// var variavelNumerica: number = 3000;
// var variavelLiteral: string = "Antônio Claudio";
// var variavelBooleana: boolean = true;
// var variavelQualquer: any;
// variavelQualquer = "";
// variavelQualquer = 22;
// // Arrays
// var variavelListaNumerica: number[] = [];
// variavelListaNumerica.push(22, 23, 24);
// var variavelListaLiteral: string[] = [];
// variavelListaLiteral.push("Antônio", "Claudio", "Ferreira", "Filho");
// var variavelListaBooleana: Array<boolean> = [];
// variavelListaBooleana.push(true, false);
// var variavelListaQualquer: Array<any> = [];
// variavelListaQualquer.push("Antônio Claudio", 22, false, []);
// // Tipos personalizados de variáveis (Type Alias)
// type Transacao = {
//     tipoTransacao: TipoTransacao,
//     valorTranasacao: number,
//     dataTransacao: Date,
// }
// //Enum
// enum TipoTransacao {
//     DEPOSITO = "Depósito",
//     TRANSFERENCIA = "Transferência",
//     PAGAMENTO_BOLETO = "Pagamento de Boleto",
// }
// const novaTransacao: Transacao = {
//     tipoTransacao: TipoTransacao.DEPOSITO,
//     valorTranasacao: 2000,
//     dataTransacao: new Date(),
// }
