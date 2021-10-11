
export class Vector2d {

    constructor(public x: number = 0, public y: number = 0) {
    }

    add(v: Vector2d) {
        return new Vector2d(this.x + v.x, this.y+v.y);
    }

    isEqual(v: Vector2d) {
        return v.x == this.x && v.y == this.y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}