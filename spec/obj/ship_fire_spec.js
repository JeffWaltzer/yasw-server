(function() {
  var game, ship, vector;

  game = require('./../../src/game');

  ship = require('./../../src/ship');

  vector = require('./../../src/vector');

  describe('Ship fires a bullet', function() {
    describe("when moving in the same direction it's pointed", function() {
      return it('creates a bullet', function() {
        var bullet, the_game, the_player, the_ship;
        the_game = new game.Game({
          ship_rotation_rate: 1,
          tick_rate: 1,
          acceleration_rate: 1,
          field_size: new vector.Vector([900, 900]),
          bullet_speed: 10
        });
        the_player = the_game.add_player('Frank Zappa');
        the_ship = the_game.game_field.add_ship({
          velocity: [50, 50],
          heading: Math.PI / 4,
          player: the_player
        });
        bullet = the_ship.fire();
        expect(bullet.velocity().x()).toBeCloseTo(50 + 10 / Math.sqrt(2), 6);
        expect(bullet.velocity().y()).toBeCloseTo(50 + 10 / Math.sqrt(2), 6);
        return expect(bullet.player()).toEqual(the_player);
      });
    });
    describe("bullet fired from stationary ship heading PI/4", function() {
      return it('creates a bullet heading PI/4', function() {
        var bullet, the_game, the_player, the_ship;
        the_game = new game.Game({
          ship_rotation_rate: 1,
          tick_rate: 10,
          acceleration_rate: 1,
          field_size: new vector.Vector([900, 900]),
          bullet_speed: 10
        });
        the_player = the_game.add_player('Frank Zappa');
        the_ship = the_game.game_field.add_ship({
          velocity: [0, 0],
          heading: Math.PI / 4,
          player: the_player
        });
        bullet = the_ship.fire();
        expect(bullet.velocity().x()).toBeCloseTo(10 / Math.sqrt(2), 6);
        expect(bullet.velocity().y()).toBeCloseTo(10 / Math.sqrt(2), 6);
        return expect(bullet.player()).toEqual(the_player);
      });
    });
    describe("bullet fired from stationary ship heading PI/2", function() {
      return it('creates a bullet heading PI/2', function() {
        var bullet, the_game, the_player, the_ship;
        the_game = new game.Game({
          ship_rotation_rate: 1,
          tick_rate: 10,
          acceleration_rate: 1,
          field_size: new vector.Vector([900, 900]),
          bullet_speed: 10
        });
        the_player = the_game.add_player('Frank Zappa');
        the_ship = the_game.game_field.add_ship({
          velocity: [0, 0],
          heading: Math.PI / 2,
          player: the_player
        });
        bullet = the_ship.fire();
        expect(bullet.velocity().x()).toBeCloseTo(0, 6);
        expect(bullet.velocity().y()).toBeCloseTo(10, 6);
        return expect(bullet.player()).toEqual(the_player);
      });
    });
    describe("when moving perpindicular to the direction it's pointed", function() {
      return it('creates a bullet', function() {
        var bullet, the_game, the_player, the_ship;
        the_game = new game.Game({
          ship_rotation_rate: 1,
          tick_rate: 15,
          acceleration_rate: 1,
          field_size: new vector.Vector([900, 900]),
          bullet_speed: 10
        });
        the_player = the_game.add_player('Frank Zappa');
        the_ship = the_game.game_field.add_ship({
          velocity: [50, 50],
          heading: Math.PI * 3 / 4,
          player: the_player
        });
        bullet = the_ship.fire();
        expect(bullet.velocity().x()).toBeCloseTo(50 - 10 / Math.sqrt(2), 6);
        expect(bullet.velocity().y()).toBeCloseTo(50 + 10 / Math.sqrt(2), 6);
        return expect(bullet.player()).toEqual(the_player);
      });
    });
    return describe('with correct position', function() {
      var new_bullet, new_ship, the_game;
      the_game = void 0;
      new_bullet = void 0;
      new_ship = void 0;
      beforeEach(function() {
        var the_player;
        the_game = new game.Game({
          tick_rate: 0,
          bullet_lifetime: 6
        });
        the_player = the_game.add_player('Frank Zappa');
        new_ship = the_game.game_field.add_ship({
          rotation: 0,
          points: [[-10, 10], [20, 0], [-10, -10], [0, 0]],
          heading: 0,
          position: [100, 100],
          gun_point: [21, 0],
          player: the_player
        });
        return new_bullet = new_ship.fire(true);
      });
      it('starts bullet in correct position', function() {
        return expect(the_game.game_field.screen_objects()[1]).toEqual(new_bullet);
      });
      it('starts bullet in correct position', function() {
        expect(new_bullet.position().x()).toEqual(new_ship.gun_point().x());
        return expect(new_bullet.position().y()).toEqual(new_ship.gun_point().y());
      });
      return it('starts bullet with correct life time', function() {
        return expect(new_bullet.life_left).toEqual(ship.Ship.bullet_lifetime);
      });
    });
  });

}).call(this);
