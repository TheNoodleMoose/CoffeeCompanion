import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components';

class CardCarousel extends Component {

  state = {
    x0: null,
    drag: 0,
    locked: false,
  }

  lock = (e) => {
    const { locked } = this.state;

    this.setState({
      x0: this.unify(e).clientX,
      locked: true,
    })
  };

  move = (e) => {
    const { x0, locked } = this.state;
    const { prevStep, nextStep } = this.props;

    this.setState({
      drag: 0,
      locked: false,
    })

    if (locked) {
      const dx = this.unify(e).clientX - x0;
      const s = Math.sign(dx);

      if (s < 0) {
        nextStep();
      }

      if (s > 0) {
        prevStep();
      }

    }
    this.setState({
      x0: null,
    });
  };

  drag = (e) => {
    const { x0, locked } = this.state;

    if (locked) {
      this.setState({
        drag: Math.round(this.unify(e).clientX - x0),
      });
    }
  }

  unify = (e) => e.changedTouches ? e.changedTouches[0] : e;

  render() {
    const { drag, locked } = this.state;
    const { brewSteps, stage, blinking, sliding, position } = this.props;

    return (
      <div onMouseDown={this.lock} onTouchStart={this.lock} onMouseUp={this.move} onTouchEnd={this.move} onTouchMove={this.drag} onMouseMove={this.drag} onMouseLeave={this.move}>
        <Wrapper>
          <Carousel sliding={sliding} position={position} drag={drag} locked={locked}>
            {brewSteps.map((step, index) => {
              const activeStep = (stage === index);
              return (
                <Card blinking={blinking} isActive={activeStep} key={step.id}>
                  <h3>{step.StepTitle}</h3>
                  <img
                    src={require(`../../assets/images/${step.SvgPath}.svg`)}
                    alt={step.SvgPath}
                  />
                  <SubText>{step.SubText}</SubText>
                </Card>
              )
            })}
          </Carousel>
        </Wrapper>
      </div>
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
  transition: ${props => !props.locked ? `transform 1s ease` : `transform .01s linear`};
  transform: translateX(calc(-${props => 100 * props.position}% + ${props => props.drag}px));
`;

const blink = keyframes`
  50% {
    opacity: 0.2;
  }
`;

const animation = css`
${props => ((props.blinking && props.isActive) ? css`${blink} 2s linear infinite` : 'none')};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 28px;
  padding: 10px;
  min-width: 300px;
  height: auto;
  background-color: #f3f1ee;
  color: #2f2923;
  transition: border 1s ease;
  border: ${props => props.isActive ? `2px solid #67615A` : `2px solid #f3f1ee`};
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  animation: ${animation};
  pointer-events: none;
`;

const SubText = styled.h3`
  white-space: pre-line;
`;
