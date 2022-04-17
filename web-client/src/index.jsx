import React from 'react';
import styled from 'styled-components';

import Header from './components/molecules/Header';
import ProgramMeta from './components/molecules/ProgramMeta';
import PietEditor from './components/molecules/PietEditor';
import ColorPicker from './components/molecules/ColorPicker';
import Assembler from './components/molecules/Assembler';
import Palette from './components/molecules/Palette';

import { execute } from './libs/piet';

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

const CLASSIC_PALETTE = [
  ['#FFC0C0', '#FF0000', '#C00000'],
  ['#FFFFC0', '#FFFF00', '#C0C000'],
  ['#C0FFC0', '#00FF00', '#00C000'],
  ['#C0FFFF', '#00FFFF', '#00C0C0'],
  ['#C0C0FF', '#0000FF', '#0000C0'],
  ['#FFC0FF', '#FF00FF', '#C000C0'],
  ['#FFFFFF', '#CCCCCC', '#111111'],
];

const HELLO_WORLD = {
  dimensions: { x: 13, y: 13 },
  elements: [
    [[1, 1], [4, 0], [4, 1], [4, 2], [5, 2], [3, 2], [1, 2], [2, 2], [3, 1], [1, 1], [5, 1], [5, 2], [2, 0]],
    [[0, 0], [4, 2], [3, 1], [3, 2], [3, 0], [4, 0], [4, 1], [5, 1], [5, 2], [5, 1], [5, 2], [2, 0], [0, 0]],
    [[3, 2], [1, 1], [2, 1], [0, 1], [1, 0], [5, 0], [0, 0], [4, 0], [4, 1], [4, 2], [1, 0], [0, 0], [1, 2]],
    [[3, 0], [1, 0], [5, 0], [2, 2], [1, 1], [0, 0], [4, 0], [3, 2], [3, 0], [0, 1], [1, 1], [4, 0], [2, 2]],

    [[2, 2], [2, 1], [5, 2], [5, 1], [5, 0], [6, 2], [6, 2], [6, 2], [5, 0], [0, 2], [2, 1], [4, 1], [1, 1]],
    [[5, 0], [4, 1], [1, 2], [5, 0], [6, 2], [6, 2], [2, 0], [6, 2], [6, 2], [0, 0], [0, 1], [4, 2], [1, 2]],
    [[1, 0], [0, 1], [0, 2], [4, 0], [6, 2], [2, 0], [2, 0], [2, 0], [6, 2], [1, 0], [1, 1], [5, 2], [1, 0]],
    [[5, 0], [2, 1], [2, 2], [5, 1], [6, 2], [6, 2], [3, 1], [6, 2], [6, 2], [1, 1], [5, 1], [3, 0], [2, 0]],
    [[3, 0], [1, 1], [4, 2], [0, 2], [1, 0], [6, 2], [4, 2], [6, 2], [1, 0], [1, 2], [3, 1], [4, 0], [3, 0]],

    [[3, 1], [0, 2], [3, 2], [5, 2], [5, 0], [5, 1], [2, 2], [5, 1], [5, 0], [4, 0], [3, 2], [2, 0], [1, 0]],
    [[4, 0], [5, 2], [3, 0], [4, 0], [1, 2], [1, 1], [2, 2], [3, 0], [2, 0], [1, 0], [0, 0], [2, 1], [5, 0]],
    [[1, 1], [1, 2], [3, 2], [0, 1], [0, 0], [0, 1], [0, 0], [0, 2], [0, 1], [2, 1], [3, 2], [5, 2], [5, 1]],
    [[3, 1], [3, 2], [0, 1], [0, 0], [5, 0], [5, 2], [5, 1], [1, 1], [2, 2], [1, 2], [1, 1], [3, 1], [2, 2]],
  ],
};

export default () => {
  const [color, setColor] = React.useState([0, 1]);
  const [view, setView] = React.useState('colors');
  const [program, setProgram] = React.useState(HELLO_WORLD);

  const [execution, setExecution] = React.useState({ path: [], assembler: [] });

  const changeColor = ({x,y}) => {
    setProgram((program) => {
      program.elements[y][x] = color;
      return { ...program };
    });
  };

  React.useEffect(() => {
    setExecution(execute(program));
  }, [program]);

  return (
    <Container>
      <Header />

      <Content>
        <LeftPanel>
          <ProgramMeta style={{ marginBottom: 26 }} view={view} onChangeView={setView} />
          <PietEditor path={execution.path} style={{ marginBottom: 12 }} view={view} palette={CLASSIC_PALETTE} value={program} onClick={changeColor} />
          <ColorPicker value={color} palette={CLASSIC_PALETTE} onChange={setColor} />
        </LeftPanel>

        <RightPanel>
          <Assembler assembler={execution.assembler} />
        </RightPanel>
      </Content>

      <Console>
        Some Output
      </Console>

    </Container>
  );
};
