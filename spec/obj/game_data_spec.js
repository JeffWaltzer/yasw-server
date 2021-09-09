(function() {
  var check_content, check_request, check_status, request, yasw;

  request = require('request');

  yasw = require('./../../src/yasw_server');

  check_request = function(page_name, expected_file, expected_content_type) {
    return describe("the server, when asked for '" + page_name + "'", function() {
      var server;
      server = void 0;
      beforeEach(function(done) {
        server = yasw.createServer();
        return server.listen(3000, done);
      });
      it("should call the static page function for " + expected_file, function(done) {
        spyOn(server, 'static_page').andCallFake(function(filename, response) {
          expect(filename).toEqual(expected_file);
          return response.end();
        });
        return request("http://localhost:3000" + page_name, function(error, response, body) {
          expect(server.static_page).toHaveBeenCalled();
          return done();
        });
      });
      it("should respond with content type " + expected_content_type, function(done) {
        return request("http://localhost:3000" + page_name, function(error, response, body) {
          expect(error).toBeNull();
          expect(response).toBeDefined();
          expect(response.headers['content-type']).toEqual(expected_content_type);
          return done();
        });
      });
      return afterEach(function(done) {
        return server.shutdown(done);
      });
    });
  };

  check_content = function(page_name, expected_content_regexp) {
    return describe("the server, when asked for '" + page_name + "'", function() {
      var server;
      server = void 0;
      beforeEach(function() {
        return server = yasw.createServer();
      });
      return it("should respond with a page matching", function(done) {
        var fake_request, fake_response, got_body;
        got_body = [];
        fake_request = {
          url: "http://www.example.com",
          once: function() {},
          connection: {
            encrypted: false
          },
          headers: {}
        };
        fake_response = {
          setHeader: function() {},
          getHeader: function() {},
          on: function() {},
          once: function() {},
          emit: function() {},
          write: function(data) {
            return got_body.push(data);
          },
          end: function(data) {
            if (data) {
              got_body.push(data);
            }
            got_body = Buffer.concat(got_body);
            expect(got_body.toString()).toMatch(expected_content_regexp);
            return done();
          }
        };
        return server.on_request(fake_request, fake_response);
      });
    });
  };

  check_status = function(page_name, expected_status) {
    return describe("the server, when asked for '" + page_name + "'", function() {
      var server;
      server = void 0;
      beforeEach(function() {
        return server = yasw.createServer();
      });
      return it("should respond with a status of " + expected_status, function(done) {
        var fake_request, fake_response;
        fake_request = {
          url: "http://www.example.com/" + page_name,
          once: function() {},
          connection: {
            encrypted: false
          },
          headers: {}
        };
        fake_response = {
          setHeader: function() {},
          getHeader: function() {},
          on: function() {},
          once: function() {},
          emit: function() {},
          write: function() {},
          end: function() {}
        };
        return server.on_request(fake_request, fake_response, function() {
          expect(fake_response.statusCode).toMatch(expected_status);
          return done();
        });
      });
    });
  };

  check_request("", "/index.html", "text/html");

  check_content("", /Space Wars/);

  check_status("", 302);

  check_request("/game.html", "/game.html", "text/html");

  check_content("/game.html", /Space Wars/);

  check_request("/controllers/ship_command.js", "/controllers/ship_command.js", "text/javascript");

}).call(this);
