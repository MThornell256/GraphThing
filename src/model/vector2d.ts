
export class Vector2d {

    constructor(public x: number = 0, public y: number = 0) {
    }

    add(v: Vector2d) {
        return new Vector2d(this.x + v.x, this.y+v.y);
    }

    isEqual(other: Vector2d): boolean {
        return other.x == this.x && other.y == this.y;
    }

    tostring(): string {
        return `(${this.x}, ${this.y})`;
    }
}