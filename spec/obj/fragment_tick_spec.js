(function() {
  var Fragment, Polygon, Ship, underscore, yasw;

  underscore = require('underscore');

  yasw = require('./../../src/yasw_server');

  Ship = require('./../../src/ship').Ship;

  Fragment = require('./../../src/fragment').Fragment;

  Polygon = require('./../../src/polygon').Polygon;

  describe('game tick', function() {
    var game_field;
    game_field = void 0;
    beforeEach(function() {
      var game, server;
      server = yasw.createServer({
        ship_rotation_rate: 2 * Math.PI,
        tick_rate: 10,
        fragment_lifetime: 20
      });
      game = server.game;
      game_field = game.game_field;
      game_field.add_screen_object(new Fragment({
        game_field: game_field,
        shape: [new Polygon([[0, 0], [0, 5], [5, 5], [5, 0]])]
      }));
      game_field.add_screen_object(new Fragment({
        game_field: game_field,
        shape: [new Polygon([[2, 2], [2, 7], [7, 7], [7, 2]])]
      }));
      return game.tick();
    });
    return it('does not collide', function() {
      return expect(game_field.fragments().length).toEqual(2);
    });
  });

  describe("game#tick", function() {
    var dead_fragment, fragment, heading_change, original_fragment_life_left, sent_data, server, ships;
    server = void 0;
    heading_change = void 0;
    sent_data = void 0;
    ships = void 0;
    fragment = void 0;
    dead_fragment = void 0;
    original_fragment_life_left = void 0;
    beforeEach(function() {
      var fake_socket;
      server = yasw.createServer({
        ship_rotation_rate: 2 * Math.PI,
        tick_rate: 10,
        fragment_lifetime: 20
      });
      heading_change = Ship.rotation_rate / server.tick_rate;
      ships = [];
      ships.push(server.game.game_field.add_ship({
        rotation: 0,
        heading: 0,
        points: [[5, 0]],
        position: [10, 10]
      }));
      ships.push(server.game.game_field.add_ship({
        rotation: 0,
        heading: Math.PI / 2,
        points: [[3, 0]],
        position: [20, 20]
      }));
      fragment = ships[0].explode()[0];
      dead_fragment = ships[1].explode()[0];
      dead_fragment.life_left = 0;
      fake_socket = {
        send: function(data) {
          return sent_data = data;
        }
      };
      original_fragment_life_left = fragment.life_left;
      return server.game.tick();
    });
    it('updates fragments', function() {
      return expect(fragment.life_left).toBeCloseTo(original_fragment_life_left - 1 / server.tick_rate, 6);
    });
    it('does not kill the live fragment', function() {
      return expect(server.game.game_field.screen_objects()).toContain(fragment);
    });
    it('has no dead fragments', function() {
      return expect(server.game.game_field.screen_objects()).not.toContain(dead_fragment);
    });
    return afterEach(function() {
      return server = null;
    });
  });

}).call(this);
