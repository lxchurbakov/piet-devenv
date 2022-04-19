import React from 'react';
import styled from 'styled-components';

import { ACTIONS } from '../../../libs/piet';

const Wrap = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
`;

const HeaderRow = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const HeaderItem = styled.div`
  width: 100%;
  text-align: ${props => props.center ? 'center' : 'left'};
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const RowLeft = styled.div`
  width: 100%;
`;

const Item = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;

  color: ${props => props.color};
`;

export default ({ palette, color }) => {
  return (
    <Wrap>
      <HeaderRow>
        <HeaderItem style={{fontWeight: 'bold'}}>Commands</HeaderItem>
        <HeaderItem style={{ color: '#777'}} center>0</HeaderItem>
        <HeaderItem style={{ color: '#777'}} center>1</HeaderItem>
        <HeaderItem style={{ color: '#777'}} center>2</HeaderItem>
      </HeaderRow>

      {ACTIONS.map((row, i) => (
        <Row key={i}>
          <RowLeft style={{ color: '#777'}} >{i}</RowLeft>
          {row.map((action, j) => (
            <Item key={action} color={palette[(6 + i + color[0]) % 6][(3 + j + color[1]) % 3]}>{action || 'nope'}</Item>
          ))}
        </Row>
      ))}
    </Wrap>
  );
};
