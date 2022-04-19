import { EventEmitter } from '~/src/libs/events';

const CLICK_THRESHOLD = 100;

export default class Events {
  onClick = new EventEmitter();
  onDrag = new EventEmitter();
  onMouseDown = new EventEmitter();
  onMouseMove = new EventEmitter();
  onMouseUp = new EventEmitter();
  onZoom = new EventEmitter();

  onKeyDown = new EventEmitter();
  onKeyUp = new EventEmitter();

  constructor (node) {
    const overlay = document.createElement('div');

    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.position = 'absolute';
    overlay.style.zIndex = '100';
    overlay.style.top = '0';
    overlay.style.left = '0';

    node.appendChild(overlay);

    const rect = overlay.getBoundingClientRect();
    this.top = rect.top;
    this.left = rect.left;

    overlay.addEventListener('mousedown', this.handleMouseDown);
    overlay.addEventListener('mouseup', this.handleMouseUp);
    overlay.addEventListener('mousemove', this.handleMouseMove);
    overlay.addEventListener('mousewheel', this.handleMouseWheel);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  lastpos = null;

  handleMouseDown = ({ clientX, clientY }) => {
    const x = clientX - this.left;
    const y = clientY - this.top;

    this.lastpos = { x, y };
    this.onMouseDown.emitSync({ x, y });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const x = clientX - this.left;
    const y = clientY - this.top;

    this.onMouseMove.emitSync({ x, y });

    if (this.lastpos !== null) {
      this.onDrag.emitSync({ x: x - this.lastpos.x, y: y - this.lastpos.y });
      this.lastpos = { x, y };
    }
  };

  handleMouseUp = () => {
    this.lastpos = null
    this.onMouseUp.emitSync();
  };

  handleMouseWheel = (e) => {
    this.onZoom.emitSync(e.deltaY);
    e.preventDefault();
  };

  handleKeyDown = (e) => {
    // console.log(e);
    this.onKeyDown.emitSync(e.keyCode);
  };

  handleKeyUp = (e) => {
    this.onKeyUp.emitSync(e.keyCode);
  };
}