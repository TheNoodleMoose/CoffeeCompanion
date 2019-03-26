import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const CardCarousel = ({ brewSteps, stage, blinking }) => (
  <Card blinking={blinking}>
    <h3>{brewSteps[stage].StepTitle}</h3>
    <img
      src={require(`../../assets/images/${brewSteps[stage].SvgPath}.svg`)}
      alt={brewSteps[stage].SvgPath}
    />
    <SubText>{brewSteps[stage].SubText}</SubText>
  </Card>
);

export default CardCarousel;

const blink = keyframes`
  50% {
    opacity: 0.2;
  }
`;

const animation = css`
${props => (props.blinking ? css`${blink} 2s linear infinite` : 'none')};
`;

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
  animation: ${animation};
`;

const SubText = styled.h3`
  white-space: pre-line;
`;
