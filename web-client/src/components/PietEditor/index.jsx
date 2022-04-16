import React from 'react';
import styled from 'styled-components';

import { execute } from './helpers';

// Program in Piet consists of 6 colors that have 3 degree of brightness + 2 colors (black and white)
// we store the colors in palette, whie the program only references them in the following manner:
// [0, 0] - the first color (red in classic palette) and the first brightness degree (light in classic palette)
// [1, 2] - the second color (yellow) and the thrid brightness degree (dark)
// 'black' - for black and 'white' - for white

const Container = styled.div`
  width: 100%;
`;

export default ({ palette, value, onChange, onUpdateAssembler, ...props }) => {
  const [path, setPath] = React.useState([]);
  const [listing, setListing] = React.useState([]);

  React.useEffect(() => {
    const data = execute(value);

    setPath(data.path);
    onUpdateAssembler(data.assembler);
    // data.output
  }, [value]);

  const canvasRef = React.useRef();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentNode;
    const { width } = parent.getBoundingClientRect();
    const height = (width / value.dimensions.x) * value.dimensions.y;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    const codelSize = { x: width / value.dimensions.x, y: height / value.dimensions.y };

    // console.log(codelSize)

    for (let y = 0; y < value.dimensions.y; ++y) {
      for (let x = 0; x < value.dimensions.x; ++x) {
        const code = value.elements[y][x];
        const color = code === 'white' ? palette.white : (code === 'black' ? palette.black : palette.colors[code[0]][code[1]]);

        context.fillStyle = color;
        context.beginPath();
        context.rect(x * codelSize.x, y * codelSize.y, codelSize.x, codelSize.y);
        context.fill();
      }
    }

    // Render the Palette borders for clarity
    context.strokeStyle = '#000000';
    context.beginPath();
    context.rect(0, 0, width, height);
    context.stroke();

    // Render path
    if (path.length >= 2) {
      context.beginPath();
      context.moveTo(path[0].x * codelSize.x + codelSize.x / 2, path[0].y * codelSize.y + codelSize.y / 2);

      for (let i = 1; i < path.length; ++i) {
        context.lineTo(path[i].x * codelSize.x + codelSize.x / 2, path[i].y * codelSize.y + codelSize.y / 2);
      }

      context.stroke();
    }
  }, [value, path]);

  const update = ([c, b]) => {
    if (b === 2) {
      c++;
      b = 0;

      if (c === 6) {
        c = 0;
      }
    } else {
      b++;
    }

    return [c, b];
  };

  // const handleClick = (e) => {
  //   const codelSize = { x: 38.461, y: 38.461 };
  //   const { clientX, clientY } = e;
  //   const x = Math.floor((clientX) / codelSize.x);
  //   const y = Math.floor((clientY - 60) / codelSize.y);
  //
  //   onChange({
  //     ...value,
  //     elements: value.elements.map((row, $y) => {
  //       return row.map((item, $x) => {
  //         if ($y === y && $x === x) {
  //           return update(item);
  //         } else {
  //           return item;
  //         }
  //       });
  //     }),
  //   });
  // };

  return (
    <Container {...props}>
      <canvas ref={canvasRef} />
    </Container>
  );
};
