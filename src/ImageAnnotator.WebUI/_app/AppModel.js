"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Canvas_1 = require("./Canvas");
var AppModel = /** @class */ (function () {
    function AppModel(httpClient) {
        this.httpClient = httpClient;
        this.selectedImageId = null;
        this.selectedGroup = null;
        this.groups = [];
        this.width = 600;
        this.canvasModel = new Canvas_1.CanvasModel(this);
    }
    Object.defineProperty(AppModel.prototype, "currentIndex", {
        get: function () {
            if (this.selectedGroup) {
                return this.selectedGroup.files.indexOf(this.selectedImageId);
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModel.prototype, "length", {
        get: function () {
            if (this.selectedGroup) {
                return this.selectedGroup.files.length;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModel.prototype, "imageUrl", {
        get: function () {
            if (this.selectedGroup) {
                return "/data/" + this.selectedGroup.id + "/" + this.selectedImageId;
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    AppModel.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, groups, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.httpClient.fetch("/api/v1/imagegroup")];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        groups = _b.sent();
                        this.groups.splice(0, this.groups.length);
                        (_a = this.groups).push.apply(_a, groups);
                        if (!(groups && groups.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.selectGroup(groups[0].id)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppModel.prototype.selectGroup = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/v1/imagegroup/" + encodeURIComponent(id);
                        return [4 /*yield*/, this.httpClient.fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        group = _a.sent();
                        this.selectedGroup = group;
                        this.selectImage(group.files[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    AppModel.prototype.selectImage = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var labels, label;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedImageId = id;
                        return [4 /*yield*/, this.canvasModel.draw()];
                    case 1:
                        _a.sent();
                        labels = this.selectedGroup.labels;
                        if (labels && labels[id]) {
                            label = labels[id];
                            this.canvasModel.renderOriginalPoint(label.x, label.y);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AppModel.prototype.selectNext = function () {
        if (this.selectedImageId == null) {
            this.selectedImageId = this.selectedGroup.files[0];
        }
        var idx = this.selectedGroup.files.indexOf(this.selectedImageId) + 1;
        if (idx >= this.selectedGroup.files.length) {
            idx = 0;
        }
        this.selectImage(this.selectedGroup.files[idx]);
    };
    AppModel.prototype.selectPrevious = function () {
        if (this.selectedImageId == null) {
            this.selectedImageId = this.selectedGroup.files[this.selectedGroup.files.length - 1];
        }
        var idx = this.selectedGroup.files.indexOf(this.selectedImageId) - 1;
        if (idx < 0) {
            idx = this.selectedGroup.files.length - 1;
        }
        this.selectImage(this.selectedGroup.files[idx]);
    };
    AppModel.prototype.setWidth = function (width) {
        this.width = width;
        this.canvasModel.draw();
    };
    AppModel.prototype.selectNoBall = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("no ball");
                return [2 /*return*/, this.selectPoint(-1000, -1000)];
            });
        });
    };
    AppModel.prototype.selectPoint = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/v1/imagegroup/" + this.selectedGroup.id + "?imageId=" + this.selectedImageId;
                        return [4 /*yield*/, this.httpClient.fetch(url, {
                                method: "POST",
                                headers: {
                                    "Accept": "application/json, text/plain, */*",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ x: x, y: y })
                            })];
                    case 1:
                        response = _a.sent();
                        this.selectedGroup.labels[this.selectedImageId] = { x: x, y: y };
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        mobx_1.observable
    ], AppModel.prototype, "selectedImageId", void 0);
    __decorate([
        mobx_1.observable
    ], AppModel.prototype, "selectedGroup", void 0);
    __decorate([
        mobx_1.observable
    ], AppModel.prototype, "groups", void 0);
    __decorate([
        mobx_1.observable
    ], AppModel.prototype, "width", void 0);
    __decorate([
        mobx_1.computed
    ], AppModel.prototype, "currentIndex", null);
    __decorate([
        mobx_1.computed
    ], AppModel.prototype, "length", null);
    __decorate([
        mobx_1.computed
    ], AppModel.prototype, "imageUrl", null);
    __decorate([
        mobx_1.action
    ], AppModel.prototype, "load", null);
    __decorate([
        mobx_1.action
    ], AppModel.prototype, "selectGroup", null);
    __decorate([
        mobx_1.action.bound
    ], AppModel.prototype, "selectImage", null);
    __decorate([
        mobx_1.action.bound
    ], AppModel.prototype, "selectNext", null);
    __decorate([
        mobx_1.action.bound
    ], AppModel.prototype, "selectPrevious", null);
    __decorate([
        mobx_1.action
    ], AppModel.prototype, "setWidth", null);
    __decorate([
        mobx_1.action
    ], AppModel.prototype, "selectNoBall", null);
    __decorate([
        mobx_1.action
    ], AppModel.prototype, "selectPoint", null);
    return AppModel;
}());
exports.AppModel = AppModel;
