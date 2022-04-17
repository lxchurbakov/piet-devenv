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
  color: ${props => props.color};
  font-size: 14px;
  margin-right: 2px;
`;

const Square = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${props => props.palette[props.color[0]][props.color[1]]};
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

export default ({ value, onChange, palette }) => {
  const [color, brightness] = value;
  const colorCode = [String.fromCharCode(color + '1'.charCodeAt(0)), String.fromCharCode(brightness + 'a'.charCodeAt(0))].join('');

  return (
    <Wrap>
      <LeftSide>
        <Title>Color</Title>

        <Square palette={palette} color={value}>
          <Value color={brightness === 0 ? '#111' : '#fff'}>{colorCode}</Value>
        </Square>
      </LeftSide>

      <Center>
        {[0,1,2].filter(($b) => $b !== brightness).map(($b) => (
          <Square key={$b} palette={palette} color={[color, $b]} onClick={() => onChange([color, $b])} />
        ))}
        <Square palette={palette} color={[6,0]} onClick={() => onChange([6, 0])} />
        <Square palette={palette} color={[6,1]} onClick={() => onChange([6, 1])} />
        <Square palette={palette} color={[6,2]} onClick={() => onChange([6, 2])} />
      </Center>

      <RightSide>
        {[0,1,2,3,4,5].filter(($c) => $c !== color).map(($c) => (
          <Square key={$c} palette={palette} color={[$c, brightness]} onClick={() => onChange([$c, brightness])}/>
        ))}
      </RightSide>
    </Wrap>
  );
};
