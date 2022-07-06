(function() {
  var Bullet, Polygon, Ship, custom_matchers, yasw;

  yasw = require('./../../src/yasw_server');

  Ship = require('./../../src/ship').Ship;

  Bullet = require('./../../src/bullet').Bullet;

  custom_matchers = require('./../helpers/to_aproximately_equal').custom_matchers;

  Polygon = require('./../../src/polygon').Polygon;

  describe('ship', function() {
    var the_ship;
    the_ship = void 0;
    beforeEach(function() {
      return the_ship = new Ship({}, 0, 0, 0);
    });
    it('is a ship', function() {
      return expect(the_ship.is_ship()).toEqual(true);
    });
    return it('has the correct mass', function() {
      return expect(the_ship.mass()).toEqual(1.0);
    });
  });

  describe("ship#outline", function() {
    var server;
    server = void 0;
    beforeEach(function() {
      var ship;
      jasmine.addMatchers(custom_matchers);
      server = yasw.createServer();
      ship = server.game.game_field.add_ship({
        heading: -Math.PI / 2
      });
      ship.shape([new Polygon([[10, 0]])]);
      ship.update_outline();
      ship = server.game.game_field.add_ship({
        heading: 0
      });
      ship.shape([new Polygon([[5, 0]])]);
      ship.update_outline();
      ship = server.game.game_field.add_ship({
        heading: Math.PI / 2
      });
      ship.shape([new Polygon([[3, 0]])]);
      return ship.update_outline();
    });
    it("updates the ship position for heading -π/2", function() {
      return expect(server.game.game_field.ships()[0].outline()).toAproximatelyEqual([[0, -10]], 1e-6);
    });
    it("doesn't change the ship position for heading 0", function() {
      return expect(server.game.game_field.ships()[1].outline()).toAproximatelyEqual([[5, 0]], 1e-6);
    });
    it("doesn't change the ship position for heading π/2", function() {
      return expect(server.game.game_field.ships()[2].outline()).toAproximatelyEqual([[0, 3]], 1e-6);
    });
    return afterEach(function() {
      return server = null;
    });
  });

  describe("Ship#gun_point", function() {
    var server;
    server = void 0;
    beforeEach(function() {
      jasmine.addMatchers(custom_matchers);
      server = yasw.createServer();
      server.game.game_field.add_ship({
        position: [0, 0],
        heading: 0
      });
      server.game.game_field.add_ship({
        position: [0, 0],
        heading: Math.PI / 2
      });
      return server.game.game_field.add_ship({
        position: [10, 10],
        heading: Math.PI
      });
    });
    it("expect correct gun_point for unrotated ship", function() {
      expect(server.game.game_field.ships()[0].gun_point().x()).toEqual(21);
      return expect(server.game.game_field.ships()[0].gun_point().y()).toEqual(0);
    });
    it("expect correct gun_point for rotated ship", function() {
      expect(server.game.game_field.ships()[1].gun_point().x()).toBeCloseTo(0, 6);
      return expect(server.game.game_field.ships()[1].gun_point().y()).toBeCloseTo(21, 6);
    });
    it("expect correct gun_point for rotated and translated ship", function() {
      expect(server.game.game_field.ships()[2].gun_point().x()).toBeCloseTo(-11, 6);
      return expect(server.game.game_field.ships()[2].gun_point().y()).toBeCloseTo(10, 6);
    });
    return afterEach(function() {
      return server = null;
    });
  });

  describe("Ship#fire", function() {
    var the_game, the_ship;
    the_game = {};
    the_ship = void 0;
    beforeEach(function() {
      var the_server;
      the_server = yasw.createServer();
      the_game = the_server.game;
      the_ship = the_game.game_field.add_ship();
      return the_ship.fire();
    });
    it("adds a bullet", function() {
      return expect(the_game.game_field.bullets().length).toEqual(1);
    });
    return afterEach(function() {
      the_game = null;
      return the_ship = null;
    });
  });

  describe("Ship#clone", function() {
    var the_game, the_ship;
    the_game = {};
    the_ship = void 0;
    beforeEach(function() {
      var the_server;
      the_server = yasw.createServer();
      the_game = the_server.game;
      the_ship = the_game.game_field.add_ship();
      return the_ship.clone();
    });
    it("adds a ship", function() {
      return expect(the_game.game_field.ships().length).toEqual(2);
    });
    return afterEach(function() {
      the_game = null;
      return the_ship = null;
    });
  });

}).call(this);
