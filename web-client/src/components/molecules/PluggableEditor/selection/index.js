

export default class Selection {
  selected = null;

  constructor (modes, canvas, dragScale, events) {
    // console.log('asd')
    events.onMouseMove.on(({ x, y }) => {
      const withinProgram = dragScale.transformUp(canvas.transformUp({ x, y }));

      // TODO SHOULD NOT KNOW ABOUT CODEL SIZE
      this.selected = { x: Math.floor(withinProgram.x / 30), y: Math.floor(withinProgram.y / 30) };

      // console.log({ x, y });
      // console.log();
    });

    dragScale.onRender.on((context) => {
      if (this.selected) {
        context.strokeStyle = 'red';
        context.beginPath();
        context.rect(this.selected.x * 30, this.selected.y * 30, 30, 30);
        context.stroke();
      }
    });
  }
}