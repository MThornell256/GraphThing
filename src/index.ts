import { CanvasRenderer } from "./canvasRenderer";
import { GraphController } from "./graphController";
import { GraphView } from "./graphView";
import { Vector2d } from "./model/vector2d";

// Get Dom Elements
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const button1 = document.getElementById("button1") as HTMLButtonElement;
const button2 = document.getElementById("button2") as HTMLButtonElement;
const button3 = document.getElementById("button3") as HTMLButtonElement;

// Set Up Us The Bomb
const controller = new GraphController();
const gridView = new GraphView(new CanvasRenderer(canvas));
gridView.setModel(controller.model);

// Bind Buttons
button1.onclick = () => {
    console.log(controller.model.getData());
}

button2.onclick = () => {
    console.log("Clicky Clicky 2");
}

button3.onclick = () => {
    console.log("Clicky Clicky 3");
}

// Handle Mouse Events
let down = new Vector2d();
gridView.onMouseDown.subscribe(downPos => {
    down = downPos;
})

gridView.onMouseUp.subscribe(upPos => {
    controller.addEdge(down, upPos);
})

// Start Render Loop
gridView.renderFrame();
(window as any).controller  = controller;