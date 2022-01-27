var yasw_server= require('../../src/yasw_server.js');

describe ("yasw_server#on_open", function() {
    var fake_readstream= { pipe: function() {} }
    var the_server;

    beforeEach(function() {
        var fake_response= {
            setHeader: function() {}
        };
        spyOn(fake_readstream, 'pipe');
        the_server= yasw_server.createServer();
        the_server.on_open(null, fake_response, null, fake_readstream, null);
    });

    it ("calls pipe()", function() {
        expect(fake_readstream.pipe).toHaveBeenCalled();
    });
});
