"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var chai_1 = require("chai");
var Router_1 = require("../Router");
mocha_1.describe("pathsMatch", function () {
    var data = [
        [["project", "settings"], ["project", "settings"], true],
        [["project", "settings"], ["project", "*"], true],
        [["project", "settings"], ["*", "*"], true],
        [["project", "settings2"], ["project", "settings"], false],
        [["projects", "settings"], ["project", "settings"], false],
        [["project", "settings"], ["project", "settings"], false],
        [["project"], ["project", "settings"], false],
        [["settings"], ["project", "settings"], false],
    ];
    data.forEach(function (i) {
        var result = Router_1.pathsMatch(i[0], i[1]);
        chai_1.assert.equal(result, i[2]);
    });
});
