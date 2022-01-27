(function() {
  var game, ship;

  ship = require('../../src/ship');

  game = require('../../src/game');

  describe("Ship#update", function() {
    var the_game;
    the_game = void 0;
    beforeEach(function() {
      return the_game = new game.Game({
        tick_rate: 20
      });
    });
    describe("when ship fires", function() {
      return it("asks game to create a bullet", function() {
        var the_ship;
        spyOn(the_game.game_field, 'add_bullet');
        the_ship = the_game.game_field.add_ship({
          velocity: [1, 1],
          heading: Math.PI / 3,
          acceleration: 0
        });
        the_ship.fire();
        return expect(the_game.game_field.add_bullet).toHaveBeenCalled();
      });
    });
    describe("when there's no thrust", function() {
      return it("doesn't change the velocity", function() {
        var the_ship;
        the_ship = the_game.game_field.add_ship({
          velocity: [1, 1],
          heading: Math.PI / 3,
          acceleration: 0
        });
        the_ship.update(2);
        expect(the_ship.velocity().x()).toEqual(1);
        return expect(the_ship.velocity().y()).toEqual(1);
      });
    });
    describe("when there's thrust", function() {
      return it("updates the velocity", function() {
        var the_ship;
        the_ship = the_game.game_field.add_ship({
          velocity: [0, 0],
          heading: Math.PI / 4,
          acceleration: 1
        });
        the_ship.update(2);
        expect(the_ship.velocity().x()).toBeCloseTo(Math.sqrt(2) / 4);
        return expect(the_ship.velocity().y()).toBeCloseTo(Math.sqrt(2) / 4);
      });
    });
    describe("when the velocity is zero", function() {
      return it("doesn't change the position", function() {
        var the_ship;
        the_ship = the_game.game_field.add_ship({
          velocity: [0, 0],
          position: [10, 15],
          heading: Math.PI
        });
        the_ship.update(2);
        expect(the_ship.position().x()).toBeCloseTo(10);
        return expect(the_ship.position().y()).toBeCloseTo(15);
      });
    });
    describe("when the velocity is non-zero", function() {
      return it("updates the position", function() {
        var the_ship;
        the_ship = the_game.game_field.add_ship({
          velocity: [1, 2],
          position: [20, 25],
          heading: Math.PI
        });
        the_ship.update(2);
        expect(the_ship.position().x()).toBeCloseTo(20 + 1 / 2);
        return expect(the_ship.position().y()).toBeCloseTo(25 + 2 / 2);
      });
    });
    return describe('when going off the screen', function() {
      it('top', function() {
        var the_ship;
        the_ship = the_game.game_field.add_ship({
          velocity: [0, 1],
          position: [0, the_game.game_field.field_size().y() - 1],
          heading: Math.PI
        });
        the_ship.update(1);
        return expect(the_ship.position().y()).toBeCloseTo(0);
      });
      it('bottom', function() {
        var the_ship;
        the_ship = the_game.game_field.add_ship({
          velocity: [0, -1],
          position: [0, 0],
          heading: Math.PI
        });
        the_ship.update(1);
        return expect(the_ship.position().y()).toBeCloseTo(the_game.game_field.field_size().y() - 1);
      });
      it('right', function() {
        var the_ship;
        the_ship = the_game.game_field.add_ship({
          velocity: [1, 0],
          position: [the_game.game_field.field_size().x() - 1, 0],
          heading: Math.PI
        });
        the_ship.update(1);
        return expect(the_ship.position().x()).toBeCloseTo(0);
      });
      return it('left', function() {
        var the_ship;
        the_ship = the_game.game_field.add_ship({
          velocity: [-1, 0],
          position: [0, 0],
          heading: Math.PI
        });
        the_ship.update(1);
        return expect(the_ship.position().x()).toBeCloseTo(the_game.game_field.field_size().x() - 1);
      });
    });
  });

}).call(this);
