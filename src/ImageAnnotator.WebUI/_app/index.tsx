import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppModel } from "./AppModel";
import { App } from "./App";
import { HttpClient } from "aurelia-fetch-client";
import { AppRouter } from "./Components/Router";
import { createBrowserHistory } from "history";

const httpClient = new HttpClient();
const model = new AppModel(httpClient);
const router = new AppRouter(createBrowserHistory());
model.load();

const el = document.getElementById("app");
ReactDOM.render(<App model={model} router={router}/>, el);

router.startRouter();

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
