const http_mocks = require("node-mocks-http");

function make_fake_request(page_name) {
    return http_mocks.createRequest({
        method: "GET",
        url: `http://localhost:3000${page_name}`
    });
}

function make_fake_response() {
    let fakeResponse = http_mocks.createResponse();
    fakeResponse.headers = {};
    fakeResponse.setHeader = (key, value) => {
        fakeResponse.headers[key] = value;
    }
    return fakeResponse;
}

function do_fake_request(server, page_name) {

    let fake_request = make_fake_request(page_name);
    let fake_response = make_fake_response();

    server.on_request(fake_request, fake_response);
    return fake_response;
}

module.exports.do_fake_request = do_fake_request;
module.exports.make_fake_request = make_fake_request;
module.exports.make_fake_response = make_fake_response;
