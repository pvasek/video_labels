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
