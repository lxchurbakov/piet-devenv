
let shifted = false;
document.addEventListener('keyup', function(e){shifted = e.shiftKey} );
document.addEventListener('keydown', function(e){shifted = e.shiftKey} );

export default class Selection {
  selected = null;
  path = { active: false, data: [] };

  constructor (modes, canvas, dragScale, events) {
    // console.log('asd')
    events.onMouseMove.on(({ x, y }) => {
      const withinProgram = dragScale.transformUp(canvas.transformUp({ x, y }));

      // TODO SHOULD NOT KNOW ABOUT CODEL SIZE
      this.selected = { x: Math.floor(withinProgram.x / 30), y: Math.floor(withinProgram.y / 30) };

      // console.log({ x, y });
      // console.log();
    });

    events.onMouseDown.on(() => {

      this.path.active = true;

      if (shifted)
      this.path.data = [];
    });

    events.onMouseMove.on(({x,y}) => {
      if (this.path.active) {
        const withinProgram = dragScale.transformUp(canvas.transformUp({ x, y }));

        // TODO SHOULD NOT KNOW ABOUT CODEL SIZE
        const cell = { x: Math.floor(withinProgram.x / 30), y: Math.floor(withinProgram.y / 30) };
        const lastPathCell = this.path.data[this.path.data.length - 1];

        if (!lastPathCell || (cell.x !== lastPathCell.x || cell.y !== lastPathCell.y)) {
          this.path.data.push(cell)
        }
      }
    });

    events.onMouseUp.on(() => {
      this.path.active = false;
    });


    dragScale.onRender.on((context) => {
      if (this.selected) {
        context.strokeStyle = '#069';
        context.lineWidth = 2;
        context.beginPath();
        context.rect(this.selected.x * 30, this.selected.y * 30, 30, 30);
        context.stroke();
      }

      if (this.path.data.length >= 2) {
        context.lineWidth = 4;
        context.strokeStyle = '#fff';
        context.setLineDash([3, 3]);
        context.beginPath();

        for (let i = 0; i < this.path.data.length; ++i) {
          const { x, y } = this.path.data[i];
          const codelSize = 30;

          if (i === 0) {
            context.moveTo(x * codelSize + codelSize / 2, y * codelSize + codelSize / 2);
          } else {
            context.lineTo(x * codelSize + codelSize / 2, y * codelSize + codelSize / 2);
          }

          // context.fillStyle = 'red';
          // context.beginPath();
          // context.rect(x * codelSize, y * codelSize, codelSize, codelSize);
          // context.fill();
        }

        context.stroke();
      }

      if (this.path.data.length >= 2) {
        context.lineWidth = 4;
        context.strokeStyle = '#333';
        context.lineDashOffset = 3;
        context.setLineDash([3, 3]);
        context.beginPath();

        for (let i = 0; i < this.path.data.length; ++i) {
          const { x, y } = this.path.data[i];
          const codelSize = 30;

          if (i === 0) {
            context.moveTo(x * codelSize + codelSize / 2, y * codelSize + codelSize / 2);
          } else {
            context.lineTo(x * codelSize + codelSize / 2, y * codelSize + codelSize / 2);
          }

          // context.fillStyle = 'red';
          // context.beginPath();
          // context.rect(x * codelSize, y * codelSize, codelSize, codelSize);
          // context.fill();
        }

        context.stroke();
      }
    });
  }
}