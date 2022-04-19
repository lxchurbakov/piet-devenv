import { EventEmitter } from '~/src/libs/events';

const within = (v, max, min) => Math.max(min, Math.min(max, v));

export default class DragScale {
  translate = { x: 0, y: 0 };
  scale = 1.0;

  onRender = new EventEmitter();

  constructor (modes, canvas, events, program) {
    // TODO should not know about codel size here
    this.translate = { x: -program.data.dimensions.x * 30 / 2,y: -program.data.dimensions.y * 30 / 2 };

    events.onKeyDown.on((code) => {
      if (code === 32) {
        modes.change('drag');
      }
    });

    events.onKeyUp.on((code) => {
      if (code === 32) {
        modes.change('view');
      }
    });

    events.onDrag.on(({ x, y }) => {
      if (modes.mode === 'drag') {
        this.translate.x += x/this.scale;
        this.translate.y += y/this.scale;
      }
    });

    events.onZoom.on((delta) => {
      this.scale = within(this.scale + (delta / 100), 2, .2);
    });

    canvas.onRender.on((context) => {
      context.save();
      context.scale(this.scale, this.scale);
      context.translate(this.translate.x, this.translate.y);
      this.onRender.emitSync(context);
      context.restore();
    });
  }

  transformUp = ({ x, y }) => {
    return {
      x: (x / this.scale) - this.translate.x,
      y: (y / this.scale) - this.translate.y,
    };
  };
}