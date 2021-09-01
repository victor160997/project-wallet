import React from 'react';

export default function renderCoin(exp, a) {
  const coin = exp.currency;
  const moeda = exp.exchangeRates[coin].name;
  const cambio = exp.exchangeRates[coin].ask;
  const convert = parseFloat(exp.value) * parseFloat(exp.value);
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
