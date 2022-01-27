(function() {
  var math_util;

  math_util = require('../../src/math_util');

  describe('two parallel lines', function() {
    return it('do not intersect', function() {
      var a_horizontal_line, another_horizontal_line;
      a_horizontal_line = [[0, 1], [10, 1]];
      another_horizontal_line = [[5, 3], [25, 3]];
      return expect(math_util.intersect(a_horizontal_line, another_horizontal_line)).toBeFalsy();
    });
  });

}).call(this);
