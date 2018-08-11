var expect = require("chai").expect;
var hello = require("../app/hello");

describe("Hello Module Tests:", () => {
    describe("test speak function:", () => {
        it("should return \"Hello World!\"", () => {
            var str = hello.speak();

            expect(str).to.equal("Hello World!");
        });
    });
});