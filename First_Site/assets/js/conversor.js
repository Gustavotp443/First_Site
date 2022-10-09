const convertBase = document.querySelector('.convert-base')
const usdResult = document.querySelector('.resultado-USD')
const eurResult = document.querySelector('.resultado-EUR')
const BRLInput = document.querySelector('.input-conversor1')

function getUSD() { }
fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL")
    .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
    }).then(function (respostaConvertida) {
        const USD = respostaConvertida['USDBRL']['bid']
        const EUR = respostaConvertida['EURBRL']['bid']

        const USDValor = Number(USD)
        const EURValor = Number(EUR)

        const valorUS = document.querySelector('#valor-US')
        const valorEU = document.querySelector('#valor-EU')

        valorUS.innerHTML = `DOLAR: $ ${USDValor.toFixed(2)}`
        valorEU.innerHTML = `EURO: € ${EURValor.toFixed(2)}`


        convertBase.addEventListener('submit', (e) => {
            e.preventDefault();


            const BRLresult = Number(BRLInput.value)
            const usdFinalValue = Number(BRLresult / USD).toFixed(2);
            const euFinalValue = Number(BRLresult / EUR).toFixed(2);
            function retornaMSG() {
                if (!BRLresult || BRLresult < 0) {
                    alert('invalido')
                    return `Valor digitado invalido`;

                } else {
                    const msgF = `Para Dolar: $ ${usdFinalValue}`
                    return msgF;
                }
            }
            function retornaEU() {
                if (!BRLresult || BRLresult < 0) {
                    return setResultadoEU(false);
                } else {
                    const msgEU = ` Para EURO: € ${euFinalValue}`
                    return msgEU;
                }
            }


            function setResultado() {
                usdResult.innerHTML = '';
                const p = document.createElement('p');
                p.classList.add('p-usd')
                p.innerHTML = retornaMSG();
                usdResult.appendChild(p)
            };

            function setResultadoEU(isValid) {
                eurResult.innerHTML = '';
                const p = document.createElement('p');
                p.classList.add('p-eur')

                p.innerHTML = retornaEU();
                eurResult.appendChild(p)
            };
            setResultado();
            setResultadoEU();


        })
    });
