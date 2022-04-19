const CLASSIC_PALETTE = [
  ['#FFC0C0', '#FF0000', '#C00000'],
  ['#FFFFC0', '#FFFF00', '#C0C000'],
  ['#C0FFC0', '#00FF00', '#00C000'],
  ['#C0FFFF', '#00FFFF', '#00C0C0'],
  ['#C0C0FF', '#0000FF', '#0000C0'],
  ['#FFC0FF', '#FF00FF', '#C000C0'],
  ['#FFFFFF', '#CCCCCC', '#111111'],
];

const CODEL_SIZE = 30;

export default class ProgramRender {
  constructor (dragScale, program) {
    dragScale.onRender.on((context) => {
      const value = program.data;
      const palette = CLASSIC_PALETTE;
      const codelSize = { x: 20, y: 20 }

      // context.save();
      // context.translate(-value.dimensions.x * CODEL_SIZE / 2, -value.dimensions.y * CODEL_SIZE / 2);

      for (let y = 0; y < value.dimensions.y; ++y) {
        for (let x = 0; x < value.dimensions.x; ++x) {
          const code = value.elements[y][x];
          const color = palette[code[0]][code[1]];

          context.fillStyle = color;
          context.beginPath();
          context.rect(x * CODEL_SIZE, y * CODEL_SIZE, CODEL_SIZE, CODEL_SIZE);
          context.fill();
        }
      }

      // context.restore();
    });
  }
}