import React, { Component } from 'react';
import styled from 'styled-components';

class Setup extends Component {
  state = {
    steps: [
      {
        id: 1,
        StepTitle: 'Boil some water',
        SubText: 'Boil more than you need',
        photopath: 'Kettle',
      },
      {
        id: 2,
        StepTitle: 'Grind ${coffeeInput}g of your coffee',
        SubText: 'Grind on ${grindSize}',
        photopath: 'Grinder',
      },
      {
        id: 3,
        StepTitle: 'Wet your filter with hot water',
        SubText: 'Dump the water out of your mug afterwards',
        photopath: 'wetFilter',
      },
      {
        id: 4,
        StepTitle: 'Put the coffee grounds in the filter',
        SubText: 'Make sure the bed is level in the filter',
        photopath: 'fillFilter',
      },
    ],
  };

  componentWillMount() {
    const newSteps = this.state.steps.map((step) => {
      const { StepTitle, SubText } = step;
      const { grindSize, coffeeInput, coffeeStrength } = this.props.userParameters;

      const newStep = {
        ...step,
        StepTitle: eval(`\`${StepTitle}\``),
        SubText: eval(`\`${SubText}\``),
      };
      return newStep;
    });
    this.setState({
      steps: newSteps,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { handleSetupState } = this.props;
    handleSetupState();
  };

  render() {
    const { steps, usersBrewMethod } = this.state;
    const { brewMethod } = this.props.userParameters;
    return (
      <div>
        <h3>Setup: {brewMethod}</h3>
        {steps.map(step => (
          <Card key={step.id}>
            <h3>{step.StepTitle}</h3>
            <img src={require(`../assets/images/${step.photopath}.svg`)} alt={step.photopath} />
            <h3>{step.SubText}</h3>
          </Card>
        ))}
        <form onSubmit={this.handleFormSubmit}>
          <StartButton type="submit">Let&apos;s Get Brewing!</StartButton>
        </form>
      </div>
    );
  }
}

export default Setup;

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
  box-shadow: 1px 4px 21px 2px rgba(224, 208, 224, 1);
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
`;
