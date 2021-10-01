import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.updateTotal = this.updateTotal.bind(this);
  }

  /* componentDidUpdate() {
    this.updateTotal();
  } */

  updateTotal() {
    const { expensesProps } = this.props;
    if (expensesProps.length > 0) {
      const array = [];
      expensesProps.forEach((gasto) => {
        const coin = gasto.currency;
        const updateCurrencyValue = parseFloat(
          gasto.exchangeRates[coin].ask,
        );
        array.push(parseFloat(gasto.value) * updateCurrencyValue);
      });
      const t = array.reduce((total, n) => total + n, 0);
      return t.toFixed(2);
    }
    return 0;
  }

  render() {
    const { emailInput } = this.props;
    return (
      <header className="bodyHeader animationFadeInFadeOutHeader">
        <p data-testid="email-field" className="child">
          <p className="th">User </p>
          { emailInput }
        </p>
        <p
          data-testid="total-field"
          className="child"
        >
          <p className="th">Total de gastos </p>
          { `R$ ${this.updateTotal()}` }
        </p>
        <p data-testid="header-currency-field" className="child">
          <p className="th">Moeda </p>
          BRL
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  emailInput: PropTypes.string.isRequired,
  expensesProps: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  emailInput: state.user.email,
  expensesProps: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
