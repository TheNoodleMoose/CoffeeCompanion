import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components';

class CardCarousel extends Component {

  getOrder = (itemIndex) => {
    const { brewSteps, stage, blinking } = this.props;

    const numItems = brewSteps.length || 1;

    if (itemIndex - stage < 0) {
      return numItems - Math.abs(itemIndex - stage);
    }
    return itemIndex - stage;
  };

  render() {
    const { brewSteps, stage, blinking, sliding } = this.props;

    return (
      <Wrapper>
        <Carousel sliding={sliding}>
          {brewSteps.map((step, index) => (
            <Card blinking={blinking} order={this.getOrder(index)}>
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
  }
};

export default CardCarousel;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Carousel = styled.div`
  display: inline-flex;
  align-items: flex-start;
  width: 380px;
  transition: ${props => props.sliding ? `none` : `transform 1s ease`};
  transform: ${props => props.sliding ? `translateX(0%)` : `translateX(-100%)`};
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
  order: ${props => props.order}
`;

const SubText = styled.h3`
  white-space: pre-line;
`;
