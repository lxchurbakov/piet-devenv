import React from 'react';
import styled from 'styled-components';

const MAIN_COLOR = '#053858';

const Wrap = styled.div`
  padding: 25px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
`;

const Tags = styled.div`
  display: flex;
  gap: 12px;
`;

const Tag = styled.div`
  font-size: 14px;
  border-radius: 20px;
  padding: 8px 12px;

  color: ${props => props.active ? '#fff' : MAIN_COLOR};
  background: ${props => props.active ? MAIN_COLOR : '#fff'};
  border: ${props => props.active ? 'none' : `1px solid ${MAIN_COLOR}`};

  cursor: pointer;
`;

export default () => {
  return (
    <Wrap>
      <Title>
        Piet Editor
      </Title>

      <Tags>
        <Tag active>Piet@1.0</Tag>
        <Tag>Piet@2.0</Tag>
      </Tags>
    </Wrap>
  );
};
