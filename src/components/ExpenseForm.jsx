import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoinsApiThunk, getExpensesAction } from '../actions';
import { getCoinsApi } from '../services/awesomeApi';
import HeaderTable from './HeaderTable';
import renderCoin from './Funcs';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: '',
    };
    this.currenciesArray = this.currenciesArray.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputValor = this.inputValor.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.inputCoin = this.inputCoin.bind(this);
    this.inputPagamento = this.inputPagamento.bind(this);
    this.inputTag = this.inputTag.bind(this);
    this.updateExchange = this.updateExchange.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidMount() {
    const { getCoinsProps } = this.props;
    getCoinsProps();
  }

  currenciesArray() {
    const { currenciesProps } = this.props;
    return Object.keys(currenciesProps).map((coin, i) => {
      if (coin !== 'USDT' && coin !== 'DOGE') {
        return <option value={ coin } key={ i }>{ coin }</option>;
      }
      return undefined;
    });
  }

  handleChange(event) { // com ajuda do @BrunoMoraes
    const theKey = event.target.name;
    this.setState({ [theKey]: event.target.value });
  }

  inputValor() {
    const { value } = this.state;
    return (
      <label htmlFor="valor">
        Valor
        <input
          type="number"
          name="value"
          id="valor"
          value={ value }
          required
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  inputDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="descricao">
        Descrição
        <input
          type="text"
          name="description"
          id="descricao"
          value={ description }
          required
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  inputCoin() {
    const { currency } = this.state;
    const { currenciesProps } = this.props;
    return (
      <label htmlFor="moeda">
        Moeda
        <select
          name="currency"
          id="moeda"
          value={ currency }
          required
          onChange={ this.handleChange }
        >
          { currenciesProps ? this.currenciesArray() : console.log('oi') }
        </select>
      </label>
    );
  }

  inputPagamento() {
    const { method } = this.state;
    return (
      <label htmlFor="pagamento">
        Método de pagamento
        <select
          name="method"
          id="pagamento"
          value={ method }
          required
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  inputTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="despesa">
        Tag
        <select
          name="tag"
          id="despesa"
          value={ tag }
          required
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  async updateExchange(event) {
    event.preventDefault();
    const response = await getCoinsApi();
    this.setState({ exchangeRates: response });
    this.submitExpense();
  }

  submitExpense() {
    const { getExpenseProps, expensesProps } = this.props;
    getExpenseProps([...expensesProps, this.state]);
    this.setState((previus) => ({ id: previus.id + 1 }));
  }

  renderTable(expenses) {
    return (
      <table border="3">
        <HeaderTable />
        { expenses.map((exp) => (
          <tr key={ exp.id }>
            <td>{ exp.description }</td>
            <td>{ exp.tag }</td>
            <td>{ exp.method }</td>
            <td>{ exp.value }</td>
            { renderCoin(exp, 1) }
            { renderCoin(exp, 0) }
            { renderCoin(exp, 2) }
            <td>Real</td>
            <td>
              Editar/
              <button type="button">Excluir</button>
            </td>
          </tr>
        ))}
      </table>
    );
  }

  render() {
    const { id, exchangeRates } = this.state;
    const { expensesProps } = this.props;
    return (
      <body>

        <fieldset>
          <form>
            { this.inputValor() }
            { this.inputDescription() }
            { this.inputCoin() }
            { this.inputPagamento() }
            { this.inputTag() }
            <button
              type="submit"
              onClick={ this.updateExchange }
            >
              Adicionar despesa
            </button>
            { console.log(id) }
            { console.log(exchangeRates) }
          </form>
        </fieldset>
        { expensesProps.length > 0 ? this.renderTable(expensesProps) : <h1> </h1> }
      </body>
    );
  }
}

ExpenseForm.propTypes = {
  getCoinsProps: PropTypes.func.isRequired,
  currenciesProps: PropTypes.objectOf(PropTypes.object).isRequired,
  expensesProps: PropTypes.objectOf(PropTypes.string).isRequired,
  getExpenseProps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currenciesProps: state.wallet.currencies.currencies,
  expensesProps: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCoinsProps: () => dispatch(getCoinsApiThunk()),
  getExpenseProps: (payload) => dispatch(getExpensesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
