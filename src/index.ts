//import { CanvasRenderer } from "./canvasRenderer";

import { CanvasRenderer } from "./canvasRenderer";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const canvasRender = new CanvasRenderer(canvas);

canvas.addEventListener('mousemove', (event: Event)=> {
    //console.log("mouseMove", event);
    canvasRender.setMousePosition(event as MouseEvent);
});

canvasRender.renderFrame();


// const onMouseMove = (event: MouseEvent) => {
//     canvasRender.setMousePosition(event);
// }
// //const context = canvas.getContext("2d");

// if(canvas != null) {


//     setCanvasSize(canvas);
//     // drawCanvas(context);
// }


// function setCanvasSize(canvas: HTMLCanvasElement) {

//     canvas.width = document.documentElement.clientWidth
//     canvas.height = document.documentElement.clientHeight
// }


// function drawCanvas(context: CanvasRenderingContext2D) {

//     const mousePos = {
//         x: 0,
//         y: 0,
//     };
//     const setMouse = (event: MouseEvent) => {

        
//     }

//     renderFrame();
//     function renderFrame() {
        
//     }
// }


