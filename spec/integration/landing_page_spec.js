const request = require('request');
const yasw = require('../../src/yasw_server');
const fs = require('fs');
const http_mocks = require('node-mocks-http');

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


 function do_fake_request (server, page_name) {
    let fake_response, junk_on_response_headers_written;
    let fake_request = make_fake_request(page_name);
    fake_response = make_fake_response();
    junk_on_response_headers_written = function () {};
    server.on_request(fake_request, fake_response, junk_on_response_headers_written);
    return fake_response;
}


describe('landing page', () => {
    iit('Can get a landing page', () => {
        let the_stream;
        let response_body;
        let originalCreateReadStream = fs.createReadStream;

        spyOn(fs, 'createReadStream').andCallFake((...args) => {
            the_stream = originalCreateReadStream(...args);

            // DEBUG
            global.spy_stream = the_stream;

            spyOn(the_stream, 'pipe').andCallFake((istream) => {
                response_body = fs.readFileSync(istream);
            })
            return the_stream;
        })

        const server = yasw.createServer();
        do_fake_request(server, '/favicon.png');
        expect(response_body).toMatch(/body/);

      // DEBUG
      console.log(`global.spy_stream: ${global.spy_stream}`);
      console.log(`global.server_stream: ${global.server_stream}`);
      console.log(`global.spy_stream === global.server_stream: ${global.spy_stream === global.server_stream}`);
    });
});

