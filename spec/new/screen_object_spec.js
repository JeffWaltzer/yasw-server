(function() {
  var Game, Polygon, screen_object;

  Game = require('./../../src/game').Game;

  screen_object = require('./../../src/screen_object');

  Polygon = require('./../../src/polygon').Polygon;

  describe('screen object', function() {
    var a_screen_object, a_ship, game;
    game = void 0;
    a_ship = void 0;
    a_screen_object = void 0;
    beforeEach(function() {
      game = new Game();
      return a_screen_object = new screen_object.ScreenObject({
        shape: [new Polygon()],
        mass: 1
      });
    });
    it('is not a ship', function() {
      return expect(a_screen_object.is_ship()).toEqual(false);
    });
    it('is not a bullet', function() {
      return expect(a_screen_object.is_bullet()).toEqual(false);
    });
    it('is not a fragment', function() {
      return expect(a_screen_object.is_fragment()).toEqual(false);
    });
    it('is white', function() {
      return expect(a_screen_object.color()).toEqual('white');
    });
    it('have distinct ids', function() {
      var screen_object1, screen_object2;
      screen_object1 = game.game_field.add_screen_object({
        update: function() {}
      });
      screen_object2 = game.game_field.add_screen_object({
        update: function() {}
      });
      return expect(screen_object1.id).not.toEqual(screen_object2.id);
    });
    it('that was deleted does not get its id reused', function() {
      var screen_object1, screen_object2;
      screen_object1 = game.game_field.add_screen_object({
        update: function() {}
      });
      game.game_field.screen_objects([]);
      screen_object2 = game.game_field.add_screen_object({
        update: function() {}
      });
      return expect(screen_object1.id).not.toEqual(screen_object2.id);
    });
    it('has a mass of one', function() {
      return expect(a_screen_object.mass()).toEqual(1);
    });
    return it('requires mass', function() {
      return expect(function() {
        return new screen_object.ScreenObject({});
      }).toThrow(new Error('Mass is required'));
    });
  });

}).call(this);
