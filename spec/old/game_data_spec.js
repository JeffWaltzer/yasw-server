yasw = require('./../../src/yasw_server');

function make_fake_response() {
    return {
        headers: {},
        end: function () {},
        on: function () {},
        once: function () {},
        emit: function () {},
        write: function () {},
        setHeader: function (key, value) {
            this.headers[key] = value;
        }
    };
}

function make_fake_request(page_name) {
    return {
        url: `http://localhost:3000${page_name}`
    };
}

var check_content, check_request, check_status, do_fake_request, request, yasw;

do_fake_request = function (server, page_name) {
    var fake_request, fake_response, junk_on_response_headers_written;
    fake_request = make_fake_request(page_name);
    fake_response = make_fake_response();
    junk_on_response_headers_written = function () {};
    server.on_request(fake_request, fake_response, junk_on_response_headers_written);
    return fake_response;
};

check_request = function (page_name, expected_file, expected_content_type) {
    describe(`the server, when asked for '${page_name}'`, function () {
        var server;
        server = void 0;
        beforeEach(function (done) {
            server = yasw.createServer();
            done();
        });
        it(`should call the static page function for ${expected_file}`, function (done) {
            var response;
            spyOn(server, 'static_page').andCallFake(function (filename, response) {
                expect(filename).toEqual(expected_file);
                response.end();
            });

            response = do_fake_request(server, page_name);
            expect(server.static_page).toHaveBeenCalled();
            done();
        });
        it(`should respond with content type ${expected_content_type}`, function (done) {
            var file_extension, read_stream, response, status;
            file_extension = page_name.split('.').pop();
            response = {
                headers: {}, setHeader: function (key, value) {
                    this.headers[key] = value;
                }
            };
            read_stream = {
                pipe: function () {
                }
            };
            status = '200';
            server.on_open(file_extension, response, status, read_stream);
            expect(response.headers['Content-Type']).toEqual(expected_content_type);
            done();
        });
        afterEach(function (done) {
            done();
        });
    });
};

check_redirect = function (page_name, expected_status, expected_target) {
    describe(`the server, when asked for '${page_name}'`, function () {
        var server;
        server = void 0;
        beforeEach(function () {
            server = yasw.createServer();
        });
        it(`should respond with a status of ${expected_status}`, function (done) {
            var fake_request, fake_response;
            fake_request = make_fake_request(page_name)
            fake_response = make_fake_response();
            server.on_request(fake_request, fake_response, function () {
                expect(fake_response.statusCode).toMatch(expected_status);
                done();
            });
        });

        it(`should redirect to ${expected_target}`, function (done) {
            var fake_request, fake_response;
            fake_request = make_fake_request(page_name)
            fake_response = make_fake_response();
            server.on_request(fake_request, fake_response, function () {
                expect(fake_response.headers['location']).toEqual(expected_target);
                done();
            });
        });
    });
};

check_redirect("", 302, "/game.html")
check_redirect("/index.html", 302, "/game.html");

check_request("/game.html", "/game.html", "text/html");
check_request("/controllers/ship_command.js", "/controllers/ship_command.js", "text/javascript")
