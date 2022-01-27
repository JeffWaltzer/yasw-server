(function() {
  var Player, Vector, fragment_maker, game, ship, underscore;

  underscore = require('underscore');

  game = require('./../../src/game');

  ship = require('./../../src/ship');

  Vector = require('./../../src/vector').Vector;

  fragment_maker = require('./../../src/fragment_maker');

  Player = require('./../../src/player').Player;

  describe("ship#explode", function() {
    var the_game, the_player, the_ship;
    the_game = void 0;
    the_ship = void 0;
    the_player = void 0;
    beforeEach(function() {
      the_game = new game.Game({
        tick_rate: 20,
        ship_rotation_rate: 10,
        acceleration_rate: 5
      });
      the_player = the_game.add_player();
      the_ship = the_player.add_ship(the_game.game_field);
      spyOn(global, 'setTimeout');
      return the_ship.explode();
    });
    it('removes ship', function() {
      return expect(the_game.game_field.screen_objects()).not.toContain(the_ship);
    });
    it('sets a resurrection timer on the player', function() {
      return expect(global.setTimeout).toHaveBeenCalledWith(the_player.resurrect, Player.resurrection_time, the_game.game_field, the_player);
    });
    it('adds fragments', function() {
      var fragments;
      fragments = underscore.select(the_game.game_field.screen_objects(), function(screen_object) {
        return screen_object.is_fragment();
      });
      return expect(fragments.length).toBeGreaterThan(0);
    });
    return afterEach(function() {
      return the_game = null;
    });
  });

}).call(this);
