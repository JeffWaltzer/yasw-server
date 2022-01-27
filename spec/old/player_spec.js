(function() {
  // player = require './../../src/player'
  // game = require './../../src/game'
  // GameField= require('./../../src/game_field').GameField
  var Game;

  Game = require('./../../src/game').Game;

  describe('Player', function() {
    var the_game, the_player;
    the_player = null;
    the_game = null;
    beforeEach(function() {
      the_game = new Game();
      return the_player = the_game.add_player();
    });
    describe('with no ship', function() {
      return it('ignores on_message', function() {
        return expect(function() {
          return the_player.on_message('{}').not.toThrow();
        });
      });
    });
    return describe("#add_ship", function() {
      var the_ship;
      the_ship = null;
      beforeEach(function() {
        return the_ship = the_player.add_ship(the_game.game_field);
      });
      it("adds a ship", function() {
        return expect(the_game.game_field.screen_objects()[0]).toEqual(the_ship);
      });
      return it("connects the new ship to the player", function() {
        expect(the_ship.player()).toEqual(the_player);
        return expect(the_player.ship).toEqual(the_ship);
      });
    });
  });

}).call(this);
