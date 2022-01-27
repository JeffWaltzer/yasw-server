var yasw_server= require('../../src/yasw_server.js');

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
