(function() {
  describe("the game display", function() {
    var compile, game_display, scope;
    scope = null;
    compile = null;
    game_display = null;
    beforeEach(function() {
      module("YASW");
      inject(function($compile, $rootScope) {
        compile = $compile;
        return scope = $rootScope.$new();
      });
      scope.polygon = {
        color: "green",
        polygon_string: "1,2 1,3 3,1",
        score: null,
        position: [0, 0]
      };
      game_display = compile(angular.element("<game-polygon/>"))(scope);
      return scope.$digest();
    });
    it("has the right color", function() {
      return expect(game_display.find('polygon')[0].attributes.getNamedItem('stroke').value).toEqual("green");
    });
    return it("has the right polygon string", function() {
      return expect(game_display.find('polygon')[0].attributes.getNamedItem('points').value).toEqual("1,2 1,3 3,1");
    });
  });

}).call(this);
