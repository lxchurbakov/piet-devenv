import _ from 'lodash';

export class EventEmitter {
  listeners = [];

  on = (listener) => {
    this.listeners.push(listener);
  };

  off = (listener) => {
    this.listeners = _.remove(this.listeners, (l) => l === listener);
  };

  emitSync = (data) => {
    this.listeners.forEach((listener) => {
      listener(data);
    });
  };

  emitAsync = (data) => {
    return this.listeners.reduce((acc, listener) =>
      acc.then(() => Promise.resolve(listener(data)))
    , Promise.resolve());
  };

  emitParallelAsync = (data) => {
    return Promise.all(this.listeners.map((listener) => listener(data)));
  };

  emitParallelSync = (data) => {
    return this.listeners.map((listener) => listener(data))
  };

  emitSequenceAsync = (data) => {
    return this.listeners.reduce((acc, listener) =>
      acc.then((intermediate) => Promise.resolve(listener(intermediate)))
    , Promise.resolve(data));
  };

  emitSequenceSync = (data) => {
    return this.listeners.reduce((acc, listener) => listener(acc), data);
  };
};
