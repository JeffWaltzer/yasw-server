(function() {
  var Polygon, ship, underscore, yasw;

  underscore = require('underscore');

  yasw = require('./../../src/yasw_server');

  ship = require('./../../src/ship');

  Polygon = require('./../../src/polygon').Polygon;

  describe("game#tick", function() {
    var fake_socket, player;
    player = void 0;
    fake_socket = void 0;
    beforeEach(function() {
      var server, viewing_ship;
      server = yasw.createServer({
        ship_rotation_rate: 2 * Math.PI, // radians/s
        tick_rate: 10, // ticks/s
        bullet_lifetime: 20
      });
      fake_socket = {
        send: function(data) {
          return this.sent_data = data;
        }
      };
      player = server.game.add_player();
      player.socket = fake_socket;
      viewing_ship = server.game.game_field.add_ship({
        angular_velocity: 0,
        heading: 0,
        position: [50, 60]
      });
      server.game.connect_ship(player, viewing_ship);
      viewing_ship.stop_screen_updates();
      spyOn(player.socket, 'send');
      return server.game.tick();
    });
    return it("doesn't call send_game_board()", function() {
      return expect(player.socket.send).not.toHaveBeenCalled();
    });
  });

}).call(this);
