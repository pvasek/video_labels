"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var mobx_1 = require("mobx");
var CanvasModel = /** @class */ (function () {
    function CanvasModel(owner) {
        this.owner = owner;
    }
    CanvasModel.prototype.setContext = function (context) {
        this.ctx = context;
    };
    CanvasModel.prototype.draw = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = _this.owner.imageUrl;
            img.onload = function () {
                _this.renderImage();
                resolve();
            };
            _this.img = img;
        });
    };
    CanvasModel.prototype.selectPoint = function (x, y) {
        x = x - 1;
        y = y - 2;
        this.renderImage();
        this.renderPointer(x, y);
        this.owner.selectPoint(x / this.factor, y / this.factor);
    };
    CanvasModel.prototype.renderOriginalPoint = function (x, y) {
        console.log("renderOriginalPoint: ", x, y);
        if (this.ctx) {
            this.renderPointer(x * this.factor, y * this.factor);
        }
    };
    CanvasModel.prototype.renderPointer = function (x, y) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ffd50066";
        this.ctx.lineWidth = 2;
        var size = 30;
        this.ctx.moveTo(x - size, y);
        this.ctx.lineTo(x + size, y);
        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x, y + size);
        this.ctx.stroke();
    };
    CanvasModel.prototype.renderImage = function () {
        this.factor = this.owner.width / this.img.width;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.img, 0, 0, this.img.width * this.factor, this.img.height * this.factor);
    };
    __decorate([
        mobx_1.observable
    ], CanvasModel.prototype, "factor", void 0);
    __decorate([
        mobx_1.action
    ], CanvasModel.prototype, "setContext", null);
    __decorate([
        mobx_1.action
    ], CanvasModel.prototype, "draw", null);
    __decorate([
        mobx_1.action
    ], CanvasModel.prototype, "selectPoint", null);
    __decorate([
        mobx_1.action
    ], CanvasModel.prototype, "renderOriginalPoint", null);
    return CanvasModel;
}());
exports.CanvasModel = CanvasModel;
var CanvasProps = /** @class */ (function () {
    function CanvasProps() {
    }
    return CanvasProps;
}());
exports.CanvasProps = CanvasProps;
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas(props) {
        var _this = _super.call(this, props) || this;
        _this.click = _this.click.bind(_this);
        return _this;
    }
    Canvas.prototype.componentDidMount = function () {
        var context = this.el.getContext("2d");
        this.props.model.setContext(context);
    };
    Canvas.prototype.click = function (e) {
        var clientRec = e.currentTarget.getBoundingClientRect();
        var x = e.clientX - clientRec.left;
        var y = e.clientY - clientRec.top;
        this.props.model.selectPoint(x, y);
    };
    Canvas.prototype.render = function () {
        var _this = this;
        var model = this.props.model;
        return React.createElement("canvas", { className: "canvas", ref: function (r) { return _this.el = r; }, width: 1200, height: 800, onClick: this.click });
    };
    Canvas = __decorate([
        mobx_react_1.observer
    ], Canvas);
    return Canvas;
}(React.Component));
exports.Canvas = Canvas;
