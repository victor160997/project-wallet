import React from 'react';

export default function renderCoin(exp, a) {
  const coin = exp.currency;
  const moeda = exp.exchangeRates[coin].name;
  const cambio = exp.exchangeRates[coin].ask;
  const convert = parseFloat(exp.value) * parseFloat(cambio);
  const resultado = moeda.replace('/Real Brasileiro', '');
  if (a === 1) {
    return (
      <td>{ resultado }</td>
    );
  }
  if (a === 2) {
    return (
      <td>{ parseFloat(parseFloat(convert).toFixed(2)) }</td>
    );
  }
  return (
    <td>{ parseFloat(parseFloat(cambio).toFixed(2)) }</td>
  );
}

/* export function getObjectExpenseToRemove(moeda, expenses) {
  console.log(expenses.find((exp) => {
    const coin = exp.currency;
    const finderCoin = exp.exchangeRates[coin].name.replace('/Real Brasileiro', '');
    return moeda === finderCoin;
  }));
}
 */
export function getExpenseToRemove(exp, expenses) {
  const idToRemove = exp.id;
  const expToRemove = expenses.find((expen) => idToRemove === expen.id);
  return expToRemove;
}
