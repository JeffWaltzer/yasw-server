(function() {
  var math_util;

  math_util = require('./../../src/math_util');

  describe("bonding boxes", function() {
    it("That don't overlap top/bottom", function() {
      var box1, box2;
      box1 = {
        top: 10,
        bottom: 0,
        left: 0,
        right: 10
      };
      box2 = {
        top: 20,
        bottom: 11,
        left: 0,
        right: 10
      };
      expect(math_util.bounding_boxes_intersect(box1, box2)).toBeFalsy();
      return expect(math_util.bounding_boxes_intersect(box2, box1)).toBeFalsy();
    });
    it("That don't overlap right/left", function() {
      var box1, box2;
      box1 = {
        top: 12,
        bottom: 11,
        left: 0,
        right: 10
      };
      box2 = {
        top: 12,
        bottom: 11,
        left: 11,
        right: 20
      };
      expect(math_util.bounding_boxes_intersect(box1, box2)).toBeFalsy();
      return expect(math_util.bounding_boxes_intersect(box2, box1)).toBeFalsy();
    });
    it("that overlap", function() {
      var box1, box2;
      box1 = {
        top: 22,
        bottom: 11,
        left: 0,
        right: 10
      };
      box2 = {
        top: 24,
        bottom: 13,
        left: 5,
        right: 15
      };
      expect(math_util.bounding_boxes_intersect(box1, box2)).toBeTruthy();
      return expect(math_util.bounding_boxes_intersect(box2, box1)).toBeTruthy();
    });
    return it("where one contains the other", function() {
      var box1, box2;
      box1 = {
        top: 22,
        bottom: 11,
        left: 0,
        right: 10
      };
      box2 = {
        top: 20,
        bottom: 13,
        left: 5,
        right: 8
      };
      expect(math_util.bounding_boxes_intersect(box1, box2)).toBeTruthy();
      return expect(math_util.bounding_boxes_intersect(box2, box1)).toBeTruthy();
    });
  });

}).call(this);
