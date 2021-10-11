import { Vector2d } from "./vector2d";

export class Edge {
    pointA: Vector2d;
    pointB: Vector2d;

    constructor(pointA: Vector2d, pointB: Vector2d) {
        this.pointA = pointA;
        this.pointB = pointB;
    }

    isEqual(other: Edge): boolean {
        return (other.pointA.isEqual(this.pointA) && other.pointB.isEqual(this.pointB)) ||
               (other.pointB.isEqual(this.pointA) && other.pointA.isEqual(this.pointB));
    }

    tostring(): string {
        return `[${this.pointA} => ${this.pointB}]`;
    }
}