import React, { Component } from 'react';
import styled from 'styled-components';
import AuthHelperMethods from '../services/AuthenticationService';
import withAuth from './withAuth';

class Brewing extends Component {
  state = {
    country: '',
    roaster: '',
    brew_method: '',
    coffee_amount: '',
    coffee_strength: '',
    coffee_coarseness: '',
    brewMethods: [
      {
        id: 1,
        name: 'Chemex',
      },
      {
        id: 2,
        name: 'Hario V60',
      },
      {
        id: 3,
        name: 'Kalita',
      },
      {
        id: 4,
        name: 'Cold Brew',
      },
    ],
  };

  Auth = new AuthHelperMethods();

  componentDidMount() {
    const userInfo = this.Auth.getConfirm();
    this.setState({
      username: userInfo.name,
    });
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  LogOut = () => {
    this.Auth.logout();
    this.props.history.replace('/login');
  };


  render() {
    const {
      country, roaster, brewMethods, username,
    } = this.state;

    return (
      <div>
        <LoginButton data-testid="login-button" type="button" onClick={this.LogOut}>
          Logout
        </LoginButton>

        <h1 data-testid="users-intro">Hi {username}!</h1>
        <h1>Let&apos;s brew an awesome cup of coffee!</h1>
        <form>
          {/* Country and Roaster Section */}
          <Card>
            <QuestionMark
              src="https://img.icons8.com/ios/50/000000/help.png"
              alt="question-country"
            />
            <h3>What type of coffee are we brewing?</h3>
            <InputField htmlFor="country">
              Country, Region
              <Input
                id="country"
                value={country}
                name="country"
                onChange={this.handleChange}
                type="text"
              />
            </InputField>
            <InputField htmlFor="roaster">
              Roaster
              <Input
                id="roaster"
                value={roaster}
                name="roaster"
                onChange={this.handleChange}
                type="text"
              />
            </InputField>
          </Card>
          {/* Brew Method Section */}
          <Card>
            <QuestionMark
              src="https://img.icons8.com/ios/50/000000/help.png"
              alt="question-country"
            />
            <h3>What brew method are we using?</h3>
            <ButtonContainer>
              {brewMethods.map(method => (
                <div key={method.id}>
                  <RadioButton
                    id="brew_method"
                    value={method.name}
                    name="brew_method"
                    onClick={this.handleChange}
                    type="radio"
                  />
                  <RadioLabel htmlFor="brew_method">
                    <img src="https://img.icons8.com/small/32/000000/temperature.png" alt="temp" />
                    <span>{method.name}</span>
                  </RadioLabel>
                </div>
              ))}
            </ButtonContainer>
          </Card>
          <Card>
            <QuestionMark
              src="https://img.icons8.com/ios/50/000000/help.png"
              alt="question-country"
            />
            <h3>How much coffee are we making?</h3>
          </Card>
        </form>
      </div>
    );
  }
}

export default withAuth(Brewing);

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

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #85817d;
  font-weight: bold;
  color: white;
  width: 125px;
  height: 40px;
  border-radius: 15px;
  margin: 5px;
`;

const RadioButton = styled.input`
  margin: 10px 0;
  &:checked + ${RadioLabel} {
    background: #67615a;
  }
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

const QuestionMark = styled.img`
  width: 20px;
  height: 20px;
`;
