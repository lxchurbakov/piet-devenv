const RIGHT = 0, BOTTOM = 1, LEFT = 2, TOP = 3;

// Rotate the direction itself
// (we abuse the numerous nature behind the values)
const rotateDirection = (direction, times) => {
  return (direction + times) % 4;
};

// Two methods to change controls (switch and poitner instructions)
const rotateControls = ({ direction, cc }, times) => ({ cc, direction: rotateDirection(direction, times) });
const swapControls = ({ direction, cc}) => ({ direction, cc: !cc });

const applyControls = (pointer, controls) => {
  const x = pointer.x + [1, 0, -1, 0][controls.direction];
  const y = pointer.y + [0, 1, 0, -1][controls.direction];

  return { x, y };
};

// Few methods
const getItemOnPointer = (pointer, program) => {
  return program.elements[pointer.y][pointer.x];
};

export const getItemsDifference = (current, previous) => {
  return {
    color: (6 + current[0] - previous[0]) % 6,
    brightness: (3 + current[1] - previous[1]) % 3,
  };
};

const getActionByDifference = ({ color, brightness }) => {
  return [
    [ null, 'pus', 'pop'],
    ['add', 'sub', 'mul'],
    ['div', 'mod', 'not'],
    ['gre', 'poi', 'swi'],
    ['dup', 'rol', 'inn'],
    ['ich', 'onn', 'och'],
  ][color][brightness];
};

const rollStack = (stack) => {
  let n = stack.pop();
  let m = stack.pop();

  while (n > 0) {
    const top = stack[stack.length - 1];

    stack = [].concat(stack.slice(0, stack.length - m)).concat([top]).concat(stack.slice(stack.length - m));
    stack.pop();

    n--;
  }
};

export const execute = (program) => {
  // Generate controls to figure out where to go
  // a pointer, where we are and stack for the stack machine itself
  let controls = { direction: RIGHT, cc: true };
  let pointer = { x: 0, y: 0 };
  let stack = [];

  // Store the output and the path
  let output = [];
  let path = [pointer];
  let assembler = [];

  // Find the current item and start processing the differences
  let previousItem = getItemOnPointer(pointer, program);
  pointer = applyControls(pointer, controls);

  while (true) {
    path.push(pointer);
    let itemOnPointer = getItemOnPointer(pointer, program);

    // We finish the flow once we see black item,
    // but this is not correct, TODO
    if (itemOnPointer[0] === 6) {
      break;
    }

    const difference = getItemsDifference(itemOnPointer, previousItem);
    const action = getActionByDifference(difference);

    // TODO this is not correct as well lol
    if (!action) {
      break;
    }

    // TODO add checks for errors
    ;({
      pus: () => stack.push(1),
      pop: () => stack.pop(),
      dup: () => ((v) => {stack.push(v); stack.push(v)})(stack.pop()),
      rol: () => rollStack(stack),

      add: () => stack.push(stack.pop() + stack.pop()),
      sub: () => stack.push(stack.pop() - stack.pop()),
      mul: () => stack.push(stack.pop() * stack.pop()),
      div: () => stack.push(stack.pop() / stack.pop()),
      mod: () => stack.push(stack.pop() % stack.pop()),
      not: () => stack.push(!!stack.pop() ? 0 : 1),
      gre: () => stack.push(stack.pop()  > stack.pop() ? 1 : 0),

      poi: () => { controls = rotateControls(controls, stack.pop()); },
      swi: () => { controls = swapControls(controls, stack.pop()); },

      ich: () => {},
      inn: () => {},
      och: () => output.push(String.fromCharCode(stack.pop())),
      onn: () => output.push(stack.pop()),
    })[action]();

    const meta = {
      och: `Output char "${output[output.length - 1]}"`,
      onn: `Output number ${output[output.length - 1]}`,
    }[action] || null;

    assembler.push({ command: action, stack: stack.slice(), meta });
    pointer = applyControls(pointer, controls);
    previousItem = itemOnPointer;
  }

  return { assembler, path, output };
};
