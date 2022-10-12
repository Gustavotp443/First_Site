class ValidaCPF {
    constructor(cpf) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: true,
            writable: false,
            configurable: false,
            value: cpf.replace(/\D+/g, '')   // /\D+/g t   elimina tudo apenas deixando os números
        });
    }

    isSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo; //Impede que seja sequencia
    }

    geraNovoCPF() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2); //Vai pegar o cpf sem os 2 ultimos
        const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos + digito1 + digito2;
    }

    static geraDigito(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;  //+1 pq deve ser 10

        for (let stringNumerica of cpfSemDigitos) { //Conta para validar cpf
            total += reverso * Number(stringNumerica);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';    //Se o digito for maior que 0 retorna 0 e deve ser String
    }

    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.isSequencia()) return false;  //Se for true a sequencia return false
        this.geraNovoCPF()



        return this.novoCPF === this.cpfLimpo;
    }
}

// let validacpf = new ValidaCPF('070.987.720-03');
// if (validacpf.valida()) {
//     console.log('CPF válido')
// } else { console.log('CPF inválido') };