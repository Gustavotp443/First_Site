const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const docPeso = document.querySelector("#peso");
    const docAltura = document.querySelector("#altura");
    const peso = Number(docPeso.value);
    const altura = Number(docAltura.value);

    if (!peso || peso < 0) {
        alert("Peso inválido");
        setResultado("Peso inválido", false);
        return;
    }
    if (!altura || altura < 0) {
        alert("Altura inválida");
        setResultado("Altura inválida", false);
        return;
    }
    const imc = (peso / altura ** 2).toFixed(2);
    const msg = `Seu imc é de ${imc}(${getNivel(imc)})`;
    setResultado(msg, true);
});


function getNivel(imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1',
        'Obesidade grau 2', 'Obesidade grau 3'];


    if (imc >= 39.9) { return nivel[5] }
    if (imc >= 34.9) { return nivel[4] }
    if (imc >= 29.9) { return nivel[3] }
    if (imc >= 24.9) { return nivel[2] }
    if (imc >= 18.5) { return nivel[1] }
    if (imc < 18.5) { return nivel[0] }
}


function setResultado(msg, isValid) {
    const docResultado = document.querySelector(".resultado");
    docResultado.innerHTML = "";
    const p = criaP();
    if (isValid) {
        p.classList.add('good');
    }
    else {
        p.classList.add('bad');
    }
    p.innerHTML = msg;
    docResultado.appendChild(p);

}

function criaP() {
    const p = document.createElement('p');
    return p;
}
