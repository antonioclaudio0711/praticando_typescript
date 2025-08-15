export function ValidaDebito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDoDebito) {
        if (valorDoDebito <= 0) {
            throw new Error("O valor a ser debitado deve ser maior do que zero!");
        }
        if (valorDoDebito > this.saldo) {
            throw new Error("O valor a ser debitado é maior que o saldo disponível!");
        }
        return originalMethod.apply(this, [valorDoDebito]);
    };
    return descriptor;
}
export function ValidaDeposito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDoDeposito) {
        if (valorDoDeposito <= 0) {
            throw new Error("O valor a ser depositado deve ser maior do que zero!");
        }
        return originalMethod.apply(this, [valorDoDeposito]);
    };
    return descriptor;
}
