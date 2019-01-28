import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    console.log(this.state);
    const { updateUser } = this.props;
    updateUser();
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { submitFakeForm } = this.props;
    const {
      email, password, name, redirect,
    } = this.state;
    if (redirect) {
      return <Redirect push to="/Brewing" />;
    }
    return (
      <div>
        <CoffeeImage src="https://img.icons8.com/cotton/64/000000/cup.png" alt="coffee-mug" />
        <Card>
          <h1>Sign Up</h1>
          <Form
            data-testid="login-form"
            // For Testing Switch || to &&
            onSubmit={this.submitForm || (() => submitFakeForm({ email, password }))}
          >
            <InputField htmlFor="name">
              Name
              <Input id="name" value={name} name="name" onChange={this.handleChange} type="text" />
            </InputField>
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
              Sign Up
            </LoginButton>
          </Form>
        </Card>
        <p>Have An Account?</p>
        <Link to="/Login">
          <p>Login Here!</p>
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
  box-shadow: 1px 4px 21px 2px rgba(224, 208, 224, 1);
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
`;

const CoffeeImage = styled.img`
  width: 100px;
  height: 100px;
`;
