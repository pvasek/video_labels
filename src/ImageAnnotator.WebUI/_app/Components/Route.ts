import { observable } from "mobx";

export interface RouteNavigator {
    navigate(): void;
    url: string;
}

export interface RouteNavigatorFactory {
    createNavigator(url: string): RouteNavigator;
}

export class Route<TParams> {
    constructor(
        public parent: Route<any> | null, 
        public params: TParams,
        public path: string | ((params: TParams) => string),
        private routeNavigatorFactory: RouteNavigatorFactory) {
    }

    @observable isActive: boolean = false;
    @observable isCurrent: boolean = false;

    get url(): string {
        const path = typeof this.path === "string" 
            ? this.path
            : this.path(this.params);

        return this.parent
            ? `${this.parent.url}/${path}`
            : path;
    }

    getUrl(params: TParams): string {
        const path = typeof this.path === "string" 
            ? this.path
            : this.path(params);

        return this.parent
            ? `${this.parent.getUrl(params)}/${path}`
            : path;
    }

    parts(): string[] {
        const path = typeof this.path === "string" 
            ? this.path
            : "*";

        return this.parent 
            ? [...this.parent.parts(), path]
            : [path];
    }

    navigator(params: TParams): RouteNavigator {
        const url = this.getUrl(params);
        return this.routeNavigatorFactory.createNavigator(url);
    }
}

