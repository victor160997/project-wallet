import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import inputEmail from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      desabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm() {
    const { inputEmailProps, history } = this.props;
    const { email, password } = this.state;
    const passwordLength = 6;
    if (password.length < passwordLength) {
      return <p>senha incorreta</p>;
    }
    inputEmailProps(email);
    history.push('/carteira');
  }

  handleChange(event) { //com ajuda do @BrunoMoraes
    const theKey = event.target.name;
    const theEmail = document.getElementById('email');
    const thePassword = document.getElementById('password').value;
    const minPass = 6;
    this.setState({ [theKey]: event.target.value });
    if (theEmail.checkValidity() && thePassword.length >= minPass) {
      this.setState({ desabled: false });
    } else {
      this.setState({ desabled: true });
    }
  }

  render() {
    const { email, password, desabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="email"
            name="email"
            id="email"
            value={ email }
            required
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            value={ password }
            minLength="6"
            required
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          id="button-login"
          onClick={ this.onSubmitForm }
          disabled={ desabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  inputEmailProps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  inputEmailProps: (payload) => dispatch(inputEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
