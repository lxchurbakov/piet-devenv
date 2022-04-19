import Modes from './core/modes-manager';
import Canvas from './core/canvas-manager';
import Events from './core/events-manager';
import Program from './core/program-state';

import DragScale from './view/drag-scale';
import ProgramRender from './view/program-render';

// import Selection from './selection';

export default (node) => {
  const modes = new Modes();
  const program = new Program();
  const canvas = new Canvas(node);
  const events = new Events(node);
  // const debug = new Debug(canvas);

  const dragScale = new DragScale(modes, canvas, events, program);
  const programRender = new ProgramRender(dragScale, program);
  // const selection = new Selection(modes, canvas, dragScale, events);

  const dispose = () => {
    canvas.dispose();
    debug.dispose();
  };

  return { canvas, dispose };
};
