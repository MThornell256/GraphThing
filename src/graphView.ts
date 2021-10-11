import { Subject } from "rxjs";
import { CanvasRenderer } from "./canvasRenderer";
import { GraphModel } from "./graphModel";
import { Vector2d } from "./model/vector2d";

export class GraphView {

    mousePos: Vector2d = new Vector2d(50,50);
    isDown = false;

    model: GraphModel;

    onMouseDown = new Subject<Vector2d>();
    onMouseDrag = new Subject<Vector2d>();
    onMouseUp = new Subject<Vector2d>();

    constructor(private canvasRenderer: CanvasRenderer) {

        canvasRenderer
            ?.canvas
            ?.addEventListener('mousemove', (event: MouseEvent)=> {
                this.mousePos =  new Vector2d(event.offsetX, event.offsetY);
                if(this.isDown) {
                    const gridPosition = this.canvasRenderer.positionToGrid(this.mousePos);
                    this.onMouseDrag.next(gridPosition);
                }
            });

        canvasRenderer
            ?.canvas
            ?.addEventListener('mousedown', (event: MouseEvent)=> {
                this.isDown = true;
                const gridPosition = this.canvasRenderer.positionToGrid(this.mousePos);
                this.onMouseDown.next(gridPosition);
            });

        canvasRenderer
            ?.canvas
            ?.addEventListener('mouseup', (event: MouseEvent)=> {
                this.isDown = false;
                const gridPosition = this.canvasRenderer.positionToGrid(this.mousePos);
                this.onMouseUp.next(gridPosition);
            });

    }

    setModel(model: GraphModel){
        this.model = model;
        this?.canvasRenderer.setSize(this.model.width, this.model.height);
    }

    renderFrame = () => {

        // Render Loop Here
        requestAnimationFrame(this.renderFrame)

        if(!this.model) {
            return;
        }

        this?.canvasRenderer.clear();
        this?.canvasRenderer.drawGrid(this.model.width, this.model.height);

        // Draw Each Edge
        this.model.edges
            .forEach(edge => {
                this.canvasRenderer.drawEdge(edge);
            });

        // Draw The Mouse
        const gridPosition = this.canvasRenderer.positionToGrid(this.mousePos);
        const pos = this.canvasRenderer.gridToPosition(gridPosition);
        this?.canvasRenderer.drawPointer(pos);
    }

}