import { observable } from "mobx";

export class Route<TParams> {
    constructor(
        public parent: Route<any> | null, 
        public path: string, 
        public params: TParams) {
    }
}

export class Router {

    @observable currentRoute: Route<any>;

    private routes: Route<any>[] = [];

    route<TParams>(parent: Route<any> | null, 
        path: string, 
        params: TParams): Route<TParams> {
        const route = new Route(parent, path, params);

        return route;
    }
}

export class AppRouter extends Router {

    root = this.route(null, "", {});

    projects = this.route(this.root, "projects", {});

    projectDetail = this.route(this.projects, "", {id: "" });
}
