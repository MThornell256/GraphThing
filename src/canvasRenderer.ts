import { Edge } from "./model/edge";
import { Vector2d } from "./model/vector2d";

export class CanvasRenderer {

    gridSize = 25;
    context: CanvasRenderingContext2D;

    canvasPosition: Vector2d = new Vector2d(30,30); // this is the offset is worldspace

    constructor(public canvas: HTMLCanvasElement) {

        const context = canvas.getContext("2d");
        if(context != null) {
            this.context = context;
        }
    }

    private isButtonDown(maskButton: number, button: number) {

        const bitMask = 0b0001 << (button - 1);
        return (maskButton & bitMask) > 0
    }

    public positionToGrid(position: Vector2d) {

        const x = Math.round(position.x / this.gridSize);
        const y = Math.round(position.y / this.gridSize);
        return new Vector2d(x,y)
    }

    public gridToPosition(grid: Vector2d) {

        const x = grid.x * this.gridSize;
        const y = grid.y * this.gridSize;
        return new Vector2d(x,y)
    }

    setSize(width: number, height: number) {

        this.canvas.width = width * this.gridSize;
        this.canvas.height = height * this.gridSize;
    }

    /*
    renderFrame() {

        requestAnimationFrame(() => this.renderFrame());

        //this.setCanvasSize();
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.clearCanvas()
        this.context.translate(this.canvasPosition.x, this.canvasPosition.y);

        // this.drawCanvasGrid();
        // this.context.beginPath();
        // this.context.arc(95, 50, 40, 0, 2 * Math.PI);
        // this.context.stroke();

        // Draw Mouse Pointer
        // this.drawMousePointer();
    }
    */

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw Functions
    drawGrid(width: number, height: number) {

        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1.0;

        this.context.beginPath();

        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                // Vert Lines
                const vfrom = new Vector2d(x * this.gridSize, 0)
                const vto = new Vector2d(x * this.gridSize, this.gridSize * width)

                this.context.moveTo(vfrom.x, vfrom.y);
                this.context.lineTo(vto.x, vto.y);

                // Hori Lines
                const hfrom = new Vector2d(0, y * this.gridSize)
                const hto =  new Vector2d(this.gridSize * height, y * this.gridSize)

                this.context.moveTo(hfrom.x, hfrom.y);
                this.context.lineTo(hto.x, hto.y);
            }
        }

        this.context.stroke();
    }

    drawPointer(position: Vector2d)  {

        this.context.fillStyle = 'grey';
        // const position = this.gridToPosition(this.mousePos);
        this.context.fillRect(position.x - 5 ,position.y - 5, 10, 10);
    }

    private drawLine(from: Vector2d, to: Vector2d) {

        this.context.beginPath();
        // this.context.lineWidth = 1;
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.stroke();
    }

    drawNode(point: Vector2d) {

        this.context.fillStyle = 'lightgrey';
        const position = this.gridToPosition(point);
        this.context.fillRect(position.x - 5 ,position.y - 5, 10, 10);
    }

    drawEdge(edge: Edge) {

        this.context.strokeStyle = 'white';
        this.context.lineWidth = 8.0;

        this.drawLine(this.gridToPosition(edge.pointA), this.gridToPosition(edge.pointB));
        this.drawNode(edge.pointA);
        this.drawNode(edge.pointB);
    }
}