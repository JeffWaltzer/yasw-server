(function() {
  var fs, http_mocks, request, yasw;

  request = require('request');

  yasw = require('./../../src/yasw_server');

  fs = require('fs');

  http_mocks = require('node-mocks-http');

  describe('yasw_server#static_page ', function() {
    var page, server;
    server = void 0;
    page = void 0;
    beforeEach(function() {
      return server = yasw.createServer();
    });
    it('should load the specified file if it exists', function(done) {
      var fake_response, read_stream, saved_createReadStream;
      read_stream = void 0;
      saved_createReadStream = fs.createReadStream;
      fake_response = new http_mocks.createResponse();
      spyOn(fs, 'createReadStream').andCallFake(function(filename) {
        read_stream = saved_createReadStream(filename);
        read_stream.on('end', function() {
          expect(fake_response.statusCode).toEqual(200);
          return done();
        });
        return read_stream;
      });
      page = server.static_page("/index.html", fake_response);
      return expect(fs.createReadStream).toHaveBeenCalledWith("public/index.html");
    });
    return it("should set the return status to 404 if the file doesn't exist", function(done) {
      var fake_response, saved_response_end;
      fake_response = new http_mocks.createResponse();
      saved_response_end = fake_response.end;
      spyOn(fs, 'createReadStream').andCallThrough();
      spyOn(fake_response, 'end').andCallFake(function() {
        var return_value;
        return_value = saved_response_end();
        expect(fake_response.statusCode).toEqual(404);
        done();
        return return_value;
      });
      page = server.static_page("/missing_file", fake_response);
      return expect(fs.createReadStream).toHaveBeenCalledWith("public/missing_file");
    });
  });

}).call(this);
