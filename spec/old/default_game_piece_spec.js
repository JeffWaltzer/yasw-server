(function() {
  var Polygon, ScreenObject;

  ScreenObject = require('../../src/screen_object').ScreenObject;

  Polygon = require('../../src/polygon').Polygon;

  describe("the default game piece color", function() {
    var a_screen_object, the_game_piece;
    a_screen_object = new ScreenObject({
      shape: [new Polygon()],
      mass: 1
    });
    the_game_piece = a_screen_object.make_game_piece();
    return it("is white", function() {
      return expect(the_game_piece.wireframe[0].color).toEqual('white');
    });
  });

}).call(this);
