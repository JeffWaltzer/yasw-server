(function() {
  var Polygon, Sun, custom_matchers, yasw;

  yasw = require('./../../src/yasw_server');

  Sun = require('./../../src/sun').Sun;

  custom_matchers = require('./../helpers/to_aproximately_equal').custom_matchers;

  Polygon = require('./../../src/polygon').Polygon;

  describe('sun', function() {
    var shape1, shape2, the_sun;
    the_sun = void 0;
    shape1 = void 0;
    shape2 = void 0;
    beforeEach(function() {
      shape1 = [new Polygon([[0, 20], [20, 0]], 'orange')];
      shape2 = [new Polygon([[20, 0], [0, 20]], 'blue')];
      return the_sun = new Sun({
        shapes: [shape1, shape2],
        animation_rate: 0.5
      });
    });
    it('starts with first shape', function() {
      return expect(the_sun.shape()).toEqual(shape1);
    });
    describe('before one animation-time has passed', function() {
      beforeEach(function() {
        return the_sun.update(1);
      });
      return it('still shows the first shape', function() {
        return expect(the_sun.shape()).toEqual(shape1);
      });
    });
    return describe('after one animation-time has passed', function() {
      beforeEach(function() {
        return the_sun.update(0.5);
      });
      return it('shows the second shape', function() {
        return expect(the_sun.shape()).toEqual(shape2);
      });
    });
  });

}).call(this);
