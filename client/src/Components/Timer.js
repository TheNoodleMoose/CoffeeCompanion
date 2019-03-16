import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AuthHelperMethods from '../services/AuthenticationService';

class Timer extends Component {
  state = {
    timerStarted: false,
    timer: 0,
    stage: 0,
    brewSteps: [
      {
        id: 1,
        name: 'Do A Thing',
        SvgPath: 'Kettle',
        time: 5,
      },
      {
        id: 2,
        name: 'Do Another Thing',
        SvgPath: 'Grinder',
        time: 10,
      },
      {
        id: 3,
        name: 'Do The Last Thing',
        SvgPath: 'wetFilter',
        time: 15,
      },
      {
        id: 4,
        name: 'Enjoy Your Coffee!',
        SvgPath: 'coarse_bean',
        time: 20,
      },
    ],
  };

  Auth = new AuthHelperMethods();

  componentWillMount() {
    const newSteps = this.props.steps.map((step) => {
      const { StepTitle, SubText } = step;
      const { grindSize, coffeeOutput, coffeeStrength } = this.props.userParameters;

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

  componentDidUpdate() {
    this.UpdateSteps();
  }

  UpdateSteps = () => {
    const { brewSteps, stage, timer } = this.state;
    if (timer === brewSteps[stage].time && stage < brewSteps.length - 1) {
      console.log(brewSteps[stage]);
      this.setState({
        stage: stage + 1,
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

  finishBrew = async () => {

    const { userParameters } = this.props;
    const { timer } = this.state;
    const user = this.Auth.getConfirm();
    console.log(user);
    const data = await axios.post('/journal', {
      userParameters,
      timer,
      user,
    })
  };

  render() {
    const { brewSteps, stage, timerStarted } = this.state;
    return (
      <div>
        <TimerText>
          {this.getMinutes()}:{this.getSeconds()}
        </TimerText>
        <StartButton type="button" onClick={this.changeTimer}>
          {timerStarted ? 'Stop' : 'Start'}
        </StartButton>
        <Card>
          <h3>{brewSteps[stage].StepTitle}</h3>
          <img
            src={require(`../assets/images/${brewSteps[stage].SvgPath}.svg`)}
            alt={brewSteps[stage].SvgPath}
          />
          <h3>{brewSteps[stage].SubText}</h3>
        </Card>
        <StartButton type="button" onClick={this.finishBrew}>
          Finish
        </StartButton>
      </div>
    );
  }
}

export default Timer;

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
