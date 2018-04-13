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
var AppToolbar_1 = require("./AppToolbar");
var Canvas_1 = require("./Canvas");
var AppProps = /** @class */ (function () {
    function AppProps() {
    }
    return AppProps;
}());
exports.AppProps = AppProps;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.selectImage = function (e, id) {
        e.preventDefault();
        e.stopPropagation();
        this.props.model.selectImage(id);
    };
    App.prototype.render = function () {
        var model = this.props.model;
        return React.createElement("div", { className: "label-maker" },
            React.createElement(AppToolbar_1.AppToolbar, { model: model }),
            model.selectedImageId && React.createElement("div", { className: "image" },
                React.createElement(Canvas_1.Canvas, { model: model.canvasModel })));
    };
    App = __decorate([
        mobx_react_1.observer
    ], App);
    return App;
}(React.Component));
exports.App = App;
