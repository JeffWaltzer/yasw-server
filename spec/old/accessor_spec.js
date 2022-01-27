(function() {
  describe('accessor class method', function() {
    var SomeClass;
    SomeClass = function() {};
    beforeEach(function() {
      return SomeClass.accessor('some_variable');
    });
    return it('has an accessor', function() {
      return expect(typeof SomeClass.prototype.some_variable).toEqual('function');
    });
  });

  describe('an object with accessor', function() {
    var an_object;
    an_object = null;
    beforeEach(function() {
      var SomeClass;
      SomeClass = function() {};
      SomeClass.accessor('some_variable');
      return an_object = new SomeClass();
    });
    it('has an initial value of undefined', function() {
      return expect(an_object.some_variable()).not.toBeDefined();
    });
    return it('remembers a set value', function() {
      an_object.some_variable('FERD');
      return expect(an_object.some_variable()).toEqual('FERD');
    });
  });

}).call(this);
