import { EventEmitter } from '~/src/libs/events';

export default class Canvas {
  onRender = new EventEmitter();

  constructor (node) {
    this.canvas = document.createElement('canvas');
    node.appendChild(this.canvas);

    const { width } = node.getBoundingClientRect();
    const height = Math.min(width, Math.floor(window.screen.height * .6)); // go square
    this.width = width;
    this.height = height;

    const pixelRatio = window.devicePixelRatio || 1.0;

    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';

    this.canvas.width = this.width * pixelRatio;
    this.canvas.height = this.height * pixelRatio;

    const context = this.canvas.getContext('2d');

    context.scale(pixelRatio, pixelRatio);
    context.translate(width / 2, height / 2);

    // Create second canvas
    // this.buffer = document.createElement('canvas');
    // this.buffer.width = this.canvas.width;
    // this.buffer.height = this.canvas.height;
    // // console.log(this.buffer)
    // this.bufferContext = this.buffer.getContext('2d');

    // Setup Rendering Cycle
    this.render = () => {
      context.clearRect(-this.width, -this.height, this.width * 2, this.height * 2);
      // this.bufferContext.clearRect(-this.width, -this.height, this.width * 2, this.height * 2);
      this.onRender.emitSync(context);
      // context.drawImage(this.buffer, 0, 0);

      requestAnimationFrame(this.render);
    };

    requestAnimationFrame(this.render);
  }

  transformUp = ({x,y}) => {
    return {
      x: x - this.width / 2,
      y: y - this.height / 2,
    };
  };

  dispose () {
    cancelAnimationFrame(this.render);
    this.canvas.remove();
  }
};
//
// // canvas element in DOM
// var canvas1 = document.getElementById('canvas1');
// var context1 = canvas1.getContext('2d');
//
// // buffer canvas
// var canvas2 = document.createElement('canvas');
// canvas2.width = 150;
// canvas2.height = 150;
// var context2 = canvas2.getContext('2d');
//
// // create something on the canvas
// context2.beginPath();
// context2.moveTo(10,10);
// context2.lineTo(10,30);
// context2.stroke();
//
// //render the buffered canvas onto the original canvas element
// context1.drawImage(canvas2, 0, 0);