import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  background: #053858;
  border-radius: 4px;
  padding: 10px 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  user-select: none;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  color: #fff;
  font-size: 16px;
  margin-right: 16px;
`;

const Value = styled.div`
  color: #fff;
  font-size: 14px;
  margin-right: 2px;
`;

const Square = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${props => props.color};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export default () => {
  return (
    <Wrap>
      <LeftSide>
        <Title>Color</Title>

        <Square color="red">
          <Value>1a</Value>
        </Square>
      </LeftSide>

      <Center>
        <Square color="red" />
        <Square color="red" />
        <Square color="black" />
      </Center>

      <RightSide>
        <Square color="red" />
        <Square color="red" />
        <Square color="red" />
        <Square color="red" />
        <Square color="red" />
      </RightSide>
    </Wrap>
  );
};
