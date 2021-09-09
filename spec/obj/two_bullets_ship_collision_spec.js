(function() {
  var bullet, game, ship, underscore;

  bullet = require('./../../src/bullet');

  ship = require('./../../src/ship');

  game = require('./../../src/game');

  underscore = require('underscore');

  describe("A bullet fired from ship A colliding with ship B", function() {
    var player_a, player_b, ship_a, ship_b, the_first_bullet, the_game, the_second_bullet;
    the_game = null;
    player_a = null;
    player_b = null;
    ship_a = null;
    ship_b = null;
    the_first_bullet = null;
    the_second_bullet = null;
    beforeEach(function() {
      the_game = new game.Game({});
      player_a = the_game.add_player();
      ship_a = the_game.game_field.add_ship();
      the_game.connect_ship(player_a, ship_a);
      ship_b = the_game.game_field.add_ship();
      player_b = the_game.add_player();
      the_game.connect_ship(player_b, ship_b);
      the_first_bullet = ship_a.fire();
      the_first_bullet.position(ship_b.position());
      the_second_bullet = ship_a.fire();
      the_second_bullet.position(ship_b.position());
      spyOn(player_b, 'arrange_for_resurrection');
      return the_game.game_field.handle_collisions();
    });
    it("increments player A's score", function() {
      return expect(player_a._score).toEqual(1);
    });
    return it("resurrects player B only once", function() {
      return expect(player_b.arrange_for_resurrection.calls.length).toEqual(1);
    });
  });

}).call(this);
