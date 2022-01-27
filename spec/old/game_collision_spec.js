(function() {
  var bullet, fragment_maker, game, math_util, ship, underscore, vector;

  bullet = require('./../../src/bullet');

  ship = require('./../../src/ship');

  game = require('./../../src/game');

  vector = require('./../../src/vector');

  math_util = require('./../../src/math_util');

  fragment_maker = require('./../../src/fragment_maker');

  underscore = require('underscore');

  describe('bullet and ship', function() {
    var the_bullet, the_game, the_ship;
    the_ship = null;
    the_bullet = null;
    the_game = null;
    beforeEach(function() {
      return the_game = new game.Game({});
    });
    it('collide if bullet overlaps ship', function() {
      the_ship = the_game.game_field.add_ship({
        position: [0, 0]
      });
      the_bullet = the_game.game_field.add_bullet({
        game_field: the_game.game_field,
        position: [-10, 10]
      });
      return expect(math_util.collided(the_ship, the_bullet)).toBeTruthy();
    });
    it('collide if bullet completely inside ship', function() {
      the_ship = the_game.game_field.add_ship({
        position: [0, 0]
      });
      the_bullet = the_game.game_field.add_bullet({
        game_field: the_game.game_field,
        position: [5, 0]
      });
      return expect(math_util.collided(the_ship, the_bullet)).toBeTruthy();
    });
    it('do not collide if at different points', function() {
      the_ship = the_game.game_field.add_ship({
        position: [0, 0]
      });
      the_bullet = the_game.game_field.add_bullet({
        game_field: the_game.game_field,
        position: [10, 20]
      });
      return expect(math_util.collided(the_ship, the_bullet)).toBeFalsy();
    });
    return it('other', function() {
      the_ship = the_game.game_field.add_ship({
        position: [0, 0],
        points: [[1, 1], [5, 1], [5, 5], [1, 5]]
      });
      the_bullet = the_game.game_field.add_bullet({
        game_field: the_game.game_field,
        points: [[1, 1], [3, 1], [3, 3], [1, 3]]
      });
      return expect(math_util.collided(the_ship, the_bullet)).toBeTruthy();
    });
  });

  describe('single ship collides with', function() {
    var game_field, the_game, the_ship;
    the_ship = null;
    the_game = null;
    game_field = null;
    beforeEach(function() {
      the_game = new game.Game({});
      return game_field = the_game.game_field;
    });
    it('ship does not collide with self', function() {
      the_ship = game_field.add_ship();
      return expect(game_field.collisions_with(the_ship, 0)).toEqual([]);
    });
    it('detects ship with other ship collisions', function() {
      var ship1, ship2;
      ship1 = game_field.add_ship({
        position: [10, 10]
      });
      ship2 = game_field.add_ship({
        position: [10, 10]
      });
      return expect(game_field.collisions_with(ship1, 0)).toEqual([ship2]);
    });
    it('does not collide non-overlapping ships', function() {
      var ship1, ship2;
      ship1 = game_field.add_ship({
        position: [11, 12]
      });
      ship2 = game_field.add_ship({
        position: [100, 100]
      });
      return expect(game_field.collisions_with(ship1, 0)).toEqual([]);
    });
    it('ships do not collide when positioned into different locations', function() {
      var ship1, ship2;
      ship1 = game_field.add_ship({
        position: [400, 450]
      });
      ship2 = game_field.add_ship({
        position: [400, 450]
      });
      ship2.position(new vector.Vector([80, 120]));
      return expect(game_field.collisions_with(ship1, 0)).toEqual([]);
    });
    return it('ships do collide when positioned into same locations', function() {
      var ship1, ship2;
      ship1 = game_field.add_ship({
        position: [400, 450]
      });
      ship2 = game_field.add_ship();
      ship2.position(new vector.Vector([400, 450]));
      return expect(game_field.collisions_with(ship1, 0)).toEqual([ship2]);
    });
  });

  describe("A bullet fired from ship A colliding with ship B", function() {
    var player_a, player_b, ship_a, ship_b, the_bullet, the_game;
    the_game = null;
    player_a = null;
    player_b = null;
    ship_a = null;
    ship_b = null;
    the_bullet = null;
    beforeEach(function() {
      the_game = new game.Game({});
      player_a = the_game.add_player();
      ship_a = the_game.game_field.add_ship();
      the_game.connect_ship(player_a, ship_a);
      ship_b = the_game.game_field.add_ship();
      player_b = the_game.add_player();
      the_game.connect_ship(player_b, ship_b);
      the_bullet = ship_a.fire();
      the_bullet.position(ship_b.position());
      return the_game.game_field.handle_collisions();
    });
    it("increments player A's score", function() {
      return expect(player_a._score).toEqual(1);
    });
    it("doesn't increment player B's score", function() {
      return expect(player_b._score).toEqual(0);
    });
    it("doesn't remove the ship from player A", function() {
      return expect(player_a.ship).not.toBeNull();
    });
    it("doesn't remove player A from the ship", function() {
      return expect(ship_a.player()).not.toBeNull();
    });
    it("removes the ship from player B", function() {
      return expect(player_b.ship).toBeNull();
    });
    it("removes player B from the ship", function() {
      return expect(ship_b.player()).toBeNull();
    });
    return it('leaves fragments', function() {
      var fragments;
      fragments = underscore.filter(the_game.game_field.screen_objects(), function(a_screen_object) {
        return a_screen_object.is_fragment();
      });
      return expect(fragments.length).toBeGreaterThan(0);
    });
  });

  describe("A bullet fired from ship A colliding with another bullet from ship A", function() {
    var the_bullet, the_game, the_other_bullet, the_player, the_ship;
    the_game = null;
    the_player = null;
    the_ship = null;
    the_bullet = null;
    the_other_bullet = null;
    beforeEach(function() {
      the_game = new game.Game({});
      the_player = the_game.add_player();
      the_ship = the_game.game_field.add_ship();
      the_game.connect_ship(the_player, the_ship);
      the_bullet = the_ship.fire();
      the_other_bullet = the_ship.fire();
      the_bullet.position(the_ship.position().add_to(new vector.Vector([100, 100])));
      the_other_bullet.position(the_bullet.position());
      return the_game.game_field.handle_collisions();
    });
    it("doesn't increment the player's score", function() {
      return expect(the_player._score).toEqual(0);
    });
    it("doesn't remove the ship from the player", function() {
      return expect(the_player.ship).not.toBeNull();
    });
    it("doesn't remove the_ player from the ship", function() {
      return expect(the_ship.player()).not.toBeNull();
    });
    return it("doesn't leave fragments", function() {
      var fragments;
      fragments = underscore.filter(the_game.game_field.screen_objects(), function(a_screen_object) {
        return a_screen_object.is_fragment();
      });
      return expect(fragments.length).toEqual(0);
    });
  });

  describe("A fragment and a bullet colliding", function() {
    var the_bullet, the_fragment, the_game;
    the_game = null;
    the_fragment = null;
    the_bullet = null;
    beforeEach(function() {
      the_game = new game.Game({});
      the_fragment = fragment_maker.add_fragment(the_game.game_field, new vector.Vector([1, 1]), new vector.Vector([0, 0]), 0);
      the_bullet = the_game.game_field.add_bullet({});
      the_bullet.position(the_fragment.position());
      return the_game.game_field.handle_collisions();
    });
    it("doesn't remove the fragment", function() {
      var fragments;
      fragments = underscore.filter(the_game.game_field.screen_objects(), function(a_screen_object) {
        return a_screen_object.is_fragment();
      });
      return expect(fragments.length).toEqual(1);
    });
    return it("doesn't remove the bullet", function() {
      var bullets;
      bullets = underscore.filter(the_game.game_field.screen_objects(), function(a_screen_object) {
        return a_screen_object.is_bullet();
      });
      return expect(bullets.length).toEqual(1);
    });
  });

  describe("A bullet and a fragment colliding", function() {
    var the_bullet, the_fragment, the_game;
    the_game = null;
    the_fragment = null;
    the_bullet = null;
    beforeEach(function() {
      the_game = new game.Game({});
      the_bullet = the_game.game_field.add_bullet({});
      the_fragment = fragment_maker.add_fragment(the_game.game_field, new vector.Vector([1, 1]), new vector.Vector([0, 0]), 0);
      the_bullet.position(the_fragment.position());
      return the_game.game_field.handle_collisions();
    });
    it("doesn't remove the fragment", function() {
      var fragments;
      fragments = underscore.filter(the_game.game_field.screen_objects(), function(a_screen_object) {
        return a_screen_object.is_fragment();
      });
      return expect(fragments.length).toEqual(1);
    });
    return it("doesn't remove the bullet", function() {
      var bullets;
      bullets = underscore.filter(the_game.game_field.screen_objects(), function(a_screen_object) {
        return a_screen_object.is_bullet();
      });
      return expect(bullets.length).toEqual(1);
    });
  });

}).call(this);
