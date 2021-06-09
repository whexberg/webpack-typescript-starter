export class Point {
    constructor(public x: number = 0, public y: number = 0) {}

    clone = (): Point => new Point(this.x, this.y);
}
