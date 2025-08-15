export function ValidaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(valorDoDebito: number) {
        if (valorDoDebito <= 0) {
            throw new Error("O valor a ser debitado deve ser maior do que zero!")
        }

        if (valorDoDebito > this.saldo) {
            throw new Error("O valor a ser debitado é maior que o saldo disponível!");
        }

        return originalMethod.apply(this, [valorDoDebito]);
    }

    return descriptor;
}

export function ValidaDeposito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (valorDoDeposito: number) {
        if (valorDoDeposito <= 0) {
            throw new Error("O valor a ser depositado deve ser maior do que zero!");
        }

        return originalMethod.apply(this, [valorDoDeposito]);
    }

    return descriptor;
}