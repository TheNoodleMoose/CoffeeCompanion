import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

const JournalCard = ({ entry }) => {
  const {
    Coffee,
    Roaster,
    BrewMethod,
    GrindSize,
    CoffeeIn,
    CoffeeOut,
    BrewTime,
    createdAt,
    CoffeeOunces,
  } = entry;

  return (
    <Container>
      <Card>
        <CoffeeText>
          {Coffee} ({Roaster})
        </CoffeeText>
        <BrewMethodText>
          {BrewMethod} ({CoffeeOunces}oz)
        </BrewMethodText>
        <GrindSizeText>{GrindSize}</GrindSizeText>
        <CoffeeGramText>
          {CoffeeIn}g / {CoffeeOut}g
        </CoffeeGramText>
        <BrewTimeText>
          {Math.floor(BrewTime / 60)}:{`0${BrewTime % 60}`.slice(-2)}
        </BrewTimeText>
        <DateText>{moment(createdAt).format('ddd, MMM DD')}</DateText>
      </Card>
    </Container>
  );
};

JournalCard.propTypes = {
  entry: PropTypes.shape({
    Coffee: PropTypes.string,
    Roaster: PropTypes.string,
    BrewMethod: PropTypes.string,
    GrindSize: PropTypes.string,
    CoffeeIn: PropTypes.number,
    CoffeeOut: PropTypes.number,
    BrewTime: PropTypes.number,
    createdAt: PropTypes.string,
    CoffeeOunces: PropTypes.string,
  }),
};

export default JournalCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Card = styled.div`
  position: relative;
  max-width: 384px;
  width: 95%;
  height: 115px;
  margin-bottom: 24px;
  background: #f3f1ee;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

const BrewMethodText = styled.h1`
  width: 200px;
  position: absolute;
  right: 12px;
  top: 26px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  margin: 0;
`;

const CoffeeText = styled.p`
  width: 250px;
  position: absolute;
  right: 12px;
  top: 6px;
  font-size: 16px;
  text-align: right;
  margin: 0;
`;

const GrindSizeText = styled.p`
  width: 150px;
  position: absolute;
  right: 12px;
  top: 56px;
  font-size: 14px;
  text-align: right;
  margin: 0;
`;

const CoffeeGramText = styled.p`
  width: 100px;
  position: absolute;
  right: 12px;
  top: 72px;
  font-size: 14px;
  text-align: right;
  margin: 0;
`;

const BrewTimeText = styled.p`
  position: absolute;
  top: 90px;
  right: 12px;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`;

const DateText = styled.h1`
  position: absolute;
  top: 34px;
  left: 12px;
  margin: 0;
  font-size: 30px;
`;
