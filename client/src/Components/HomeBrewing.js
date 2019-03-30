import React, { Component } from 'react';
import axios from 'axios';
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

  handleParameterState = async props => {
    const Steps = await axios.post('/getsteps', {
      BrewMethod: props.brewMethod,
    });
    console.log(props);
    console.log(Steps);
    this.setState({
      CoffeeParameters: true,
      userParameters: props,
      steps: Steps,
    });
  };

  handleSetupState = async () => {
    const {
      userParameters: { brewMethod },
    } = this.state;
    const Steps = await axios.post('/gettimesteps', {
      BrewMethod: brewMethod,
    });

    this.setState({
      SetupComplete: true,
      timeSteps: Steps,
    });
  };

  render() {
    const {
      CoffeeParameters,
      SetupComplete,
      steps,
      timeSteps,
      userParameters,
    } = this.state;

    if (SetupComplete) {
      return <Timer steps={timeSteps.data} userParameters={userParameters} />;
    }
    if (CoffeeParameters) {
      return (
        <Setup
          handleSetupState={this.handleSetupState}
          steps={steps.data}
          userParameters={userParameters}
        />
      );
    }
    return <Brewing handleParameterState={this.handleParameterState} />;
  }
}

export default withAuth(HomeBrew);
