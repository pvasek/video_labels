import { observable } from "mobx";
import { createBrowserHistory, History } from "history";

export class Route<TParams> {
    constructor(
        public parent: Route<any> | null, 
        public path: string | ((params: TParams) => string), 
        public params: TParams) {
    }

    parts(): string[] {
        const path = typeof this.path === "string" 
            ? this.path
            : "*";

        return [
            ...this.parent.parts(),
            path
        ];
    }
}

export function pathsMatch(paths: string[], routePaths: string[]) {
    if (paths.length !== routePaths.length) {
        return false;
    }

    for (let i = 0; i < paths.length; i++) {
        const routePath = routePaths[i];
        const path = paths[i];

        if (routePath === "*") {
            continue;
        }

        if (path !== routePath) {
            return false;
        }
    }
    
    return true;
}

export class Router {

    constructor(private history: History) {
        this.history.listen(loc => {
            const paths = loc.pathname.split("/");
        });
    }

    @observable currentRoute: Route<any>;

    private routes: Route<any>[] = [];

    route<TParams>(parent: Route<any> | null, 
        path: string, 
        params: TParams): Route<TParams> {
        const route = new Route(parent, path, params);
        this.routes.push(route);
        return route;
    }
}

export class AppRouter extends Router {

    root = this.route(null, "", {});

    projects = this.route(this.root, "projects", {});

    projectDetail = this.route(this.projects, "", {id: "" });
}
