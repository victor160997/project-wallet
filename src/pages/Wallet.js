import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import './wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="body-wallet">
        <div className="header-wallet">
          <h2 className="title-wallet">Trybe Wallet</h2>
          <img src="https://freepngimg.com/thumb/wallet/2-2-wallet-free-png-image.png" alt="wallet" width="45px" />
        </div>
        <Header />
        <ExpenseForm />
      </div>
    );
  }
}

export default Wallet;
