// SELEÇÃO DOS ELEMENTOS
const convertButton = document.querySelector("button") // Seleciona o botão
const currencySelectMain = document.querySelector(".currency-select-main") // Select DE (Esquerda)
const currencySelect = document.querySelector(".currency-select") // Select PARA (Direita)

 async function converter() {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.getElementById("value-to-convert") // Texto valor esquerda
    const currencyValueConverted = document.getElementById("value-converted") // Texto valor direita

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL").then(response => response.json())

    const dolarToday = data.USDBRL.high
    const euroToday = data.EURBRL.high
    const libraToday = data.GBPBRL.high
    const ieneToday = data.JPYBRL.high
    const realToday = 1

    // 1. Descobrir a cotação da moeda de ORIGEM
    let currencyRateSource = 1
    const fromCurrency = currencySelectMain.value

    if (fromCurrency == "dolar") currencyRateSource = dolarToday
    if (fromCurrency == "euro") currencyRateSource = euroToday
    if (fromCurrency == "libra") currencyRateSource = libraToday
    if (fromCurrency == "iene") currencyRateSource = ieneToday
    if (fromCurrency == "real") currencyRateSource = realToday

    // 2. Descobrir a cotação da moeda de DESTINO
    let currencyRateTarget = 1
    const toCurrency = currencySelect.value

    if (toCurrency == "dolar") currencyRateTarget = dolarToday
    if (toCurrency == "euro") currencyRateTarget = euroToday
    if (toCurrency == "libra") currencyRateTarget = libraToday
    if (toCurrency == "iene") currencyRateTarget = ieneToday
    if (toCurrency == "real") currencyRateTarget = realToday

    // 3. Fazer o cálculo cruzado
    const convertedValue = (inputCurrencyValue * currencyRateSource) / currencyRateTarget

    // 4. Formatar e mostrar o valor da DIREITA (Resultado)
    currencyValueConverted.innerHTML = new Intl.NumberFormat(getLocale(toCurrency), {
        style: "currency",
        currency: getCurrencyCode(toCurrency)
    }).format(convertedValue)

    // 5. Formatar e mostrar o valor da ESQUERDA (Origem)
    currencyValueToConvert.innerHTML = new Intl.NumberFormat(getLocale(fromCurrency), {
        style: "currency",
        currency: getCurrencyCode(fromCurrency)
    }).format(inputCurrencyValue)
}

// Funções auxiliares (para deixar o código mais limpo)
function getCurrencyCode(currency) {
    if (currency == "dolar") return "USD"
    if (currency == "euro") return "EUR"
    if (currency == "libra") return "GBP"
    if (currency == "iene") return "JPY"
    return "BRL" // real
}

function getLocale(currency) {
    if (currency == "dolar") return "en-US"
    if (currency == "euro") return "de-DE"
    if (currency == "libra") return "en-GB"
    if (currency == "iene") return "ja-JP"
    return "pt-BR" // real
}

function changeCurrency() {
    // A. Mudar a moeda de ORIGEM (Esquerda)
    const currencyNameMain = document.getElementById("currency-name-main")
    const currencyImageMain = document.querySelector(".currency-img-main")

    if (currencySelectMain.value == "dolar") {
        currencyNameMain.innerHTML = "Dólar"
        currencyImageMain.src = "./assets/dolar-logo.png"
    }
    if (currencySelectMain.value == "euro") {
        currencyNameMain.innerHTML = "Euro"
        currencyImageMain.src = "./assets/euro-logo.png"
    }
    if (currencySelectMain.value == "libra") {
        currencyNameMain.innerHTML = "Libra"
        currencyImageMain.src = "./assets/libra-logo.png"
    }
    if (currencySelectMain.value == "iene") {
        currencyNameMain.innerHTML = "Iene"
        currencyImageMain.src = "./assets/iene-logo.png"
    }
    if (currencySelectMain.value == "real") {
        currencyNameMain.innerHTML = "Real"
        currencyImageMain.src = "./assets/real-logo.png"
    }

    // B. Mudar a moeda de DESTINO (Direita)
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/dolar-logo.png"
    }
    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro-logo.png"
    }
    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "Libra"
        currencyImage.src = "./assets/libra-logo.png"
    }
    if (currencySelect.value == "iene") {
        currencyName.innerHTML = "Iene"
        currencyImage.src = "./assets/iene-logo.png"
    }
    if (currencySelect.value == "real") {
        currencyName.innerHTML = "Real"
        currencyImage.src = "./assets/real-logo.png"
    }

    converter()
}

// EVENTOS (Onde a mágica acontece)
currencySelectMain.addEventListener("change", changeCurrency) // Quando troca o select de cima
currencySelect.addEventListener("change", changeCurrency) // Quando troca o select de baixo
convertButton.addEventListener("click", converter) // Quando clica no botão