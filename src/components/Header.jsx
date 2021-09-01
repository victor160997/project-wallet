import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { emailInput } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          { emailInput }
        </p>
        <p
          data-testid="total-field"
        >
          0
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  emailInput: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailInput: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
