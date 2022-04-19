import React from 'react';
import styled from 'styled-components';

import Header from './components/molecules/Header';
import PluggableEditor from './components/molecules/PluggableEditor';

// import ProgramMeta from './components/molecules/ProgramMeta';
// import PietEditor from './components/molecules/PietEditor';
// import ColorPicker from './components/molecules/ColorPicker';
// import ExecutionInformation from './components/molecules/ExecutionInformation';
// import Palette from './components/molecules/Palette';
// import CommandTable from './components/molecules/CommandTable';

// import { execute } from './libs/piet';

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  gap: 48px;
`;

const LeftPanel = styled.div`
  width: 100%;
`;

const RightPanel = styled.div`
  width: 300px;
  flex-shrink: 0;
`;

const Console = styled.div`
  width: 100%;
`;

export default () => {
  return (
    <Container>
      <Header />

      <Content>
        <LeftPanel>
          <PluggableEditor />
        </LeftPanel>

        <RightPanel>
          Right
        </RightPanel>
      </Content>

      <Console>
        Console
      </Console>
    </Container>
  );
};
