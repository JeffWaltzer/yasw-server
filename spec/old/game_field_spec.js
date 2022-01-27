(function() {
  var GameField, underscore;

  GameField = require('../../src/game_field.js').GameField;

  underscore = require('underscore');

  describe('game field', function() {
    return describe('#remove_dead_objects', function() {
      var game_field, ship;
      game_field = void 0;
      ship = void 0;
      return it('adds fragments for a ship', function() {
        game_field = new GameField({});
        ship = game_field.add_ship();
        game_field.remove_screen_objects([ship]);
        return expect(underscore.select(game_field.screen_objects(), function(screen_object) {
          return screen_object.is_ship();
        })).toEqual([]);
      });
    });
  });

}).call(this);
