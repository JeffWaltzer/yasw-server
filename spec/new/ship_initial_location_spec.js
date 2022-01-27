(function() {
  var game, inject_random_numbers, vector;

  inject_random_numbers = require('./inject_random_numbers');

  game = require('../../src/game');

  vector = require('../../src/vector');

  describe('creating a ship', function() {
    var the_game;
    the_game = void 0;
    beforeEach(function() {
      return the_game = new game.Game({});
    });
    describe('without specifying the starting position', function() {
      var the_ship;
      the_ship = void 0;
      beforeEach(function() {
        inject_random_numbers([0.5, 0.75]);
        return the_ship = the_game.game_field.add_ship();
      });
      return it('puts the ship at a random position', function() {
        expect(the_ship.position().x()).toEqual(Math.round(0.5 * the_game.game_field.field_size().x()));
        return expect(the_ship.position().y()).toEqual(Math.round(0.75 * the_game.game_field.field_size().y()));
      });
    });
    describe('does not place a new ship on top of an existing ship', function() {
      var fake_random, fake_random_values, first_ship, second_ship;
      first_ship = void 0;
      second_ship = void 0;
      fake_random_values = [];
      fake_random = function() {
        return fake_random_values.shift();
      };
      beforeEach(function() {
        fake_random_values = [0.5, 0.75, 0.5, 0.75, 0.1, 0.2];
        spyOn(Math, 'random').andCallFake(fake_random);
        first_ship = the_game.game_field.add_ship();
        return second_ship = the_game.game_field.add_ship();
      });
      return it('puts the ship at a third position', function() {
        expect(second_ship.position().x()).toEqual(Math.round(0.1 * the_game.game_field.field_size().x()));
        return expect(second_ship.position().y()).toEqual(Math.round(0.2 * the_game.game_field.field_size().y()));
      });
    });
    return describe('at a specified location', function() {
      var the_ship;
      the_ship = void 0;
      beforeEach(function() {
        return the_ship = the_game.game_field.add_ship({
          position: [314, 278]
        });
      });
      return it('puts the ship at the specified position', function() {
        expect(the_ship.position().x()).toEqual(314);
        return expect(the_ship.position().y()).toEqual(278);
      });
    });
  });

}).call(this);
