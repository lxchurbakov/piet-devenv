import Modes from './modes';
import Canvas from './canvas';
import Debug from './debug';
import Events from './events';

import DragScale from './drag-scale';

import Program from './program';
import ProgramRender from './program-render';

import Selection from './selection';

export default (node) => {
  const modes = new Modes();
  const program = new Program();

  const canvas = new Canvas(node);
  const events = new Events(node);
  // const debug = new Debug(canvas);

  const dragScale = new DragScale(modes, canvas, events, program);

  const programRender = new ProgramRender(dragScale, program);
  const selection = new Selection(modes, canvas, dragScale, events);

  const dispose = () => {
    canvas.dispose();
    debug.dispose();
  };

  return { canvas, dispose };
};
