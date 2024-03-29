export class Ball {
  radius: number;
  vx: number;
  vy: number;
  stageWidth: number;
  stageHeight: number;
  x: number;
  y: number;

  constructor(
    stageWidth: number,
    stageHeight: number,
    radius: number,
    speed: number
  ) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    const diameter = this.radius * 2;
    this.x = diameter + (Math.random() * stageWidth - diameter);
    this.y = diameter + (Math.random() * stageHeight - diameter);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow();
    ctx.fillStyle = "#fdd700";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  }

  bounceWindow() {
    const b = {
      min: this.radius,
      maxX: this.stageWidth - this.radius,
      maxY: this.stageHeight - this.radius,
    };
    if (this.x <= b.min || this.x >= b.maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= b.min || this.y >= b.maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }
}
