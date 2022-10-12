class ValidaFormulário {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValido();
        const senhasValidas = this.senhasSaoValidas();

        if (camposValidos && senhasValidas) {
            alert('Formulario enviado.');
            console.log('Formulario enviado.');
            this.formulario.submit();
        }
    }

    senhasSaoValidas() {
        let valid = true;
        const senha = this.formulario.querySelector('.senha');
        const repetirsenha = this.formulario.querySelector('.repita-senha');

        if (senha.value !== repetirsenha.value) {
            valid = false;
            this.criaErro(senha, 'Campos senha e repita senha devem ser iguais');
            this.criaErro(repetirsenha, 'Campos senha e repita senha devem ser iguais');
        }

        if (senha.value.length < 6 || senha.value.length > 20) {
            valid = false;
            this.criaErro(senha, 'Senha precisa ter entre 6 a 20 caracteres.')
        }

        return valid;
    }

    camposSaoValido() {
        let valid = true;
        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText.replace(':', ''); //Ele pega o elemento irmão anterior

            if (!campo.value) { //Se o campo.value tiver vazio(o campo vai representar cada elemento do meu html com a classe validar)
                this.criaErro(campo, `Campo "${label}" não pode estar em branco`)
                valid = false;
            }

            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) {
                    valid = false;
                }
            }

        }

        return valid;
    }



    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido.');
            return false;
        }

        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div); //Adiciona o elemento dps do campo;
    }
}

const valida = new ValidaFormulário();