import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: 120px;
`;

export default ({ palette, ...props }) => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentNode;
    const { width, height } = parent.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    const colorSize = { width: 50, height: 30 };

    // Render colors
    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < 3; ++j) {
        context.fillStyle = palette[i][j];

        context.beginPath();
        context.rect(i * colorSize.width, j * colorSize.height, colorSize.width, colorSize.height);
        context.fill();
      }
    }

    // Render black and white
    context.fillStyle = palette[6][0];
    context.beginPath();
    context.rect(0, height - colorSize.height, width / 2, colorSize.height);
    context.fill();
    context.fillStyle = palette[6][2];
    context.beginPath();
    context.rect(width / 2, height - colorSize.height, width / 2, colorSize.height);
    context.fill();

    // Render the Palette borders for clarity
    context.strokeStyle = '#000000';
    context.beginPath();
    context.rect(0, 0, width, height);
    context.stroke();
  }, []);

  return (
    <Container {...props}>
      <canvas ref={canvasRef} />
    </Container>
  );
};