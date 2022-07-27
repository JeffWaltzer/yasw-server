(function() {
  describe("The gamepad editor hotkey", function() {
    var createController, keyboard, scope;
    beforeEach(module("YASW"));
    scope = void 0;
    keyboard = void 0;
    createController = void 0;
    beforeEach(inject(function($rootScope, $controller, _keyboard_) {
      keyboard = _keyboard_;
      scope = $rootScope.$new();
      return createController = function() {
        return $controller("ShipCommandController", {
          $scope: scope
        });
      };
    }));
    beforeEach(function() {
      return createController();
    });
    describe("The  gamepad editor default state", function() {
      it("the editor is not shown", function() {
        return expect(scope.gamepad_editor_visible).toBe(false);
      });
      return it("the hotkey is up", function() {
        return expect(keyboard.gamepad_editor_hotkey).toBe('up');
      });
    });
    describe("When the gamepad editor is not shown", function() {
      beforeEach(function() {
        return scope.gamepad_editor_visible = false;
      });
      describe(" and the gamepad editor hotkey is up", function() {
        beforeEach(function() {
          return keyboard.gamepad_editor_hotkey = "up";
        });
        return describe(" and we receive down", function() {
          beforeEach(function() {
            spyOn(navigator, "getGamepads").and.returnValue([
              {
                id: 'fake gamepad1'
              },
              {
                id: 'fake gamepad2'
              }
            ]);
            return scope.onKeyDown({
              keyCode: 71
            });
          });
          it("shows the gamepad editor", function() {
            return expect(scope.gamepad_editor_visible).toBe(true);
          });
          return it("populates list of gamepads", function() {
            return expect(scope.gamepads).toEqual([
              {
                id: 'fake gamepad1'
              },
              {
                id: 'fake gamepad2'
              }
            ]);
          });
        });
      });
      return describe(" and the gamepad editor hotkey is down", function() {
        beforeEach(function() {
          return keyboard.gamepad_editor_hotkey = "down";
        });
        return describe(" and we receive down", function() {
          beforeEach(function() {
            return scope.onKeyDown({
              keyCode: 71
            });
          });
          return it("doesn't show the gamepad editor", function() {
            return expect(scope.gamepad_editor_visible).toBe(false);
          });
        });
      });
    });
    return describe("When the gamepad editor is shown", function() {
      beforeEach(function() {
        return scope.gamepad_editor_visible = true;
      });
      describe(" and the gamepad editor hotkey is up", function() {
        beforeEach(function() {
          return keyboard.gamepad_editor_hotkey = "up";
        });
        return describe(" and we receive down", function() {
          beforeEach(function() {
            return scope.onKeyDown({
              keyCode: 71
            });
          });
          return it("hides the gamepad editor", function() {
            return expect(scope.gamepad_editor_visible).toBe(false);
          });
        });
      });
      return describe(" and the gamepad editor hotkey is down", function() {
        beforeEach(function() {
          return keyboard.gamepad_editor_hotkey = "down";
        });
        return describe(" and we receive down", function() {
          beforeEach(function() {
            return scope.onKeyDown({
              keyCode: 71
            });
          });
          return it("shows the gamepad editor", function() {
            return expect(scope.gamepad_editor_visible).toBe(true);
          });
        });
      });
    });
  });

}).call(this);
