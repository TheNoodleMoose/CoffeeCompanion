/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-eval */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Setup extends Component {
  static propTypes = {
    userParameters: PropTypes.shape({
      grindSize: PropTypes.string.isRequired,
      coffeeInput: PropTypes.number.isRequired,
      coffeeStrength: PropTypes.number.isRequired,
    }),
    steps: PropTypes.arrayOf(PropTypes.object),
    handleSetupState: PropTypes.func,
  };

  state = {};

  componentWillMount() {
    const {
      // eslint-disable-next-line no-unused-vars
      userParameters: { grindSize, coffeeInput, coffeeStrength },
      steps,
    } = this.props;

    const newSteps = steps.map(step => {
      const { StepTitle, SubText } = step;

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

  componentDidMount() {}

  handleFormSubmit = event => {
    event.preventDefault();
    const { handleSetupState } = this.props;
    handleSetupState();
  };

  render() {
    const { steps } = this.state;
    const {
      userParameters: { brewMethod },
    } = this.props;
    return (
      <div>
        <h3>Setup: {brewMethod}</h3>
        {steps.map(step => (
          <Card key={step.id}>
            <h3>{step.StepTitle}</h3>
            <img
              src={require(`../assets/images/${step.SvgPath}.svg`)}
              alt={step.SvgPath}
            />
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
