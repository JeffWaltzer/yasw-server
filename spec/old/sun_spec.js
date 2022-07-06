(function() {
  var Polygon, Sun, custom_matchers, yasw;

  yasw = require('./../../src/yasw_server');

  Sun = require('./../../src/sun').Sun;

  custom_matchers = require('./../helpers/to_aproximately_equal').custom_matchers;

  Polygon = require('./../../src/polygon').Polygon;

  describe('sun', function() {
    var the_sun;
    the_sun = void 0;
    beforeEach(function() {
      return the_sun = new Sun({});
    });
    it('is a sun', function() {
      return expect(the_sun.is_sun()).toEqual(true);
    });
    it('has a default shape', function() {
      return expect(the_sun.shape()).toEqual([new Polygon([[0, 20], [14, 14], [20, 0], [14, -14], [0, -20], [-14, -14], [-20, 0], [-14, 14]], 'orange')]);
    });
    return it("has the correct mass", function() {
      return expect(the_sun.mass()).toEqual(30000);
    });
  });

  describe("`sun`#outline", function() {
    var server;
    server = void 0;
    beforeEach(function() {
      jasmine.addMatchers(custom_matchers);
      return server = yasw.createServer();
    });
    it("shows the sun", function() {
      return expect(server.game.game_field.suns()[0].outline()).toAproximatelyEqual([[10, 0]], 1e-6);
    });
    it('does not explode', function() {
      var the_sun;
      the_sun = server.game.game_field.suns()[0];
      the_sun.explode();
      return expect(server.game.game_field.suns().length).toEqual(1);
    });
    return afterEach(function() {
      return server = null;
    });
  });

}).call(this);
