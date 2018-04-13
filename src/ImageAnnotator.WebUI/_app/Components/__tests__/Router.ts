import { describe, it } from "mocha";
import { assert } from "chai";
import { pathsMatch } from "../Router";

describe("pathsMatch", function() {
    const data = [
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
            const result = pathsMatch(url, routes);
            assert.equal(result, i[2]);
        });
    });
});
