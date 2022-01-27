(function() {
  var check_content, check_request, check_status, do_fake_request, request, yasw;

  request = require('request');

  yasw = require('./../../src/yasw_server');

  do_fake_request = function(server, page_name) {
    var fake_request, fake_response, junk_on_response_headers_written;
    console.log(`--------------------------------- page_name=${page_name}\n`);
    fake_request = {
      url: `http://localhost:3000${page_name}`
    };
    fake_response = {
      headers: {},
      end: function() {
        return console.log("end");
      },
      //    setHeader: (key, value) ->
      //      fake_response.headers[key] = value
      //      console.log("setHeader(#{key}, #{value})")
      on: function() {
        return console.log("on");
      },
      once: function() {
        return console.log("once");
      },
      emit: function() {
        return console.log("emit");
      },
      write: function() {
        return console.log("write");
      }
    };
    fake_response.setHeader = function(key, value) {
      console.log(`before in setHeader fake_response.headers = ${Object.keys(fake_response.headers)}`);
      fake_response.headers[key] = value;
      return console.log(`after  in setHeader fake_response.headers = ${Object.keys(fake_response.headers)}`);
    };
    junk_on_response_headers_written = function() {
      return console.log('j.o.r.h.w.');
    };
    server.on_request(fake_request, fake_response, junk_on_response_headers_written);
    return fake_response;
  };

  check_request = function(page_name, expected_file, expected_content_type) {
    return describe(`the server, when asked for '${page_name}'`, function() {
      var server;
      server = void 0;
      beforeEach(function(done) {
        server = yasw.createServer();
        return done();
      });
      it(`should call the static page function for ${expected_file}`, function(done) {
        var response;
        spyOn(server, 'static_page').andCallFake(function(filename, response) {
          expect(filename).toEqual(expected_file);
          return response.end();
        });
        response = do_fake_request(server, page_name);
        expect(server.static_page).toHaveBeenCalled();
        return done();
      });
      it(`should respond with content type ${expected_content_type}`, function(done) {
        var file_extension, read_stream, response, status;
        file_extension = page_name.split(',').pop();
        response = {
          headers: {},
          setHeader: function(key, value) {
            return this.headers[key] = value;
          }
        };
        read_stream = {
          pipe: function() {
            return console.log('qPipe called');
          }
        };
        status = '200';
        server.on_open(file_extension, response, status, read_stream);
        expect(response.headers['Content-Type']).toEqual(expected_content_type);
        return done();
      });
      return afterEach(function(done) {
        return done();
      });
    });
  };

  check_content = function(page_name, expected_content_regexp) {
    return describe(`the server, when asked for '${page_name}'`, function() {
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
    return describe(`the server, when asked for '${page_name}'`, function() {
      var server;
      server = void 0;
      beforeEach(function() {
        return server = yasw.createServer();
      });
      return it(`should respond with a status of ${expected_status}`, function(done) {
        var fake_request, fake_response;
        fake_request = {
          url: `http://www.example.com/${page_name}`,
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

  //check_request("", "/index.html", "text/html")
  //check_status("", 302);
  //check_redirect("", 302, "/index.html");
  check_request("/game.html", "/game.html", "text/html");

  //check_content("/game.html", /Space Wars/)
//check_request("/controllers/ship_command.js", "/controllers/ship_command.js", "text/javascript")

}).call(this);
