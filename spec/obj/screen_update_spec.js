(function() {
  var Polygon, screen_object;

  screen_object = require('./../../src/screen_object');

  Polygon = require('./../../src/polygon').Polygon;

  describe('Screen Object', function() {
    return it('has bounding box', function() {
      var thing;
      thing = new screen_object.ScreenObject({
        shape: [new Polygon([[1, 1], [5, 1], [5, 5], [1, 5]])],
        position: [11, 13],
        mass: 123
      });
      return expect(thing.bounding_box).toEqual({
        top: 18,
        bottom: 14,
        left: 12,
        right: 16
      });
    });
  });

}).call(this);
