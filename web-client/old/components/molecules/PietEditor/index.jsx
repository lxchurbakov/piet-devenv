import React from 'react';
import styled from 'styled-components';

// import { execute } from './helpers';
import { getColorCode } from '../../../libs/utils';
import { getItemsDifference } from '../../../libs/piet';

const Container = styled.div`
  width: 100%;
`;

export default ({ path, view, palette, value, onClick, ...props }) => {
  const canvasRef = React.useRef();
  const meta = React.useRef();

  React.useEffect(() => {
    meta.current = {};

    const canvas = canvasRef.current;
    const parent = canvas.parentNode;
    const rect = parent.getBoundingClientRect();
    const { width } = rect;
    const height = (width / value.dimensions.x) * value.dimensions.y;

    // console.log(width, height)

    // const pixelDensity = window.devicePixelRatio || 1.0;
    //
    // canvas.width = width * pixelDensity;
    // canvas.height = height * pixelDensity;
    //
    // context.scale(1/pixelDensity, 1/pixelDensity);

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    const codelSize = { x: width / value.dimensions.x, y: height / value.dimensions.y };

    // Render the codels themselves
    context.font = '14px Ubuntu Mono';
    context.fillStyle = "#111";
    context.textAlign = 'center';

    for (let y = 0; y < value.dimensions.y; ++y) {
      for (let x = 0; x < value.dimensions.x; ++x) {
        if (view === 'colors') {
          const code = value.elements[y][x];
          const color = palette[code[0]][code[1]];

          context.fillStyle = color;
          context.beginPath();
          context.rect(x * codelSize.x, y * codelSize.y, codelSize.x, codelSize.y);
          context.fill();
        }

        if (view === 'values') {
          const code = value.elements[y][x];
          // const text = getColorCode(code);
          const text = code[0] * 3 + code[1];

          context.fillText(text, x * codelSize.x + codelSize.x / 2, y * codelSize.y + codelSize.y / 2 + 5);
        }

        if (view === 'gradient') {
          const code = value.elements[y][x];
          const currentPathIndex = path.findIndex((p) => p.x === x && p.y === y);
          const previousCodelPosition = path[currentPathIndex - 1];

          if (previousCodelPosition) {
            const previousCode = value.elements[previousCodelPosition.y][previousCodelPosition.x];
            const difference = getItemsDifference(code, previousCode);
            const text = [difference.color.toString(), difference.brightness.toString()].join('/');

            context.fillText(text, x * codelSize.x + codelSize.x / 2, y * codelSize.y + codelSize.y / 2 + 5);
          }
        }
      }
    }

    // Render the borders of the canvas for better visual experience
    context.strokeStyle = '#555';
    context.beginPath();
    context.rect(0, 0, width, height);
    context.stroke();

    // Now we render the path, but only if it has more than
    // 2 entries (otherwise not command were executed)
    if (path.length >= 2) {
      context.setLineDash([2, 6]);
      context.beginPath();
      context.moveTo(path[0].x * codelSize.x + codelSize.x / 2, path[0].y * codelSize.y + codelSize.y / 2);

      for (let i = 1; i < path.length; ++i) {
        context.lineTo(path[i].x * codelSize.x + codelSize.x / 2, path[i].y * codelSize.y + codelSize.y / 2);
      }

      context.stroke();
    }

    meta.current.rect = rect;
    meta.current.codelSize = codelSize;
  }, [view, value, path]);

  const handleClick = React.useCallback((e) => {
    const { clientX, clientY } = e;
    const x = Math.floor((clientX - meta.current.rect.left) / meta.current.codelSize.x);
    const y = Math.floor((clientY - meta.current.rect.top) / meta.current.codelSize.y);

    onClick({ x, y });
  });

  return (
    <Container {...props}>
      <canvas ref={canvasRef} onClick={handleClick} />
    </Container>
  );
};
