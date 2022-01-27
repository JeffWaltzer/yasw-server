(function() {
  var Polygon, fragment, fragment_maker, game, inject_random_numbers, underscore;

  underscore = require('underscore');

  inject_random_numbers = require('./../helpers/inject_random_numbers');

  game = require('./../../src/game');

  fragment = require('./../../src/fragment');

  fragment_maker = require('./../../src/fragment_maker');

  Polygon = require('./../../src/polygon').Polygon;

  describe('fragment making', function() {
    var the_game, the_ship;
    the_game = void 0;
    the_ship = void 0;
    beforeEach(function() {
      the_game = new game.Game({
        tick_rate: 20,
        ship_rotation_rate: 10,
        acceleration_rate: 5
      });
      the_ship = the_game.game_field.add_ship({
        position: [0, 0],
        velocity: [5, 10]
      });
      inject_random_numbers([0.2, 1, 0, 0.5, 0.5, 0, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 0, 0, 0]);
      return fragment_maker.add_fragments(the_game.game_field, the_ship.position(), the_ship.velocity());
    });
    describe("the first fragment", function() {
      var fragments, the_fragment;
      fragments = void 0;
      the_fragment = void 0;
      beforeEach(function() {
        fragments = underscore.select(the_game.game_field.screen_objects(), function(screen_object) {
          return screen_object.is_fragment();
        });
        return the_fragment = fragments[0];
      });
      it("has an x velocity of 55", function() {
        return expect(the_fragment.velocity().x()).toEqual(55);
      });
      it("has a y velocity of -40", function() {
        return expect(the_fragment.velocity().y()).toEqual(-40);
      });
      return it('has first fragment shape', function() {
        return expect(the_fragment.outline()).toEqual([new Polygon(fragment_maker.fragment_shapes[0])]);
      });
    });
    describe("the second fragment", function() {
      var fragments, the_fragment;
      fragments = void 0;
      the_fragment = void 0;
      beforeEach(function() {
        fragments = underscore.select(the_game.game_field.screen_objects(), function(screen_object) {
          return screen_object.is_fragment();
        });
        return the_fragment = fragments[1];
      });
      it("has an x velocity of -45", function() {
        return expect(the_fragment.velocity().x()).toEqual(-45);
      });
      it("has a y velocity of 60", function() {
        return expect(the_fragment.velocity().y()).toEqual(60);
      });
      return it('has second fragment shape', function() {
        return expect(the_fragment.outline()).toEqual([new Polygon(fragment_maker.fragment_shapes[1])]);
      });
    });
    return describe("the third fragment", function() {
      var fragments, the_fragment;
      fragments = void 0;
      the_fragment = void 0;
      beforeEach(function() {
        fragments = underscore.select(the_game.game_field.screen_objects(), function(screen_object) {
          return screen_object.is_fragment();
        });
        return the_fragment = fragments[2];
      });
      it("has an x velocity of 55", function() {
        return expect(the_fragment.velocity().x()).toEqual(55);
      });
      it("has a y velocity of 40", function() {
        return expect(the_fragment.velocity().y()).toEqual(60);
      });
      return it('has third fragment shape', function() {
        return expect(the_fragment.outline()).toEqual([new Polygon(fragment_maker.fragment_shapes[2])]);
      });
    });
  });

}).call(this);
