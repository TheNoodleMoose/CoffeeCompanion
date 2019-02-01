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

  handleParameterState = async (props) => {
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

  handleSetupState = () => {
    this.setState({
      SetupComplete: true,
    });
  };

  render() {
    const { CoffeeParameters, SetupComplete, steps } = this.state;
    const { history } = this.props;

    if (SetupComplete) {
      return <Timer userParameters={this.state.userParameters} />;
    }
    if (CoffeeParameters) {
      return (
        <Setup
          handleSetupState={this.handleSetupState}
          steps={steps.data.BrewSteps}
          userParameters={this.state.userParameters}
        />
      );
    }
    return <Brewing handleParameterState={this.handleParameterState} history={history} />;
  }
}

export default withAuth(HomeBrew);
