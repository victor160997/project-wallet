import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoinsApiThunk } from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.currenciesArray = this.currenciesArray.bind(this);
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

  render() {
    const { currenciesProps } = this.props;
    return (
      <fieldset>
        <form>
          <label htmlFor="valor">
            Valor
            <input type="" name="valor" id="valor" />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input type="text" name="descricao" id="descricao" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select name="moeda" id="moeda">
              { currenciesProps ? this.currenciesArray() : console.log('oi') }
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

ExpenseForm.propTypes = {
  getCoinsProps: PropTypes.func.isRequired,
  currenciesProps: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currenciesProps: state.getCoinsReducer.currencies.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCoinsProps: () => dispatch(getCoinsApiThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
