(function() {
  var GameField, NullPlayer;

  NullPlayer = require('./../../src/null_player').NullPlayer;

  GameField = require('./../../src/game_field').GameField;

  describe("NullPlayer", function() {
    var game_field, null_player;
    null_player = null;
    game_field = null;
    beforeEach(function() {
      null_player = new NullPlayer();
      return game_field = new GameField({});
    });
    return describe("#add_ship", function() {
      return it("does not add a ship", function() {
        var original_number_of_screen_objects;
        original_number_of_screen_objects = game_field.screen_objects().length;
        null_player.add_ship();
        return expect(game_field.screen_objects().length).toEqual(original_number_of_screen_objects);
      });
    });
  });

}).call(this);
