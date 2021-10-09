"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRenderer = void 0;
var vector2d_1 = require("./vector2d");
var CanvasRenderer = /** @class */ (function () {
    function CanvasRenderer(canvas) {
        this.canvas = canvas;
        // canvas: HTMLCanvasElement;
        this.gridSize = 25;
        this.canvasPosition = new vector2d_1.Vector2d(30, 30); // this is the offset is worldspace
        this.lastMousePos = new vector2d_1.Vector2d(); // used for calculating mouse drag distance
        this.mousePos = new vector2d_1.Vector2d(); // This is the grid coordinates
        var context = canvas.getContext("2d");
        if (context != null) {
            this.context = context;
        }
    }
    CanvasRenderer.prototype.setMousePosition = function (event) {
        this.mousePos = this.posToGrid(new vector2d_1.Vector2d(event.clientX - this.canvasPosition.x, event.clientY - this.canvasPosition.y));
        var currentPosition = new vector2d_1.Vector2d(event.clientX, event.clientY);
        if (this.isButtonDown(event.buttons, 1)) {
            // Middle Mouse Button (Button 3 is down)
            var moveDelta = new vector2d_1.Vector2d(currentPosition.x - this.lastMousePos.x, currentPosition.y - this.lastMousePos.y);
            this.canvasPosition = this.canvasPosition.add(moveDelta);
            console.log("scroll", this.canvasPosition);
        }
        this.lastMousePos = currentPosition;
    };
    CanvasRenderer.prototype.isButtonDown = function (maskButton, button) {
        var bitMask = 1 << (button - 1);
        return (maskButton & bitMask) > 0;
    };
    CanvasRenderer.prototype.posToGrid = function (position) {
        var x = Math.round(position.x / this.gridSize);
        var y = Math.round(position.y / this.gridSize);
        return new vector2d_1.Vector2d(x, y);
    };
    CanvasRenderer.prototype.gridToPosition = function (grid) {
        var x = grid.x * this.gridSize;
        var y = grid.y * this.gridSize;
        return new vector2d_1.Vector2d(x, y);
    };
    CanvasRenderer.prototype.setCanvasSize = function () {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
    };
    CanvasRenderer.prototype.renderFrame = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.renderFrame(); });
        this.setCanvasSize();
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clearCanvas();
        this.context.translate(this.canvasPosition.x, this.canvasPosition.y);
        this.drawGrid();
        // this.context.beginPath();
        // this.context.arc(95, 50, 40, 0, 2 * Math.PI);
        // this.context.stroke();
        // Draw Mouse Pointer
        this.drawMousePointer();
    };
    CanvasRenderer.prototype.drawMousePointer = function () {
        var position = this.gridToPosition(this.mousePos);
        this.context.fillRect(position.x - 5, position.y - 5, 10, 10);
    };
    CanvasRenderer.prototype.drawGrid = function () {
        var gridSize = this.gridSize;
        var width = this.canvas.width;
        var height = this.canvas.height;
        for (var x = 0; x < (width / gridSize); x++) {
            for (var y = 0; y < (height / gridSize); y++) {
                // Vert Lines
                var vfrom = new vector2d_1.Vector2d(x * gridSize, 0);
                var vto = new vector2d_1.Vector2d(x * gridSize, this.canvas.height);
                // Hori Lines
                var hfrom = new vector2d_1.Vector2d(0, y * gridSize);
                var hto = new vector2d_1.Vector2d(this.canvas.width * gridSize, y * gridSize);
                this.drawLine(vfrom, vto);
                this.drawLine(hfrom, hto);
            }
        }
    };
    CanvasRenderer.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    CanvasRenderer.prototype.drawLine = function (from, to) {
        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.stroke();
    };
    return CanvasRenderer;
}());
exports.CanvasRenderer = CanvasRenderer;
