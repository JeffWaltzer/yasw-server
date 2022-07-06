(function() {
  var Vector;

  Vector = require("./../../src/vector").Vector;

  beforeEach(function() {
    return jasmine.addMatchers({
      toEqualVector: function(matcherUtils) {
				return {
					compare: function(actual, expected) {
						let result= {};
						result.pass = matcherUtils.equals(actual, expected);
						if (result.pass)
							result.message = `Expected ${actual} not to equal ${expected}`;
						else
							result.message = `Expected ${actual} to equal ${expected}`;
						return result;
					}
				};
      }
    });
  });

}).call(this);
