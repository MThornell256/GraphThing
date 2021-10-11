import { GraphModel } from "./graphModel";
import { Edge } from "./model/edge";
import { Vector2d } from "./model/vector2d";

export class GraphController {

    model = new GraphModel(100, 100, 10);

    addEdge(pointA :Vector2d, pointB :Vector2d) {
        this.model.addEdge(new Edge(pointA, pointB));
    }
}