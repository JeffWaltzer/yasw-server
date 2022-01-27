(function() {
  var Vector;

  require("./../helpers/vector_equals");

  Vector = require("./../../src/vector").Vector;

  describe("Vector creation", function() {
    var v;
    v = void 0;
    describe("with no arguments", function() {
      beforeEach(function() {
        return v = new Vector();
      });
      it("has the right x", function() {
        return expect(v.x()).toEqual(0);
      });
      it("has the right y", function() {
        return expect(v.y()).toEqual(0);
      });
      return it("has the right coordinates", function() {
        return expect(v.coordinates).toEqual([0, 0]);
      });
    });
    describe("from a two-element array", function() {
      beforeEach(function() {
        return v = new Vector([10, 20]);
      });
      it("has the right x", function() {
        return expect(v.x()).toEqual(10);
      });
      it("has the right y", function() {
        return expect(v.y()).toEqual(20);
      });
      return it("has the right coordinates", function() {
        return expect(v.coordinates).toEqual([10, 20]);
      });
    });
    describe("from a three-element array", function() {
      beforeEach(function() {
        return v = new Vector([10, 20, 5]);
      });
      it("has the right x", function() {
        return expect(v.x()).toEqual(2);
      });
      it("has the right y", function() {
        return expect(v.y()).toEqual(4);
      });
      return it("has the right coordinates", function() {
        return expect(v.coordinates).toEqual([2, 4]);
      });
    });
    describe("from an object", function() {
      beforeEach(function() {
        return v = new Vector({
          magnitude: 10,
          heading: Math.PI / 2
        });
      });
      it("has the right x", function() {
        return expect(v.x()).toBeCloseTo(0, 6);
      });
      return it("has the right y", function() {
        return expect(v.y()).toBeCloseTo(10, 6);
      });
    });
    describe("Vector creation errors", function() {
      it("barfs when handed a non-vector, non-hash", function() {
        return expect(function() {
          return new Vector(10);
        }).toThrow();
      });
      it("barfs when handed a short array", function() {
        return expect(function() {
          return new Vector([10]);
        }).toThrow();
      });
      it("barfs when handed a long array", function() {
        return expect(function() {
          return new Vector([15, 25, 35, 42]);
        }).toThrow();
      });
      it("barfs when handed an object with no magnitude", function() {
        return expect(function() {
          return new Vector({
            heading: 0
          });
        }).toThrow();
      });
      return it("barfs when handed an object with no heading", function() {
        return expect(function() {
          return new Vector({
            magnitude: 5
          });
        }).toThrow();
      });
    });
    return describe("Vector#equal", function() {
      describe("two numerically identical vectors", function() {
        return it("are equal", function() {
          return expect(new Vector([10, 20])).toEqualVector(new Vector([10, 20]));
        });
      });
      describe("two numerically different vectors", function() {
        return it("are not equal", function() {
          return expect(new Vector([10, 20])).not.toEqualVector(new Vector([15, 23]));
        });
      });
      return describe("a vector and a non-vector", function() {
        return it("are not equal", function() {
          return expect(new Vector([1, 2])).not.toEqualVector("ferd");
        });
      });
    });
  });

}).call(this);
