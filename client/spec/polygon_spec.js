(function() {
  describe("svg.polygon_string function", function() {
    var svg;
    svg = null;
    beforeEach(module("YASW"));
    beforeEach(inject(function(_SVG_) {
      return svg = _SVG_;
    }));
    it("generates the correct string", function() {
      var points;
      points = [[10, 10], [5, 10], [10, 5]];
      return expect(svg.polygon_string(points)).toEqual("10,10 5,10 10,5");
    });
    return it("generates the correct string for other points", function() {
      var points;
      points = [[11, 12], [15, 20], [5, 20], [11, 5]];
      return expect(svg.polygon_string(points)).toEqual("11,12 15,20 5,20 11,5");
    });
  });

}).call(this);
