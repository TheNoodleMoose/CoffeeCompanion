import React, { Component } from 'react';
import styled from 'styled-components';

class Setup extends Component {
  state = {};

  componentWillMount() {
    const newSteps = this.props.steps.map((step) => {
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

  componentDidMount() { }

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
            <img src={require(`../assets/images/${step.SvgPath}.svg`)} alt={step.SvgPath} />
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
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
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
