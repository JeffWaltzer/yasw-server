(function() {
  var Polygon, ship;

  ship = require('../../src/ship');

  Polygon = require('./../../src/polygon').Polygon;

  describe('a ships lines', function() {
    it('should have lines', function() {
      var the_ship;
      the_ship = new ship.Ship({});
      the_ship.shape([new Polygon([[0, 0], [1, 2], [2, 3]])]);
      the_ship.update_outline();
      return expect(the_ship.lines()).toEqual([[[0, 0], [1, 2]], [[1, 2], [2, 3]], [[2, 3], [0, 0]]]);
    });
    it('should have lines for 2 polygons', function() {
      var the_ship;
      the_ship = new ship.Ship({});
      the_ship.shape([new Polygon([[0, 0], [1, 2], [2, 3]]), new Polygon([[3, 4], [4, 5], [5, 6]])]);
      the_ship.update_outline();
      return expect(the_ship.lines()).toEqual([[[0, 0], [1, 2]], [[1, 2], [2, 3]], [[2, 3], [0, 0]], [[3, 4], [4, 5]], [[4, 5], [5, 6]], [[5, 6], [3, 4]]]);
    });
    return it('should have lines', function() {
      var the_ship;
      the_ship = new ship.Ship({
        position: [11, 12]
      });
      the_ship.shape([new Polygon([[0, 0], [1, 2], [2, 3]])]);
      the_ship.update_outline();
      return expect(the_ship.lines()).toEqual([[[11, 12], [12, 14]], [[12, 14], [13, 15]], [[13, 15], [11, 12]]]);
    });
  });

}).call(this);
