import { Vector2d } from "./vector2d";

export interface Edge {

    pointA: Vector2d;
    pointB: Vector2d;
}

export class EdgeData {

    edges = new Set<Edge>();

    addEdge(edge: Edge) {
        const e = this.getEdge(edge)
        if(e) {
            console.warn(`ADD EDGE: Edge Already Exists ${edge}`);
            return;
        }

        this.edges.add(edge);
    }

    getEdge(edge: Edge) {

        return Array.from(this.edges).find(e =>
            (e.pointA.isEqual(edge.pointA) && e.pointB.isEqual(edge.pointB)) ||
            (e.pointB.isEqual(edge.pointA) && e.pointA.isEqual(edge.pointB))
        );
    }

    removeEdge(edge: Edge) {

        const e = Array.from(this.edges).find(e => e.pointA.isEqual(edge.pointA) && e.pointB.isEqual(edge.pointB))
        const result = this.edges.delete(e);

        if(!result) {
            console.warn(`REMOVE EDGE: Edge Does Not Exist ${edge}`);
        }

        return result;
    }

    getData() {
        return {
            edges: Array.from(this.edges)
        }
    }

    setData(edgeData: { edges: Edge[] }) {
        this.edges = new Set<Edge>(edgeData.edges);
    }
}