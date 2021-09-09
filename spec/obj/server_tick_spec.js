(function() {
  var Polygon, Vector, ship, underscore, yasw;

  underscore = require('underscore');

  yasw = require('./../../src/yasw_server');

  ship = require('./../../src/ship');

  Polygon = require('./../../src/polygon').Polygon;

  Vector = require('./../../src/vector').Vector;

  describe("server initialization", function() {
    var server;
    server = void 0;
    beforeEach(function() {
      spyOn(global, 'setInterval');
      return server = yasw.createServer();
    });
    return it("arranges for game#tick to be called periodically", function() {
      return expect(setInterval.mostRecentCall.args[1]).toEqual(1000 / server.tick_rate);
    });
  });

  describe("game#tick", function() {
    var bullet, dead_bullet, expected_velocity, heading_change, sent_data, server, ships;
    server = void 0;
    heading_change = void 0;
    sent_data = void 0;
    ships = void 0;
    bullet = void 0;
    dead_bullet = void 0;
    expected_velocity = void 0;
    beforeEach(function() {
      var delta_v, delta_x, delta_y, distance, fake_socket, player, the_ship, the_sun, viewing_ship;
      server = yasw.createServer({
        ship_rotation_rate: 2 * Math.PI,
        tick_rate: 10,
        bullet_lifetime: 20
      });
      heading_change = ship.Ship.rotation_rate / server.tick_rate;
      ships = [];
      ships.push(server.game.game_field.add_ship({
        angular_velocity: 0,
        heading: 0,
        position: [50, 0]
      }));
      ships.push(server.game.game_field.add_ship({
        angular_velocity: 0,
        heading: Math.PI / 2,
        position: [100, 1000]
      }));
      ships.push(server.game.game_field.add_ship({
        angular_velocity: ship.Ship.rotation_rate,
        heading: 0,
        position: [30, 30]
      }));
      ships.push(server.game.game_field.add_ship({
        angular_velocity: -ship.Ship.rotation_rate,
        heading: Math.PI / 2,
        position: [105, 100]
      }));
      bullet = ships[0].fire();
      dead_bullet = ships[1].fire();
      dead_bullet.life_left = 0;
      fake_socket = {
        send: function(data) {
          return sent_data = data;
        }
      };
      player = server.game.add_player();
      player.socket = fake_socket;
      viewing_ship = server.game.game_field.add_ship({
        angular_velocity: 0,
        heading: 0,
        position: [50, 60]
      });
      player.ship = viewing_ship;
      the_sun = server.game.game_field.suns()[0];
      the_ship = ships[0];
      delta_x = the_sun.position().x() - the_ship.position().x();
      delta_y = the_sun.position().y() - the_ship.position().y();
      distance = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
      delta_v = the_sun.mass() * the_ship.mass() / (distance * distance);
      expected_velocity = new Vector([delta_v * delta_x / distance, delta_v * delta_y / distance]);
      return server.game.tick();
    });
    it("doesn't change the first ship's heading", function() {
      return expect(ships[0].heading).toBeCloseTo(0, 6);
    });
    it("updates the first ship's velocity from the sun's gravity", function() {
      return expect(ships[0].velocity()).toEqual(expected_velocity);
    });
    it("doesn't change the second ship's heading", function() {
      return expect(ships[1].heading).toBeCloseTo(Math.PI / 2, 6);
    });
    it("updates the third ship's heading", function() {
      return expect(ships[2].heading).toBeCloseTo(heading_change, 6);
    });
    it("updates the fourth ship's heading", function() {
      return expect(ships[3].heading).toBeCloseTo(Math.PI / 2 - heading_change, 6);
    });
    it('shows ships', function() {
      var message, outlines;
      message = JSON.parse(sent_data);
      outlines = message.polygons;
      return expect(Object.keys(outlines).length).toEqual(7);
    });
    it('updates bullets', function() {
      return expect(bullet.life_left).toBeCloseTo(20 - 1 / server.tick_rate, 6);
    });
    it('has no dead bullets', function() {
      return expect(server.game.game_field.screen_objects()).not.toContain(dead_bullet);
    });
    return afterEach(function() {
      return server = null;
    });
  });

}).call(this);
