import { Vector2d } from "./vector2d";

export class CanvasRenderer {

    // canvas: HTMLCanvasElement;

    gridSize = 25;
    context: CanvasRenderingContext2D;

    canvasPosition: Vector2d = new Vector2d(30,30); // this is the offset is worldspace
    
    lastMousePos: Vector2d = new Vector2d() // used for calculating mouse drag distance
    mousePos: Vector2d = new Vector2d() // This is the grid coordinates

    constructor(private canvas: HTMLCanvasElement) {

        const context = canvas.getContext("2d");
        if(context != null) {
            this.context = context;
        }
    }

    public setMousePosition(event: MouseEvent) {
        
        this.mousePos = this.posToGrid(new Vector2d(event.clientX - this.canvasPosition.x, event.clientY - this.canvasPosition.y))

        const currentPosition =  new Vector2d(event.clientX, event.clientY)
        
        if(this.isButtonDown(event.buttons, 1)) {

            // Middle Mouse Button (Button 3 is down)
            const moveDelta = new Vector2d(currentPosition.x -this.lastMousePos.x , currentPosition.y - this.lastMousePos.y)
            this.canvasPosition = this.canvasPosition.add(moveDelta);
            console.log("scroll", this.canvasPosition)
        }
        
        this.lastMousePos = currentPosition;
    }

    private isButtonDown(maskButton: number, button: number) {

        const bitMask = 0b0001 << (button - 1);
        return (maskButton & bitMask) > 0
    }

    private posToGrid(position: Vector2d) {

        const x = Math.round(position.x / this.gridSize);
        const y = Math.round(position.y / this.gridSize);
        return new Vector2d(x,y)
    }

    private gridToPosition(grid: Vector2d) {

        const x = grid.x * this.gridSize;
        const y = grid.y * this.gridSize;
        return new Vector2d(x,y)
    }

    setCanvasSize() {

        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight; 
    }

    renderFrame() {

        requestAnimationFrame(() => this.renderFrame());
        
        this.setCanvasSize();
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clearCanvas()
        this.context.translate(this.canvasPosition.x, this.canvasPosition.y);
        
        this.drawGrid();
        // this.context.beginPath();
        // this.context.arc(95, 50, 40, 0, 2 * Math.PI);
        // this.context.stroke();
        
        // Draw Mouse Pointer
        this.drawMousePointer();
    }

    private drawMousePointer()  {

        const position = this.gridToPosition(this.mousePos);
        this.context.fillRect(position.x - 5 ,position.y - 5, 10, 10);
    }

    private drawGrid() {

        const gridSize = this.gridSize;
        const width = this.canvas.width;
        const height = this.canvas.height;

        for (let x = 0; x < (width / gridSize); x++) {
            for (let y = 0; y < (height / gridSize); y++) {
                // Vert Lines
                const vfrom = new Vector2d(x * gridSize, 0)
                const vto = new Vector2d(x * gridSize, this.canvas.height)

                // Hori Lines
                const hfrom = new Vector2d(0, y * gridSize)
                const hto =  new Vector2d(this.canvas.width * gridSize, y * gridSize)

                this.drawLine(vfrom, vto);
                this.drawLine(hfrom, hto);
            }
        }
    }

    private clearCanvas() {
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawLine(from: Vector2d, to: Vector2d) {

        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.stroke();
    }

}