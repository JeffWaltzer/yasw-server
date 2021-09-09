(function() {
  var fake_random, fake_random_values, inject_random_numbers;

  fake_random_values = [];

  fake_random = function() {
    return fake_random_values.shift();
  };

  inject_random_numbers = function(to_inject) {
    spyOn(Math, 'random').andCallFake(fake_random);
    return fake_random_values = to_inject;
  };

  module.exports = inject_random_numbers;

}).call(this);
