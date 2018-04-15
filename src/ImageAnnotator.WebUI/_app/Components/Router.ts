import { observable, action } from "mobx";
import { createBrowserHistory, History } from "history";
import { Route } from "./Route";
import { urlMatchRoute } from "./routeUtils";
export class Router {

    constructor(private history: History) {
        this.history.listen(loc => {
            this.navigateToUrl(loc.pathname);
        });        
    }

    @action startRouter() {
        console.log("Router.startRouter url:", this.history.location.pathname);
        this.navigateToUrl(this.history.location.pathname);
    }

    @action navigateToRoute(route: Route<any>) {        
        this.setCurrentRoute(route);
        this.history.push(route.url);
    }

    @action navigateToUrl(url: string) {
        const urlParts = url === ""
            ? []
            : url.split("/");

        let currentRoute: Route<any> = null;
        
        this.routes.forEach(i => {
            i.isActive = false;
            i.isCurrent = false;
            if (urlMatchRoute(urlParts, i.parts())) {
                currentRoute = i;
            }
        });

        if (currentRoute) {
            this.setCurrentRoute(currentRoute);
        }        
    }

    private setCurrentRoute(route: Route<any>) {
        console.log("Router.setCurrentRoute route: ", route.path.toString());
        route.isCurrent = true;
        let r = route;
        while (r) {
            r.isActive = true;
            r = r.parent;
        }
    }

    @observable currentRoute: Route<any>;

    private routes: Route<any>[] = [];

    route<TParams>(parent: Route<any> | null,         
        params: TParams,
        path: string | ((params: TParams) => string)): Route<TParams> {
        const that = this;
        const navigatorFactory = {                
            createNavigator(url: string) {
                return {
                    url: url,
                    navigate() {
                        that.navigateToUrl(url);
                        that.history.push(url);
                    }
                }
            }
        };

        const route = new Route(
            parent,
            params,
            path,
            navigatorFactory);
        this.routes.push(route);
        return route;
    }    
}

export class AppRouter extends Router {
    home = this.route(null, {}, "");
    app = this.route(this.home, {}, "app");
    projects = this.route(this.app, {}, "projects");
    projectDetail = this.route(this.projects, {id: "" }, "");
}
