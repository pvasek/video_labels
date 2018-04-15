import "source-map-support/register";
import { describe, it } from "mocha";
import { assert } from "chai";
import { Router } from "../Router";
import { createMemoryHistory } from "history";
import { urlMatchRoute } from "../routeUtils";
import { Route } from "../Route";

describe("urlMatchRoute", function() {
    const data = [
        [[""], [""], true],
        [["project", "settings"], ["project", "settings"], true],
        [["project", "settings"], ["project", "*"], true],
        [["project", "settings"], ["*", "*"], true],
        [["project", "settings2"], ["project", "settings"], false],
        [["projects", "settings"], ["project", "settings"], false],
        [["project", "settings", "1"], ["project", "settings"], false],
        [["project"], ["project", "settings"], false],
        [["settings"], ["project", "settings"], false],
    ];

    data.forEach(i => {
        const url = i[0] as string[];
        const routes = i[1] as string[];
        it(`should match paths url: ${url.join("/")} route: ${routes.join("/")} as ${i[2]}`, function() {
            const result = urlMatchRoute(url, routes);
            assert.equal(result, i[2]);
        });
    });
});

describe("router", function() {
    class TestRouter extends Router {
        home = this.route(null, {}, "");
        app = this.route(this.home, {}, "app");
        projects = this.route(this.app, {}, "projects");
        projectDetail = this.route(this.projects, { id: ""}, p => `${p.id}`);
        users = this.route(this.app, {}, "users");
        userDetail = this.route(this.users, { id: "" }, p => `${p.id}`);

        allRoutes = [
            this.home,
            this.app,
            this.projects,
            this.projectDetail,
            this.users,
            this.userDetail
        ];
    }

    const target = new TestRouter(createMemoryHistory());

    describe("url navigations", function() {
        const data = [
            { 
                path: "/app", 
                current: target.app, 
                active: [target.home, target.app]
            }, { 
                path: "/app/projects", 
                current: target.projects, 
                active: [target.home, target.app, target.projects]
            }, { 
                path: "/app/projects/10", 
                current: target.projectDetail, 
                active: [target.home, target.app, target.projects, target.projectDetail]
            },
        ];

        data.forEach(i => {
            it(`navigate to url for: '${i.path}'`, function() {            
                target.navigateToUrl(i.path);

                function assertCurrent(allRoutes: Route<any>[], route: Route<any>) {
                    allRoutes.forEach(i => {
                        assert.equal(i.isCurrent, i === route, `current failed for: '${i.path.toString()}'`);
                    });
                }
            
                function assertActive(allRoutes: Route<any>[], ...route: Route<any>[]) {
                    allRoutes.forEach(i => {
                        assert.equal(i.isActive, route.some(j => j === i), `active failed for: '${i.path.toString()}'`);
                    });       
                }

                assertCurrent(target.allRoutes, i.current);
                assertActive(target.allRoutes, ...i.active);
            });
        });       
    });

    describe("urls", function() {
        target.projectDetail.params.id = "10";
        const data = [
            { 
                route: target.app,
                url: "/app", 
            }, { 
                route: target.projects,
                url: "/app/projects", 
            }, { 
                route: target.projectDetail,
                url: "/app/projects/10", 
            },
        ];

        data.forEach(i => {
            it(`route should have correct url: ${i.url}`, function() {
                assert.equal(i.route.url, i.url);
            });
        });  
    });    
});