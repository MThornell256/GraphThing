"use strict";
//import { CanvasRenderer } from "./canvasRenderer";
Object.defineProperty(exports, "__esModule", { value: true });
var canvasRenderer_1 = require("./canvasRenderer");
var canvas = document.getElementById("myCanvas");
var canvasRender = new canvasRenderer_1.CanvasRenderer(canvas);
canvas.addEventListener('mousemove', function (event) {
    //console.log("mouseMove", event);
    canvasRender.setMousePosition(event);
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
