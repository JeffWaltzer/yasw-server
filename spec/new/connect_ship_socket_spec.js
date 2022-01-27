(function() {
  var ship, yasw;

  yasw = require('./../../src/yasw_server');

  ship = require('./../../src/ship');

  describe("ship#outline", function() {
    var fake_socket, on_callbacks, server, the_ship;
    server = null;
    on_callbacks = {};
    fake_socket = null;
    the_ship = null;
    beforeEach(function() {
      fake_socket = {
        send: function() {},
        on: function(event, callback) {
          return on_callbacks[event] = callback;
        }
      };
      server = yasw.createServer();
      the_ship = server.on_new_websocket(fake_socket);
      return on_callbacks['message'](JSON.stringify({
        command: 'rotate_left'
      }));
    });
    it('rotates the correct ship', function() {
      return expect(the_ship.angular_velocity()).toEqual(-ship.Ship.rotation_rate);
    });
    return afterEach(function() {
      return server = null;
    });
  });

}).call(this);
