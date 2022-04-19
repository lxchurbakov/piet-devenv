export default class Debug {
  position = { x: 0, y: 0 };
  velocity = { x: 2, y: .2 };
  acceleration = { x: 0, y: .3 };

  constructor (canvas) {
    canvas.onRender.on((context) => {
      context.font = '16px Ubuntu Mono';
      context.fillText('Hey This Is Debug Plugin Talking', this.position.x, this.position.y);
    });

    setInterval(() => {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.velocity.x += this.acceleration.x;
      this.velocity.y += this.acceleration.y;

      if (this.position.y > canvas.height) {
        this.velocity.y = -this.velocity.y;
      }

      if (this.position.x > canvas.width || this.position.x < 0) {
        this.velocity.x = -this.velocity.x;
      }

      this.velocity.x *= .998;
      this.velocity.y *= .998;
    }, 1000 / 5);
  }

  dispose () {

  }
}
