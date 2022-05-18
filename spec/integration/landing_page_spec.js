const request = require('request');
const yasw = require('../../src/yasw_server');
const fs = require('fs');
const http_mocks = require('node-mocks-http');


function do_fake_request(server, page_name) {
    let fake_request = http_mocks.createRequest({
        method: 'GET',
        url: `/${page_name}`,
    });
    let fake_response = http_mocks.createResponse();

    server.on_request(fake_request, fake_response);
    return fake_response;
}

describe('landing page', () => {
    it('Can get a landing page', (done) => {
        let the_stream;
        let response_body;
        let originalCreateReadStream = fs.createReadStream;

        spyOn(fs, 'createReadStream').andCallFake((...args) => {
            the_stream = originalCreateReadStream(...args);

            the_stream.on('end', () => {
                expect(response_body).toMatch(/body/);
                done();
            })

            spyOn(the_stream, 'pipe').andCallFake((istream) => {
                response_body = fs.readFileSync(...args);
                the_stream.emit('end');
            })
            return the_stream;
        })

        const server = yasw.createServer();
        do_fake_request(server, '/game.html');
    });
});

