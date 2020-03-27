
// class Application {
//   startOnButtonClick() {
//     drawTable;
//   }
// }

function drawTable() {
  const outputArray = [];
  outputArray[0] = `<tr><th>Название банка</th><th>Вклад</th><th>Процент</th><th>Итоговая сумма</th></tr>`;

  //   for (let i=0; i<this.stockArray.length; i++) {
  //     const bankName = this.stockArray[i].name ;
  //     const depositType = this.stockArray[i].ticker ;
  //     const percent = this.stockArray[i]._yield ;
  //     const price = this.stockArray[i].price ;
  //     const amount = this.stockArray[i].amount ;
  //     const total = this.stockArray[i].total ;
  //     arr[i+1] = `<tr><td>${bankName}</td><td>${depositType}</td><td>${percent}</td><td>${finalAmount}</td></tr>`
  //     arr[i+1] = this.getRowCode(name, ticker, _yield, price, amount, total, 'tr' + i) ;
  // }

  // outputArray[i] = `<tr><td>${result[i].bankName}</td><td>${result[i].depositType}</td><td>${result[i].percent}</td><td>${result[i].finalAmount}</td></tr>`;
  containerHTML.innerHTML = `<table>${outputArray.join('')}</table>`;
}

const startAmountHTML = document.getElementById('input-start-amount');
const additionalHTML = document.getElementById('input-additional');
const monthsHTML = document.getElementById('input-months');
const currencyHTML = document.getElementById('currency');

const buttonHTML = document.getElementById('start-calculate-button');

const containerHTML = document.getElementById('output-container');

buttonHTML.addEventListener("click", drawTable);