/* eslint-disable no-eval */
import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthHelperMethods from '../services/AuthenticationService';
import CardCarousel from './SubComponents/CardCarousel';

class Timer extends Component {
  static propTypes = {
    userParameters: PropTypes.shape({
      grindSize: PropTypes.string.isRequired,
      coffeeInput: PropTypes.string.isRequired,
      coffeeStrength: PropTypes.string.isRequired,
    }),
    steps: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    timerStarted: false,
    timer: 0,
    stage: 0,
    position: 0,
    finishedBrew: false,
    blinking: false,
    brewSteps: [],
  };

  Auth = new AuthHelperMethods();

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
      brewSteps: newSteps,
    });
  }

  componentDidMount() {
    this.UpdateSteps();
    this.getMinutes();
    this.getSeconds();
  }

  UpdateSteps = () => {
    const { brewSteps, stage, timer } = this.state;
    if (timer >= brewSteps[stage].time - 10 && stage < brewSteps.length - 1) {
      this.setState({
        blinking: true,
      });
    }

    if (timer === brewSteps[stage].time && stage < brewSteps.length - 1) {
      this.setState({
        stage: stage + 1,
        position: stage + 1,
        blinking: false,
      });
    }
  };

  startTimer = () => {
    const { brewSteps, stage } = this.state;
    if (brewSteps.length === stage - 1) {
      this.stopTimer();
    }
    this.setIncrement = setInterval(() => {
      this.getMinutes();
      this.getSeconds();
      this.setState(prevState => ({
        timer: prevState.timer + 1,
      }));
      this.UpdateSteps();
    }, 1000);
  };

  getMinutes = () => {
    const { timer } = this.state;
    return Math.floor(timer / 60);
  };

  getSeconds = () => {
    const { timer } = this.state;
    return `0${timer % 60}`.slice(-2);
  };

  changeTimer = () => {
    const { timerStarted } = this.state;
    if (timerStarted === true) {
      this.stopTimer();
    }
    if (timerStarted === false) {
      this.startTimer();
    }
    this.setState({
      timerStarted: !timerStarted,
    });
  };

  stopTimer = () => {
    clearInterval(this.setIncrement);
  };

  nextStep = () => {
    const { position, brewSteps } = this.state;
    const numItems = brewSteps.length || 1;

    this.setState({
      position: position === numItems - 1 ? position : position + 1,
    });
  };

  prevStep = () => {
    const { position } = this.state;

    this.setState({
      position: position === 0 ? position : position - 1,
    });
  };

  finishBrew = async () => {
    const { userParameters } = this.props;
    const { timer } = this.state;
    const user = this.Auth.getConfirm();
    console.log(user);
    const data = await axios.post('/journal', {
      userParameters,
      timer,
      user,
    });

    if (data) {
      this.setState({
        finishedBrew: true,
      });
    }
  };

  render() {
    const {
      brewSteps,
      stage,
      timerStarted,
      finishedBrew,
      blinking,
      position,
    } = this.state;

    if (finishedBrew === true) {
      return <Redirect push to="/journal" />;
    }

    return (
      <div>
        <TimerText>
          {this.getMinutes()}:{this.getSeconds()}
        </TimerText>
        <StartButton type="button" onClick={this.changeTimer}>
          {timerStarted ? 'Stop' : 'Start'}
        </StartButton>
        <CardCarousel
          position={position}
          brewSteps={brewSteps}
          stage={stage}
          blinking={blinking}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
        />
        <StartButton type="button" onClick={this.prevStep}>
          Previous
        </StartButton>
        <StartButton type="button" onClick={this.nextStep}>
          Next
        </StartButton>
        <StartButton type="button" onClick={this.finishBrew}>
          Finish
        </StartButton>
      </div>
    );
  }
}

export default Timer;

const TimerText = styled.h1`
  font-size: 50px;
  color: #2f2923;
  font-weight: 500;
  margin: 0 auto;
  margin-top: 30px;
  width: 200px;
  border-bottom: 2px solid #2f2923;
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
