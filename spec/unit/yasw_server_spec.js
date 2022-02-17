var yasw_server = require('../../src/yasw_server.js');
var fs = require('fs');




describe("YaswServer#static_page", function () {
    var the_server;
    var fake_response = {};
    var fake_status = 200;
    var fake_stream = {
        on: function () {
        }
    };
    var fake_on_headers_written = function () {
    };

    beforeEach(function () {
        the_server = yasw_server.createServer();
        spyOn(fs, 'createReadStream').andReturn(fake_stream)
        spyOn(fake_stream, 'on')
        the_server.static_page("/page", fake_response, fake_status, fake_on_headers_written);
    });

    it("calls createReadStream", function () {
        expect(fs.createReadStream).toHaveBeenCalledWith("public/page");
    });

    it("sets a callback for read_stream.on", function () {
        expect(fake_stream.on).toHaveBeenCalledWith('open', jasmine.any(Function))
    });

    it("sets a callback for read_stream.error", function () {
        expect(fake_stream.on).toHaveBeenCalledWith('error', jasmine.any(Function))
    })
});

describe("yasw_server#on_open", function () {
    let fake_readstream;
    let the_server;
    let fake_response;

    beforeEach(function () {
        fake_readstream = {
            pipe: function () {
            }
        };
        fake_response = {
            headers: {},
            setHeader: function (key, value) {
                fake_response.headers[key] = value;
            },
        };
        spyOn(fake_readstream, 'pipe');
        the_server = yasw_server.createServer();
    });

    it("calls pipe()", function () {
        the_server.on_open(null, fake_response, null, fake_readstream, null);
        expect(fake_readstream.pipe).toHaveBeenCalled();
    });

});

describe("YaswServer#on_open", function () {

    beforeEach(function (done) {
        server = yasw_server.createServer();
        response = {
            headers: {},
            setHeader: function (key, value) {
                this.headers[key] = value;
            }
        };
        read_stream = {
            pipe: function () {
            }
        };
        done();
    });

    it(`calls pipe on read_stream with request`, function (done) {
        spyOn(read_stream, 'pipe')
        server.on_open("html", response, '200', read_stream);
        expect(read_stream.pipe).toHaveBeenCalledWith(response);
        done();
    });

    it(`calls on_headers_written`, function (done) {

        let stub_on_headers_written = jasmine.createSpy("on_headers_written")

        server.on_open(
            "html",
            response,
            '200',
            read_stream,
            stub_on_headers_written);

        expect(stub_on_headers_written).toHaveBeenCalled();
        done();
    });

    check_content_type = function (page_name, expected_content_type) {
        describe(`the server, when asked for '${page_name}'`, function () {
            beforeEach(function(done){
                file_extension = page_name.split('.').pop();
                server.on_open(file_extension, response, '200', read_stream);
                done()
            })

            it(`should respond with content type ${expected_content_type}`, function (done) {
                expect(response.headers['Content-Type']).toEqual(expected_content_type);
                done();
            });
        });
    }

    check_content_type("page.html", "text/html")
    check_content_type("page.js", "text/javascript")
    check_content_type("page.css", "text/css")

});


// check_content("/game.html", /Space Wars/)

// check_content = function (page_name, expected_content_regexp) {
//     describe(`the server, when asked for '${page_name}'`, function () {
//         var server;
//         server = void 0;
//         beforeEach(function () {
//             server = yasw.createServer();
//         });
//         it("should respond with a page matching", function (done) {
//             var fake_request, fake_response, got_body;
//             got_body = [];
//             fake_request = make_fake_request("");

//             fake_response = make_fake_response();
//             fake_response.write = function (data) {
//                 got_body.push(data);
//             };
//             fake_response.end = function (data) {
//                 if (data) {
//                     got_body.push(data);
//                 }
//                 got_body = Buffer.concat(got_body);
//                 expect(got_body.toString()).toMatch(expected_content_regexp);
//                 done();
//             };
//             server.on_request(fake_request, fake_response);
//         });
//     });
// }

