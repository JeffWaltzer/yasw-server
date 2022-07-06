const underscore = require('underscore');

(function() {
  var custom_matchers;

  custom_matchers = {
    toAproximatelyEqual: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result;
          result = {};
          result.pass = true;
          result.message = '';
          if (actual.length !== expected.length) {
            result.pass = false;
            result.message = `arrays are not the same size: expected: ${expected.length}; actual: ${actual.length}`;
            return result;
          }
          underscore.each(underscore.zip(actual, expected), function(point_pair) {
            var actual_value, expected_value;
            expected_value = point_pair[0];
            actual_value = point_pair[1];
            if (Math.abs(actual[0] - expected[0]) > 1e-6) {
              result.pass = false;
            }
            if (Math.abs(actual[1] - expected[1]) > 1e-6) {
              return result.pass = false;
            }
          });
          return result;
        }
      };
    }
  };

  exports.custom_matchers = custom_matchers;

}).call(this);
