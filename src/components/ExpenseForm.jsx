import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  render() {
    return (
      <fieldset>
        <form>
          <label htmlFor="valor">
            Valor
            <input type="number" name="valor" id="valor" />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input type="text" name="descricao" id="descricao" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select name="moeda" id="moeda">
              <option value="test">teste</option>
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento
            <select name="pagamento" id="pagamento">
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="despesa">
            Tag
            <select name="despesa" id="despesa">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </fieldset>
    );
  }
}
