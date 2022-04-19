import { EventEmitter } from '~/src/libs/events';

export default class Modes {
  mode = 'view';
  onChangeMode = new EventEmitter();

  constructor () {

  }

  change = (newMode) => {
    this.mode = newMode;
    this.onChangeMode.emitSync(this.mode);
  };

  dispose = () => {

  };
}