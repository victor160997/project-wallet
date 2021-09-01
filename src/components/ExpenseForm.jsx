import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoinsApiThunk, getExpensesAction } from '../actions';
import { getCoinsApi } from '../services/awesomeApi';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      valor: '',
      descricao: '',
      moeda: '',
      pagamento: '',
      despesa: '',
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
    const { valor } = this.state;
    return (
      <label htmlFor="valor">
        Valor
        <input
          type="number"
          name="valor"
          id="valor"
          value={ valor }
          required
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  inputDescription() {
    const { descricao } = this.state;
    return (
      <label htmlFor="descricao">
        Descrição
        <input
          type="text"
          name="descricao"
          id="descricao"
          value={ descricao }
          required
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  inputCoin() {
    const { moeda } = this.state;
    const { currenciesProps } = this.props;
    return (
      <label htmlFor="moeda">
        Moeda
        <select
          name="moeda"
          id="moeda"
          value={ moeda }
          required
          onChange={ this.handleChange }
        >
          { currenciesProps ? this.currenciesArray() : console.log('oi') }
        </select>
      </label>
    );
  }

  inputPagamento() {
    const { pagamento } = this.state;
    return (
      <label htmlFor="pagamento">
        Método de pagamento
        <select
          name="pagamento"
          id="pagamento"
          value={ pagamento }
          required
          onChange={ this.handleChange }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  inputTag() {
    const { despesa } = this.state;
    return (
      <label htmlFor="despesa">
        Tag
        <select
          name="despesa"
          id="despesa"
          value={ despesa }
          required
          onChange={ this.handleChange }
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </label>
    );
  }

  updateExchange() {
    getCoinsApi().then((res) => {
      this.setState({
        exchangeRates: res,
      });
    });
  }

  submitExpense(event) {
    event.preventDefault();
    const { getExpenseProps, expensesProps } = this.props;
    this.updateExchange();
    getExpenseProps([...expensesProps, this.state]);
    this.setState((previus) => ({ id: previus.id + 1 }));
  }

  render() {
    const { id, exchangeRates } = this.state;
    return (
      <fieldset>
        <form>
          { this.inputValor() }
          { this.inputDescription() }
          { this.inputCoin() }
          { this.inputPagamento() }
          { this.inputTag() }
          { this.updateExchange() }
          <button
            type="submit"
            onClick={ this.submitExpense }
          >
            Adicionar despesa
          </button>
          { console.log(id) }
          { console.log(exchangeRates) }
        </form>
      </fieldset>
    );
  }
}

ExpenseForm.propTypes = {
  getCoinsProps: PropTypes.func.isRequired,
  currenciesProps: PropTypes.objectOf(PropTypes.object).isRequired,
  getExpenseProps: PropTypes.func.isRequired,
  expensesProps: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currenciesProps: state.getCoinsReducer.currencies.currencies,
  expensesProps: state.getCoinsReducer.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCoinsProps: () => dispatch(getCoinsApiThunk()),
  getExpenseProps: (payload) => dispatch(getExpensesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
