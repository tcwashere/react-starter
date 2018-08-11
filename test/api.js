var expect  = require("chai").expect;
var request = require("request");

describe("API Tests:", function() {
    describe("test /hello:", function() {
      var url = "http://localhost:3000/";
  
      it("returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
      });
      it("returns the text \"Hello World!\"", function(done) {
        request(url, function(error, response, body) {
            expect(body).to.equal("Hello World!");
            done();
          });
      });
    });
});