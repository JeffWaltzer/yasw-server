(function() {
  var game;

  game = require('./../../src/game');

  describe('Game', function() {
    var the_game, the_player, the_ship;
    the_player = null;
    the_game = null;
    the_ship = null;
    return describe('with a ship', function() {
      return describe('on close', function() {
        beforeEach(function() {
          the_game = new game.Game({});
          the_ship = the_game.game_field.add_ship({
            position: [0, 0]
          });
          the_player = the_game.add_player();
          the_game.connect_ship(the_player, the_ship);
          return the_game.on_close(the_player);
        });
        it('removes the player', function() {
          return expect(the_game.players).toEqual([]);
        });
        return it('removes the ship', function() {
          return expect(the_game.game_field.screen_objects()).toEqual([]);
        });
      });
    });
  });

}).call(this);
