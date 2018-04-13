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
var ToolbarProps = /** @class */ (function () {
    function ToolbarProps() {
    }
    return ToolbarProps;
}());
exports.ToolbarProps = ToolbarProps;
var AppToolbar = /** @class */ (function (_super) {
    __extends(AppToolbar, _super);
    function AppToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppToolbar.prototype.render = function () {
        var model = this.props.model;
        return React.createElement("div", { className: "toolbar" },
            React.createElement("select", { value: model.selectedGroup ? model.selectedGroup.id : "" }, model.groups.map(function (i) { return React.createElement("option", { key: i.id }, i.name); })),
            React.createElement("button", { onClick: model.selectPrevious, className: "btn btn-primary" }, "<"),
            React.createElement("button", { onClick: model.selectNext, className: "btn btn-primary" }, ">"),
            React.createElement("span", { className: "seperator" }),
            React.createElement("button", { className: "btn btn-primary", onClick: function (e) { return model.selectNoBall(); } }, "No ball"),
            React.createElement("span", { className: "seperator" }),
            [300, 400, 600, 800, 1000].map(function (i) {
                return React.createElement("button", { key: i, onClick: function (e) { return model.setWidth(i); }, className: "btn btn-primary" },
                    i,
                    "px");
            }),
            React.createElement("label", null,
                model.currentIndex + 1,
                "/",
                model.length,
                " - ",
                model.selectedImageId),
            React.createElement("label", null, model.canvasModel.factor));
    };
    AppToolbar = __decorate([
        mobx_react_1.observer
    ], AppToolbar);
    return AppToolbar;
}(React.Component));
exports.AppToolbar = AppToolbar;
