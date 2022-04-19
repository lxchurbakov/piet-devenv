import React from 'react';
import styled from 'styled-components';

import Tags from '../../atoms/Tags';

const VIEW_OPTIONS = [
  { label: 'Colors', value: 'colors' },
  { label: 'Values', value: 'values' },
  { label: 'Gradient', value: 'gradient' },
];

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

export default ({ view, onChangeView, ...props }) => {
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

        <Tags options={VIEW_OPTIONS} value={view} onChange={onChangeView} />
      </MetaContainer>
    </Wrap>
  );
};
