const request = require('request');
const yasw = require('../../src/yasw_server');
const fs = require('fs');
const http_mocks = require('node-mocks-http');

describe('yasw_server#static_page ', () => {
  var page, server;
  server = void 0;
  page = void 0;
  beforeEach(() => {
    server = yasw.createServer();
  });

  it('should set the status to 200 OK if the specified file exists', (done) => {
    var fake_response, read_stream, saved_createReadStream;
    read_stream = {
      on: (event,handler)=>{
      }
    };
    fake_response = new http_mocks.createResponse();
    spyOn(fs, 'createReadStream').andCallFake((filename) => {
      return read_stream;
    });
    page = server.static_page("/index.html", fake_response);
    expect(fake_response.statusCode).toEqual(200);
    done();
  });

  it('should load the specified file if it exists', (done) => {
    var fake_response, read_stream, saved_createReadStream;
    read_stream = void 0;
    saved_createReadStream = fs.createReadStream;
    fake_response = new http_mocks.createResponse();
    spyOn(fs, 'createReadStream').andCallThrough();
    // spyOn(fs, 'createReadStream').andCallFake((filename) => {
    //   read_stream = saved_createReadStream(filename);
    //   return read_stream;
    // });
    page = server.static_page("/index.html", fake_response);
    expect(fs.createReadStream).toHaveBeenCalledWith("public/index.html");
    done();
  });

  it("should set the return status to 404 if the file doesn't exist", (done) => {
    var fake_response, saved_response_end;
    fake_response = new http_mocks.createResponse();
    saved_response_end = fake_response.end;
    spyOn(fs, 'createReadStream').andCallThrough();
    spyOn(fake_response, 'end').andCallFake(() => {
      saved_response_end();
      expect(fake_response.statusCode).toEqual(404);
      done();
    });
    page = server.static_page("/missing_file", fake_response);
    expect(fs.createReadStream).toHaveBeenCalledWith("public/missing_file");
  });
});
