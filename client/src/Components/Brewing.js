/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import coarseBean from '../assets/images/coarse_bean.svg';
import AuthHelperMethods from '../services/AuthenticationService';

class Brewing extends Component {
  static propTypes = {
    handleParameterState: PropTypes.func,
  };

  state = {
    parameters: {
      country: '',
      roaster: '',
      brewMethod: '',
      coffeeOutput: '12',
      coffeeStrength: 15,
      grindSize: '',
      loggedOut: false,
    },
    brewMethods: [
      {
        id: 1,
        name: 'Pour Over',
        grindSize: 'Medium',
      },
      {
        id: 2,
        name: 'French Press',
        grindSize: 'Coarse',
      },
    ],
    brewAmount: [
      {
        id: 5,
        amount: 12,
      },
      {
        id: 6,
        amount: 24,
      },
      {
        id: 7,
        amount: 36,
      },
    ],
    grindSizes: [
      {
        id: 8,
        grind: 'Extra Coarse',
        text: 'Slightly larger than kosher salt',
      },
      {
        id: 9,
        grind: 'Coarse',
        text: 'Similar to kosher salt',
      },
      {
        id: 10,
        grind: 'Med-Coarse',
        text: 'Coarse Sand',
      },
      {
        id: 11,
        grind: 'Medium',
        text: 'Slightly smaller than table salt',
      },
      {
        id: 12,
        grind: 'Fine',
        text: 'Slightly finer than sugar',
      },
      {
        id: 13,
        grind: 'Extra Fine',
        text: 'Similar to powdered sugar',
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

  handleChange = event => {
    const { value, name } = event.target;
    const { parameters } = this.state;
    this.setState({
      parameters: {
        ...parameters,
        [name]: value,
      },
    });
  };

  handleBrewMethodChange = event => {
    const { value, name } = event.target;
    const { parameters } = this.state;

    const grindSize = event.target.getAttribute('data');

    this.setState({
      parameters: {
        ...parameters,
        [name]: value,
        grindSize,
      },
    });
  };

  handleChangeHorizontal = value => {
    const { parameters } = this.state;
    this.setState({
      parameters: {
        ...parameters,
        coffeeStrength: value,
      },
    });
  };

  LogOut = () => {
    this.Auth.logout();
    this.setState({
      loggedOut: true,
    });
  };

  calcInput = (output, strength) => {
    const coffeeInput = Math.floor(
      (parseFloat(output) * 29.57) / parseFloat(strength)
    );
    console.log(coffeeInput);
    return coffeeInput;
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    const {
      parameters,
      parameters: { coffeeOutput, coffeeStrength },
    } = this.state;
    const { handleParameterState } = this.props;

    const coffeeInput = this.calcInput(coffeeOutput, coffeeStrength);

    handleParameterState(parameters, coffeeInput);
  };

  render() {
    const {
      brewMethods,
      username,
      parameters,
      brewAmount,
      grindSizes,
      loggedOut,
    } = this.state;

    const formatg = value => `${value} g`;

    if (loggedOut === true) {
      return <Redirect push to="/login" />;
    }

    return (
      <div>
        <LoginButton
          data-testid="login-button"
          type="button"
          onClick={this.LogOut}
        >
          Logout
        </LoginButton>
        <Link to="/journal">
          <LoginButton>Journal</LoginButton>
        </Link>

        <h1 data-testid="users-intro">Hi {username}!</h1>
        <h1>Let&apos;s brew an awesome cup of coffee!</h1>
        <form onSubmit={this.handleFormSubmit}>
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
                value={parameters.country}
                name="country"
                onChange={this.handleChange}
                type="text"
              />
            </InputField>
            <InputField htmlFor="roaster">
              Roaster
              <Input
                id="roaster"
                value={parameters.roaster}
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
            <BrewMethodContainer>
              {brewMethods.map(method => (
                <div key={method.id}>
                  <BrewMethodButton
                    id={method.id}
                    value={method.name}
                    name="brewMethod"
                    onClick={this.handleBrewMethodChange}
                    type="radio"
                    data={method.grindSize}
                  />
                  <BrewMethodLabel htmlFor={method.id}>
                    <img
                      src="https://img.icons8.com/small/32/000000/temperature.png"
                      alt="temp"
                    />
                    <span>{method.name}</span>
                  </BrewMethodLabel>
                </div>
              ))}
            </BrewMethodContainer>
          </Card>
          {/* Coffee Amount Section */}
          <Card>
            <QuestionMark
              src="https://img.icons8.com/ios/50/000000/help.png"
              alt="question-country"
            />
            <h3>How much coffee are we making?</h3>
            <ButtonContainer>
              {brewAmount.map(amount => (
                <div key={amount.id}>
                  <AmountButton
                    id={amount.id}
                    value={amount.amount}
                    name="coffeeOutput"
                    onClick={this.handleChange}
                    type="radio"
                  />
                  <BrewAmountLabel htmlFor={amount.id}>
                    <img
                      src={require(`../assets/images/${
                        amount.amount
                      }OzCup.svg`)}
                      alt="coffee-mug-amount"
                    />
                  </BrewAmountLabel>
                </div>
              ))}
            </ButtonContainer>
            <h3>{parameters.coffeeOutput} Oz</h3>
          </Card>
          {/* How Strong Do You Like Your Coffee Section */}
          <Card>
            <QuestionMark
              src="https://img.icons8.com/ios/50/000000/help.png"
              alt="question-country"
            />
            <h3>How strong do you like your coffee?</h3>
            <BrewStrengthContainer>
              <Slider
                min={15}
                max={20}
                value={parseFloat(parameters.coffeeStrength)}
                format={formatg}
                onChange={this.handleChangeHorizontal}
              />
              <MuscleImg
                src="https://img.icons8.com/ios/50/000000/flex-biceps.png"
                alt="how-strong"
              />
            </BrewStrengthContainer>
            <h3>1: {parameters.coffeeStrength}g Coffee to water</h3>
          </Card>
          {/* How Fine Are We Grinding This? */}
          <Card>
            <QuestionMark
              src="https://img.icons8.com/ios/50/000000/help.png"
              alt="question-country"
            />
            <h3>How fine are we grinding this?</h3>
            <img src={coarseBean} alt="coffee-bean" />
            <GrindSizeContainer>
              {grindSizes.map(grindSize => {
                const isChecked = grindSize.grind === parameters.grindSize;
                return (
                  <div key={grindSize.id}>
                    <GrindSizeButton
                      id={grindSize.id}
                      value={grindSize.grind}
                      name="grindSize"
                      onClick={this.handleChange}
                      type="radio"
                      checked={isChecked}
                      readOnly
                    />
                    <GrindSizeLabel htmlFor={grindSize.id}>
                      <span>{grindSize.grind}</span>
                      <GrindText>{grindSize.text}</GrindText>
                    </GrindSizeLabel>
                  </div>
                );
              })}
            </GrindSizeContainer>
          </Card>
          {/* Start Button */}
          <StartButton type="submit">Let&apos;s Get Brewing!</StartButton>
        </form>
      </div>
    );
  }
}

export default Brewing;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 24px;
  padding: 10px;
  width: 300px;
  height: auto;
  background-color: #f3f1ee;
  color: #2f2923;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
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

const BrewMethodContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const GrindSizeContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const BrewStrengthContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BrewMethodLabel = styled.label`
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
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const BrewMethodButton = styled.input`
  display: none;
  margin: 10px 0;
  &:checked + ${BrewMethodLabel} {
    background: #67615a;
  }
`;

const BrewAmountLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  width: 75px;
  height: 60px;
  border-radius: 15px;
  margin: 10px;
`;

const AmountButton = styled.input`
  display: none;
  margin: 10px 0;
`;

const GrindSizeLabel = styled.label`
  display: flex;
  flex-direction: column;
  justidtalign-items: center;
  background-color: #67615a;
  font-weight: bold;
  color: white;
  width: 125px;
  height: 70px;
  border-radius: 3px;
  margin: 10px;
`;
const GrindSizeButton = styled.input`
  margin: 10px 0;
  display: none;
  &:checked + ${GrindSizeLabel} {
    background: #85817d;
  }
`;

const GrindText = styled.span`
  font-size: 14px;
  font-weight: 500;
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
  &:hover {
    cursor: pointer;
  }
`;

const StartButton = styled.button`
  background: #67615a;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 3px;
  margin: 20px 0;
  width: 200px;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const QuestionMark = styled.img`
  width: 20px;
  height: 20px;
`;

const MuscleImg = styled.img`
  width: 38px;
  height: 37px;
  margin: 0 10px;
`;
