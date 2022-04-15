import React from 'react';
import styled from 'styled-components';

import Palette from '../Palette';

// Program in Piet consists of 6 colors that have 3 degree of brightness + 2 colors (black and white)
// we store the colors in palette, whie the program only references them in the following manner:
// [0, 0] - the first color (red in classic palette) and the first brightness degree (light in classic palette)
// [1, 2] - the second color (yellow) and the thrid brightness degree (dark)
// 'black' - for black and 'white' - for white

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Legend = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Content = styled.div`
  width: 960px;
  height: 960px;
  margin-bottom: 30px;
`;

const Listing = styled.div`

`;

const ListingItem = styled.div`
  font-size: 14px;
`;

// type Program = {
//   dimensions: { x: 13, y: 13 },
//   elements: [...]
// }

export default ({ palette, value, onChange }) => {
  const [path, setPath] = React.useState([]);
  const [listing, setListing] = React.useState([]);

  React.useEffect(() => {
    let dp = 'right';
    let cc = true; // turn right or left
    let stack = [];
    let previousItem = null;

    const pointer = { x: 0, y: 0 };
    const $path = [];

    for (let i = 0; i < 135; ++i) {
      $path.push({...pointer});
      const currentItem = value.elements[pointer.y][pointer.x];

      if (currentItem === 'black') {
        break;
      }

      if (!!previousItem && !!currentItem) {
        // process the difference
        const difference = { color: (6 + currentItem[0] - previousItem[0]) % 6, brightness: (3 + currentItem[1] - previousItem[1]) % 3 };
        const action = ([
          [       null,     'push',      'pop'],
          [      'add', 'subtract', 'multiply'],
          [   'divide',      'mod',      'not'],
          [  'greater',  'pointer',   'switch'],
          ['duplicate',     'roll',    'innum'],
          [   'inchar',   'outnum',  'outchar'],
        ])[difference.color][difference.brightness];

        // Let's compile the program
        if (action === 'push') {
          stack.push(1);
        }

        if (action === 'pop') {
          if (stack.length >= 1) {
            stack.pop();
          } else {
            console.log(`Action ${action} is called with incorrect stack!`);
          }
        }

        if (action === 'add') {
          if (stack.length >= 2) {
            stack.push(stack.pop() + stack.pop());
          } else {
            console.log(`Action ${action} is called with incorrect stack!`);
          }
        }

        if (action === 'subtract') {
          if (stack.length >= 2) {
            stack.push(stack.pop() - stack.pop());
          } else {
            console.log(`Action ${action} is called with incorrect stack!`);
          }
        }

        if (action === 'multiply') {
          if (stack.length >= 2) {
            stack.push(stack.pop() * stack.pop());
          } else {
            console.log(`Action ${action} is called with incorrect stack!`);
          }
        }

        if (action === 'divide') {
          if (stack.length >= 2) {
            stack.push(stack.pop() / stack.pop());
          } else {
            console.log(`Action ${action} is called with incorrect stack!`);
          }
        }

        if (action === 'mod') {
          if (stack.length >= 2) {
            stack.push(stack.pop() % stack.pop());
          } else {
            console.log(`Action ${action} is called with incorrect stack!`);
          }
        }

        if (action === 'not') {
          if (stack.length >= 2) {
            stack.push(!stack.pop() ? 1 : 0);
          } else {
            console.log(`Action ${action} is called with incorrect stack!`);
          }
        }

        if (action === 'greater') {
          if (stack.length >= 2) {
            stack.push(stack.pop() > stack.pop() ? 1 : 0);
          } else {
            console.log(`Action ${action} is called with incorrect stack!`);
          }
        }

        if (action === 'pointer') {
          const shit = stack.pop();

          if (dp === 'right') {
            dp = 'bottom';
          } else if (dp === 'top') {
            dp = 'right';
          } else if (dp === 'left') {
            dp = 'top';
          } else if (dp === 'bottom') {
            dp = 'left';
          }
        }

        if (action === 'switch') {
          cc = !cc;
        }

        if (action === 'duplicate') {
          if (stack.length >= 1) {
            const value = stack.pop();

            stack.push(value);
            stack.push(value);
          } else {
            console.log(`Action ${action} is called with incorrect stack!`);
          }
        }

        if (action === 'roll') {
          let n = stack.pop();
          const m = stack.pop();

          while (n > 0) {
            const top = stack[stack.length - 1];
            stack = [].concat(stack.slice(0, stack.length - m)).concat([top]).concat(stack.slice(stack.length - m));
            stack.pop();


            // const last = stack.length - 1;
            // [stack[last], stack[m]]
            // stack = [].concat(stack.slice(0, stack.length - m)).concat([n]).concat(stack.slice(stack.length - m));

            n--;
          }


        }

        if (action === 'innum' || action === 'inchar') {
          // console.log('IN not implemented')
        }

        if (action === 'outnum' || action === 'outchar') {
          // console.log(`${action}: ${stack.pop()}`)
          console.log(String.fromCharCode(stack.pop()))
          // stack.pop();
        }

        // console.log(`${i}: ${action} | ${stack.join(' ')}`);
        // console.log(`${i}: ${action} ${stack.join(' ')} (${shouldBe[i - 1]})`);
        // console.log(action)
      }



      if (dp === 'right') {
        pointer.x++;
      }
      if (dp === 'left') {
        pointer.x--;
      }
      if (dp === 'top') {
        pointer.y--;
      }
      if (dp === 'bottom') {
        pointer.y++;
      }

      previousItem = currentItem;
    }


    // We start at the very first top item
    // console.log('parse program', value);
    setPath($path);
  }, [value]);

  const canvasRef = React.useRef();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentNode;
    const { width, height } = parent.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    const codelSize = { x: width / value.dimensions.x, y: height / value.dimensions.y };

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

  return (
    <Container>
      <Legend>
        <Title>Piet Program Editor</Title>
        <Palette palette={palette} />
      </Legend>

      <Content>
        <canvas ref={canvasRef} />
      </Content>

      <Listing>
        {listing.map((listingItem) => (
          <ListingItem>{listingItem}</ListingItem>
        ))}
      </Listing>
    </Container>
  );
};