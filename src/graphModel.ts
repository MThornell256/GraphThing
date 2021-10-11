import { Edge } from "./model/edge";
import { Vector2d } from "./model/vector2d";

export class GraphModel {

    edges = new Set<Edge>();

    constructor(
        public width: number,
        public height: number,
    ) {

        const e = new Edge(new Vector2d(2,2),new Vector2d(2,3));
        this.addEdge(e);
    }

    addEdge(edge: Edge) {
        const e = this.getEdge(edge)
        if(e) {
            console.warn(`ADD EDGE: Edge Already Exists ${edge}`);
            return;
        }

        this.edges.add(edge);
    }

    getEdge(edge: Edge) {
        return Array.from(this.edges).find(e => e.isEqual(edge));
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