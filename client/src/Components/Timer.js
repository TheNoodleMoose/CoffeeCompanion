import React, { Component } from 'react';
import styled from 'styled-components';

class Timer extends Component {
  state = {};

  render() {
    return (
      <div>
        <TimerText>00:00</TimerText>
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
