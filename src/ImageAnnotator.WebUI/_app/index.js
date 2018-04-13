"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var AppModel_1 = require("./AppModel");
var App_1 = require("./App");
var aurelia_fetch_client_1 = require("aurelia-fetch-client");
var httpClient = new aurelia_fetch_client_1.HttpClient();
var model = new AppModel_1.AppModel(httpClient);
model.load();
var el = document.getElementById("app");
ReactDOM.render(React.createElement(App_1.App, { model: model }), el);
var keys = {
    rightArrow: 39,
    leftArrow: 37,
    enter: 13,
};
document.addEventListener("keydown", function (e) {
    console.log("keyCode: ", e.keyCode);
    if (e.keyCode === keys.enter || e.keyCode === keys.rightArrow) {
        model.selectNext();
        e.preventDefault();
    }
    if (e.keyCode === keys.leftArrow) {
        model.selectPrevious();
        e.preventDefault();
    }
});
