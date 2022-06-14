yasw = require('../../src/yasw_server');
const {do_fake_request, make_fake_request, make_fake_response} = require('../helpers/http_fakes')

var check_request, yasw;

check_request = function (page_name, expected_file) {
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

check_redirect("", 302, "/index.html")
check_request("/index.html", "/index.html");
check_request("/controllers/ship_command.js", "/controllers/ship_command.js");
