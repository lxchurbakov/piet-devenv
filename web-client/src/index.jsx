import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import ProgramMeta from './components/ProgramMeta';
import PietEditor from './components/PietEditor';
import ColorPicker from './components/ColorPicker';
import Assembler from './components/Assembler';
import Palette from './components/Palette';

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  padding: 0 25px;
  gap: 48px;
`;

const LeftPanel = styled.div`
  width: 400px;
  flex-shrink: 0;
`;

const RightPanel = styled.div`
  width: 100%;
`;

const Console = styled.div`
  width: 100%;
`;

const CLASSIC_PALETTE = {
  colors: [
    ['#FFC0C0', '#FF0000', '#C00000'],
    ['#FFFFC0', '#FFFF00', '#C0C000'],
    ['#C0FFC0', '#00FF00', '#00C000'],
    ['#C0FFFF', '#00FFFF', '#00C0C0'],
    ['#C0C0FF', '#0000FF', '#0000C0'],
    ['#FFC0FF', '#FF00FF', '#C000C0'],
  ],
  white: '#ffffff',
  black: '#000000',
};

const HELLO_WORLD = {
  dimensions: { x: 13, y: 13 },
  elements: [
    [[1, 1], [4, 0], [4, 1], [4, 2], [5, 2], [3, 2], [1, 2], [2, 2], [3, 1], [1, 1], [5, 1], [5, 2], [2, 0]],
    [[0, 0], [4, 2], [3, 1], [3, 2], [3, 0], [4, 0], [4, 1], [5, 1], [5, 2], [5, 1], [5, 2], [2, 0], [0, 0]],
    [[3, 2], [1, 1], [2, 1], [0, 1], [1, 0], [5, 0], [0, 0], [4, 0], [4, 1], [4, 2], [1, 0], [0, 0], [1, 2]],
    [[3, 0], [1, 0], [5, 0], [2, 2], [1, 1], [0, 0], [4, 0], [3, 2], [3, 0], [0, 1], [1, 1], [4, 0], [2, 2]],

    [[2, 2], [2, 1], [5, 2], [5, 1], [5, 0],  'black', 'black', 'black',  [5, 0], [0, 2], [2, 1], [4, 1], [1, 1]],
    [[5, 0], [4, 1], [1, 2], [5, 0], 'black', 'black',  [2, 0], 'black', 'black', [0, 0], [0, 1], [4, 2], [1, 2]],
    [[1, 0], [0, 1], [0, 2], [4, 0], 'black',  [2, 0],  [2, 0],  [2, 0], 'black', [1, 0], [1, 1], [5, 2], [1, 0]],
    [[5, 0], [2, 1], [2, 2], [5, 1], 'black', 'black',  [3, 1], 'black', 'black', [1, 1], [5, 1], [3, 0], [2, 0]],
    [[3, 0], [1, 1], [4, 2], [0, 2],  [1, 0], 'black',  [4, 2], 'black',  [1, 0], [1, 2], [3, 1], [4, 0], [3, 0]],

    [[3, 1], [0, 2], [3, 2], [5, 2], [5, 0], [5, 1], [2, 2], [5, 1], [5, 0], [4, 0], [3, 2], [2, 0], [1, 0]],
    [[4, 0], [5, 2], [3, 0], [4, 0], [1, 2], [1, 1], [2, 2], [3, 0], [2, 0], [1, 0], [0, 0], [2, 1], [5, 0]],
    [[1, 1], [1, 2], [3, 2], [0, 1], [0, 0], [0, 1], [0, 0], [0, 2], [0, 1], [2, 1], [3, 2], [5, 2], [5, 1]],
    [[3, 1], [3, 2], [0, 1], [0, 0], [5, 0], [5, 2], [5, 1], [1, 1], [2, 2], [1, 2], [1, 1], [3, 1], [2, 2]],
  ],
};

export default () => {
  const [program, setProgram] = React.useState(HELLO_WORLD);
  const [assembler, setAssembler] = React.useState([]);

  return (
    <Container>
      <Header />

      <Content>
        <LeftPanel>
          <ProgramMeta style={{ marginBottom: 26 }} />
          <PietEditor style={{ marginBottom: 12 }} palette={CLASSIC_PALETTE} value={program} onChange={setProgram} onUpdateAssembler={setAssembler} />

        </LeftPanel>

        <RightPanel>
          <Assembler assembler={assembler} />
        </RightPanel>
      </Content>

      <Console>
        Some Output
      </Console>

    </Container>
  );
};

// <ColorPicker />
// <Palette palette={CLASSIC_PALETTE} />
