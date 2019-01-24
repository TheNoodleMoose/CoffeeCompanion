import React, { Component } from 'react';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loggedIn: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { submitForm } = this.props;
    const { email, password } = this.state;
    return (
      <form data-testid="login-form" onSubmit={() => submitForm({ email, password })}>
        <label htmlFor="email">
          Email
          <input id="email" value={email} name="email" onChange={this.handleChange} type="email" />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            value={password}
            name="password"
            onChange={this.handleChange}
            type="password"
          />
        </label>
        <button data-testid="login-button" type="submit">
          Login
        </button>
      </form>
    );
  }
}

export default Login;
