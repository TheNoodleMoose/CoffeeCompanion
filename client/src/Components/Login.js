import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import AuthHelperFunctions from '../services/AuthenticationService';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loggedIn: false,
  };

  Auth = new AuthHelperFunctions();

  componentWillMount() {
    if (this.Auth.loggedIn() === true) {
      this.setState({
        loggedIn: true,
      });
    }
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  submitForm = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    const res = await this.Auth.login(email, password);
    if (res.success === true) {
      this.setState({
        loggedIn: true,
      });
    }
  };

  render() {
    const { email, password, loggedIn } = this.state;

    if (loggedIn === true) {
      return <Redirect push to="/Brewing" />;
    }

    return (
      <div>
        <CoffeeImage
          src="https://img.icons8.com/cotton/64/000000/cup.png"
          alt="coffee-mug"
        />
        <Card>
          <h1>Log In</h1>
          <Form
            data-testid="login-form"
            // For Testing Switch || to &&
            onSubmit={this.submitForm}
          >
            <InputField htmlFor="email">
              Email
              <Input
                id="email"
                value={email}
                name="email"
                onChange={this.handleChange}
                type="email"
              />
            </InputField>
            <InputField htmlFor="password">
              Password
              <Input
                id="password"
                value={password}
                name="password"
                onChange={this.handleChange}
                type="password"
              />
            </InputField>

            <LoginButton data-testid="login-button" type="submit">
              Login
            </LoginButton>
          </Form>
        </Card>
        <p>Don&apos;t Have An Account?</p>
        <Link to="/">
          <p>Sign Up Here</p>
        </Link>
      </div>
    );
  }
}

export default Login;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
  padding: 10px;
  width: 300px;
  height: auto;
  background-color: #f3f1ee;
  color: #2f2923;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const InputField = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
`;

const Input = styled.input`
  border-radius: 2px;
  border: 2px solid #e0ddd9;
  height: 25px;
  width: 275px;
`;

const LoginButton = styled.button`
  background: #67615a;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  margin: 20px 0;
  width: 150px;
  height: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const CoffeeImage = styled.img`
  width: 100px;
  height: 100px;
`;
