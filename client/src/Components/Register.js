import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthHelperMethods from '../services/AuthenticationService';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  Auth = new AuthHelperMethods();

  componentWillMount() {
    if (this.Auth.loggedIn() === true) {
      this.props.history.replace('/Brewing');
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;
    const data = await axios.post('/register', {
      name,
      email,
      password,
    });

    const { success } = data.data;
    if (success === true) {
      const res = await this.Auth.login(email, password);
      if (res.success === true) {
        this.props.history.push('/Brewing');
      }
    }
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
        <Link to="/login">
          <p>Login Here!</p>
        </Link>
      </div>
    );
  }
}

export default Register;

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
