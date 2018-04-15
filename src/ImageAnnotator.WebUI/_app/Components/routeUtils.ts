/** Evalutes if url path match the route path */
export function urlMatchRoute(urlParts: string[], routeParts: string[]) {
    // console.log("urlMatchRoute urlParts:", urlParts, "routeParts: ", routeParts);
    if (urlParts.length !== routeParts.length) {
        return false;
    }

    for (let i = 0; i < urlParts.length; i++) {
        const routePath = routeParts[i];
        const path = urlParts[i];

        if (routePath === "*") {
            continue;
        }

        if (path !== routePath) {
            return false;
        }
    }
    
    return true;
}