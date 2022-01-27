(function() {
  var Polygon, ship;

  ship = require('../../src/ship');

  Polygon = require('./../../src/polygon').Polygon;

  describe('a non thrust ships shape', function() {
    return it('should have polygon', function() {
      var the_ship;
      the_ship = new ship.Ship({});
      the_ship.acceleration = 0;
      return expect(the_ship.shape()).toEqual([new Polygon([[-10, 10], [20, 0], [-10, -10], [0, 0]])]);
    });
  });

  describe('a thrust ships shape', function() {
    return it('should have polygon', function() {
      var the_ship;
      the_ship = new ship.Ship({});
      the_ship.acceleration = 5;
      return expect(the_ship.shape()).toEqual([new Polygon([[-10, 10], [20, 0], [-10, -10], [0, 0]]), new Polygon([[-5, 0], [-10, 5], [-20, 0], [-10, -5]], 'red')]);
    });
  });

}).call(this);
