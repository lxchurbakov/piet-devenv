import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 12px;
`;

const MetaContainer = styled.div`

`;

const MetaRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MetaLabel = styled.div`
  font-size: 16px;
  color: #333;
`;

const MetaValue = styled.div`
  font-size: 16px;
  color: #333;
`;

export default ({ ...props }) => {
  return (
    <Wrap {...props}>
      <Title>Your Program</Title>

      <MetaContainer>
        <MetaRow>
          <MetaLabel>Dimensions</MetaLabel>
          <MetaValue>13x13</MetaValue>
        </MetaRow>
        <MetaRow>
          <MetaLabel>Palette</MetaLabel>
          <MetaValue>Classic</MetaValue>
        </MetaRow>
      </MetaContainer>
    </Wrap>
  );
};
