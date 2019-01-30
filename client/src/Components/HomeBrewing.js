import React, { Component } from 'react';
import Brewing from './Brewing';
import Setup from './Setup';
import Timer from './Timer';
import withAuth from './withAuth';

class HomeBrew extends Component {
  state = {
    CoffeeParameters: false,
    SetupComplete: false,
    userParameters: {},
  };

  handleParameterState = (props) => {
    this.setState({
      CoffeeParameters: true,
      userParameters: props,
    });
  };

  handleSetupState = () => {
    const { userParameters } = this.state;
    const { coffeeOutput, coffeeStrength } = userParameters;
    this.calcInput(coffeeOutput, coffeeStrength);
    this.setState({
      SetupComplete: true,
    });
  };

  calcInput = (output, strength) => {
    console.log(output, strength);
    const coffeeInput = (parseFloat(output) * 29.57) / parseFloat(strength);
    console.log(coffeeInput);
    this.setState({
      userParameters: {
        ...this.state.userParameters,
        coffeeInput,
      },
    });
  };

  render() {
    const { CoffeeParameters, SetupComplete } = this.state;

    if (SetupComplete) {
      return <Timer />;
    }
    if (CoffeeParameters) {
      return (
        <Setup
          handleSetupState={this.handleSetupState}
          userParameters={this.state.userParameters}
        />
      );
    }
    return <Brewing handleParameterState={this.handleParameterState} />;
  }
}

export default withAuth(HomeBrew);
