import React from 'react';
import styled from 'styled-components';

import Tags from '../../atoms/Tags';

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

const PIET_VERSIONS_OPTIONS = [
  { label: 'Piet@1.0', value: '1.0' },
  { label: 'Piet@1.1', value: '1.1' },
];

export default () => {
  return (
    <Wrap>
      <Title>
        Piet Editor
      </Title>

      <Tags options={PIET_VERSIONS_OPTIONS} value={'1.0'} onChange={() => {}} />
    </Wrap>
  );
};
