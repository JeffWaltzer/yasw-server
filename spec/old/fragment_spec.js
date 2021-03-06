(function() {
  var Polygon, fragment, game, ship;

  fragment = require('./../../src/fragment');

  ship = require('./../../src/ship');

  game = require('./../../src/game');

  Polygon = require('./../../src/polygon').Polygon;

  describe("fragment", function() {
    var the_fragment;
    the_fragment = void 0;
    beforeEach(function() {
      return the_fragment = new fragment.Fragment({
        shape: [new Polygon()]
      });
    });
    it("creates a fragment", function() {
      return expect(the_fragment.is_fragment()).toBe(true);
    });
    it("does not create a bullet", function() {
      return expect(the_fragment.is_bullet()).toBe(false);
    });
    it("does not create a ship", function() {
      return expect(the_fragment.is_ship()).toBe(false);
    });
    it('has default position', function() {
      expect(the_fragment.position().x()).toEqual(0);
      return expect(the_fragment.position().y()).toEqual(0);
    });
    it('has default age', function() {
      return expect(the_fragment.life_left).toEqual(3);
    });
    it('has default velocity', function() {
      expect(the_fragment.velocity().x()).toEqual(0);
      return expect(the_fragment.velocity().y()).toEqual(0);
    });
    return it('has the correct mass', function() {
      return expect(the_fragment.mass()).toEqual(0.2);
    });
  });

  describe("fragment with explicit values", function() {
    var the_fragment;
    the_fragment = void 0;
    beforeEach(function() {
      return the_fragment = new fragment.Fragment({
        shape: [new Polygon()],
        position: [3, 4],
        velocity: [5, 6]
      });
    });
    it('has correct position', function() {
      expect(the_fragment.position().x()).toEqual(3);
      return expect(the_fragment.position().y()).toEqual(4);
    });
    return it('has correct velocity', function() {
      expect(the_fragment.velocity().x()).toEqual(5);
      return expect(the_fragment.velocity().y()).toEqual(6);
    });
  });

}).call(this);
