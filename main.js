class Deposit { // set's user's request to object
  constructor(startAmount, additional, months, currency) {
    this.startAmount = startAmount;
    this.additional = additional;
    this.months = months;
    this.currency = currency;
  }
}

class BankProduct { // checks DB.js file for offers equal's to user's request object, in case -return offers array.
  constructor(deposit) {
    let array = [];
    if (deposit.additional) {
      array = DB.filter(function (item) {
        return item.sumMin <= deposit.startAmount
          && (item.sumMax >= deposit.startAmount || item.sumMax === null)
          && item.canDeposit === true
          && item.termMin <= deposit.months
          && item.termMax >= deposit.months
          && item.currency === deposit.currency;
      });
      return array;
    } else {
      array = DB.filter(function (item) {
        return item.sumMin <= deposit.startAmount
          && (item.sumMax >= deposit.startAmount || item.sumMax === null)
          && item.termMin <= deposit.months
          && item.termMax >= deposit.months
          && item.currency === deposit.currency;
      });
      return array;
    }
  }
}

class Calculator { //converts DB.js output array and deposit array into applications final output array
  constructor(array, deposit) {
    let newArray = [];
    let outputArray = [];
    let max = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].incomeType > max) {
        max = array[i].incomeType;
      }
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i].incomeType === max) {
        newArray.push(array[i]);
      }
    }
    for (let i = 0; i < newArray.length; i++) {
      this.bankName = newArray[i].bankName;
      this.investName = newArray[i].investName;
      this.incomeType = newArray[i].incomeType;
      this.total = this.getFinalAmount(deposit.startAmount, deposit.additional, this.incomeType, deposit.months);
      this.totalAmount = Math.round(this.total);
      outputArray.push({ bankName: this.bankName, investName: this.investName, incomeType: this.incomeType, totalAmount: this.totalAmount });
    }
    return outputArray;
  }
  getFinalAmount(startAmount, additional, percent, month) {
    for (let i = 0; i < month; i++) {
      startAmount = startAmount * percent / 1200 + startAmount + additional;
    }
    return startAmount - additional;
  }
}

class Application { //collecting data from input, send to classes for calculation, send output to DOM.
  constructor() {
    buttonHTML.addEventListener('click', this.runApplication);
  }
  runApplication() {
    const startAmount = +startAmountHTML.value;
    const additional = +additionalHTML.value;
    const months = +monthsHTML.value;
    const currency = currencyHTML.value;

    if (!startAmount) {
      alert('Начальная сумма должна быть положительным числом');
      return;
    }
    if (additional < 0) {
      alert('Сумма пополнения должна быть не меньше нуля');
      return;
    }
    if (!months || !(months % 2 === 0 || months % 2 === 1)) {
      alert('Срок вклада должен быть целым числом');
      return;
    }
    let deposit = new Deposit(startAmount, additional, months, currency);
    let bankproduct = new BankProduct(deposit);
    let final = new Calculator(bankproduct, deposit);
    if (final.length === 0) {
      containerHTML.innerHTML = 'Нет подходящих вариантов';
      return;
    } else {
      let outputArray = [];
      outputArray[0] = `<tr><th>Название банка</th><th>Вклад</th><th>Процент</th><th>Итоговая сумма</th></tr>`;
      for (let i = 0; i < final.length; i++) {
        outputArray.push(`<tr><td>${final[i].bankName}</td><td>${final[i].investName}</td><td>${final[i].incomeType}</td><td>${final[i].totalAmount}</td></tr>`);
      }
      containerHTML.innerHTML = `<table>${outputArray.join('')}</table>`;
      return;
    }
  }
}

const startAmountHTML = document.getElementById('input-start-amount');
const additionalHTML = document.getElementById('input-additional');
const monthsHTML = document.getElementById('input-months');
const currencyHTML = document.getElementById('currency');
const buttonHTML = document.getElementById('start-calculate-button');
const containerHTML = document.getElementById('output-container');
const app = new Application();