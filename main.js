
function startOnButtonClick() {
drawTable();
}

  function drawTable() {
    const arr = [] ;
    arr[0] = '<tr><th>Название банка</th><th>Вклад</th><th>Процент</th><th>Итоговая сумма</th></tr>';

        container.innerHTML = '<table>' + arr + '</table>';
    }

const startAmountHTML = document.getElementById("input-start-amount");
const additionalHTML = document.getElementById("input-additional");
const monthsHTML = document.getElementById("input-months");
const currencyHTML = document.getSelection

const errorStart = document.getElementById("error-notification-start");
const errorAdditional = document.getElementById("error-notification-additional");
const errorPercent = document.getElementById("error-notification-percent");
const errorDays = document.getElementById("error-notification-days");

const buttonHTML = document.getElementById("start-calculate-button");

const container = document.getElementById('output-container');

buttonHTML.addEventListener("click", startOnButtonClick);