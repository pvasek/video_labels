import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppModel } from "./AppModel";
import { App } from "./App";
import { HttpClient } from "aurelia-fetch-client";

const httpClient = new HttpClient();
const model = new AppModel(httpClient);
model.load();

const el = document.getElementById("app");
ReactDOM.render(<App model={model}/>, el);

const keys = {
    rightArrow: 39,
    leftArrow: 37,
    enter: 13,
};

document.addEventListener("keydown", e => {
    console.log("keyCode: ", e.keyCode);
    if (e.keyCode === keys.enter || e.keyCode === keys.rightArrow) {
        model.selectNext();
        e.preventDefault();
    }

    if (e.keyCode === keys.leftArrow) {
        model.selectPrevious();
        e.preventDefault();
    }

})
