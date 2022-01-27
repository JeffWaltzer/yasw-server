(function() {
  var game, ship, underscore;

  underscore = require('underscore');

  game = require('./../../src/game');

  ship = require('./../../src/ship');

  describe("game#tick when ship and bullet collide", function() {
    var the_game;
    the_game = void 0;
    beforeEach(function() {
      the_game = new game.Game({
        tick_rate: 20,
        ship_rotation_rate: 10,
        acceleration_rate: 5
      });
      the_game.game_field.add_ship({
        position: [0, 0],
        points: [[1, 1], [5, 1], [5, 5], [1, 5]]
      });
      the_game.game_field.add_bullet({
        game_field: the_game.game_field,
        points: [[1, 1], [3, 1], [3, 3], [1, 3]]
      });
      return the_game.tick();
    });
    it('removes ship and bullet', function() {
      var remaining_screen_objects;
      remaining_screen_objects = underscore.reject(the_game.game_field.screen_objects(), function(screen_object) {
        return screen_object.is_fragment();
      });
      expect(the_game.game_field.ships().length).toEqual(0);
      return expect(the_game.game_field.bullets().length).toEqual(0);
    });
    return afterEach(function() {
      return the_game = null;
    });
  });

}).call(this);
