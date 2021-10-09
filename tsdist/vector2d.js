"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2d = void 0;
var Vector2d = /** @class */ (function () {
    function Vector2d(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2d.prototype.add = function (v) {
        return new Vector2d(this.x + v.x, this.y + v.y);
    };
    return Vector2d;
}());
exports.Vector2d = Vector2d;
