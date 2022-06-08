const http_mocks = require("node-mocks-http");

function do_fake_request(server, page_name) {
    let fake_request = http_mocks.createRequest({
        method: 'GET',
        url: `${page_name}`,
    });
    let fake_response = http_mocks.createResponse();

    server.on_request(fake_request, fake_response);
    return fake_response;
}

module.exports.do_fake_request = do_fake_request;