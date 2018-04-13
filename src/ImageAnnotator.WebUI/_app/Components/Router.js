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
var mobx_1 = require("mobx");
var Route = /** @class */ (function () {
    function Route(parent, path, params) {
        this.parent = parent;
        this.path = path;
        this.params = params;
    }
    Route.prototype.parts = function () {
        var path = typeof this.path === "string"
            ? this.path
            : "*";
        return this.parent.parts().concat([
            path
        ]);
    };
    return Route;
}());
exports.Route = Route;
function pathsMatch(paths, routePaths) {
    if (paths.length !== routePaths.length) {
        return false;
    }
    for (var i = 0; i < paths.length; i++) {
        var routePath = routePaths[i];
        var path = paths[i];
        if (routePath === "*") {
            continue;
        }
        if (path !== routePath) {
            return false;
        }
    }
    return true;
}
exports.pathsMatch = pathsMatch;
var Router = /** @class */ (function () {
    function Router(history) {
        this.history = history;
        this.routes = [];
        this.history.listen(function (loc) {
            var paths = loc.pathname.split("/");
        });
    }
    Router.prototype.route = function (parent, path, params) {
        var route = new Route(parent, path, params);
        this.routes.push(route);
        return route;
    };
    __decorate([
        mobx_1.observable
    ], Router.prototype, "currentRoute", void 0);
    return Router;
}());
exports.Router = Router;
var AppRouter = /** @class */ (function (_super) {
    __extends(AppRouter, _super);
    function AppRouter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.root = _this.route(null, "", {});
        _this.projects = _this.route(_this.root, "projects", {});
        _this.projectDetail = _this.route(_this.projects, "", { id: "" });
        return _this;
    }
    return AppRouter;
}(Router));
exports.AppRouter = AppRouter;
