(function() {
  var Vector;

  Vector = require("./../../src/vector").Vector;

  beforeEach(function() {
    return this.addMatchers({
      toEqualVector: function(expected) {
        return this.actual.equal(expected);
      }
    });
  });

}).call(this);
