var yasw_server= require('../../src/yasw_server.js');
var fs= require('fs');


describe ("yasw_server#on_open", function() {
    var fake_readstream= { pipe: function() {} }
    var the_server;
    var fake_response;

    beforeEach(function() {
        fake_response= {
            headers: {},
            setHeader: function(key, value) {
                fake_response.headers[key] = value;
            },
        };
        spyOn(fake_readstream, 'pipe');
        the_server= yasw_server.createServer();
    });

    it ("calls pipe()", function() {
        the_server.on_open(null, fake_response, null, fake_readstream, null);
        expect(fake_readstream.pipe).toHaveBeenCalled();
    });

    describe("when asked for a .js file", function() {
        it ("sets the content_type to 'text/javascript'", function() {
            the_server.on_open("js", fake_response, null, fake_readstream, null);
            expect(fake_response.headers['Content-Type']).toEqual("text/javascript");
        });
    });
});


describe("YaswServer#static_page", function() {
    var the_server;
    var fake_response= {};
    var fake_status= 200;
    var fake_stream= {
        on: function() {}
    };
    var fake_on_headers_written= function() {};

    beforeEach(function() {
        the_server= yasw_server.createServer();
        spyOn(fs, 'createReadStream').andReturn(fake_stream)
        the_server.static_page("/page", fake_response, fake_status, fake_on_headers_written);
    });

    it("calls createReadStream", function() {
        expect(fs.createReadStream).toHaveBeenCalledWith("public/page");
    });

    it("sets a callback for read_stream.on", function() {fail();});
    it("sets a callback for read_stream.error", function() {fail();})
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

