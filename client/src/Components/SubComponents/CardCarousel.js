import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const CardCarousel = ({ brewSteps, stage, blinking }) => (
  <Wrapper>
    <Carousel>
      {brewSteps.map(step => (
        <Card blinking={blinking}>
          <h3>{step.StepTitle}</h3>
          <img
            src={require(`../../assets/images/${step.SvgPath}.svg`)}
            alt={step.SvgPath}
          />
          <SubText>{step.SubText}</SubText>
        </Card>
      ))}
    </Carousel>
  </Wrapper>
);

export default CardCarousel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Carousel = styled.div`
  display: inline-flex;
  align-items: flex-start;
  width: 380px;
  overflow: hidden;
`;

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
  margin: 24px 30px;
  padding: 10px;
  min-width: 300px;
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
