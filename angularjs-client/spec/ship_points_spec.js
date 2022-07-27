(function() {
  describe('updating the ship wireframes', function() {
    var createController, game_server, scope;
    beforeEach(module('YASW'));
    game_server = void 0;
    createController = void 0;
    scope = void 0;
    beforeEach(inject(function($rootScope, $controller, _game_server_) {
      game_server = _game_server_;
      scope = $rootScope.$new();
      createController = function(_socket_) {
        return $controller("ShipCommandController", {
          $scope: scope,
          socket: _socket_
        });
      };
      createController();
      return game_server.update_ship_wireframes({
        "0": {
          "wireframe": [
            {
              "points": [[0,
            0],
            [1,
            1]]
            }
          ]
        },
        "1": {
          "wireframe": [
            {
              "points": [[2,
            2],
            [3,
            3]]
            }
          ]
        }
      });
    }));
    it('dispatches the ship 0 coordinates', function() {
      return expect(scope.polygons()[0].polygon_string).toEqual('0,0 1,1');
    });
    return it('dispatches the ship 1 coordinates', function() {
      return expect(scope.polygons()[1].polygon_string).toEqual('2,2 3,3');
    });
  });

}).call(this);
