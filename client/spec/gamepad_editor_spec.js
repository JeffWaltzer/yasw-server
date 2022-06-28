(function() {
  describe("the gamepad editor display without any gamepads", function() {
    var compile, gamepad_editor, scope;
    scope = null;
    compile = null;
    gamepad_editor = null;
    beforeEach(function() {
      module("YASW");
      inject(function($compile, $rootScope) {
        compile = $compile;
        return scope = $rootScope.$new();
      });
      scope.gamepads = [];
      scope.gamepad_editor_visible = true;
      gamepad_editor = compile(angular.element("<gamepad-editor/>"))(scope)[0];
      return scope.$digest();
    });
    it("exists", function() {
      return expect(gamepad_editor.nodeName).toEqual('DIV');
    });
    return it("has 'no gamepads' displayed", function() {
      return expect(gamepad_editor.textContent).toEqual("No Gamepads");
    });
  });

  describe("the gamepad editor display with a gamepad", function() {
    var GamepadState, compile, gamepad_editor, scope;
    scope = null;
    compile = null;
    gamepad_editor = null;
    GamepadState = null;
    beforeEach(function() {
      var button_bindings;
      module("YASW");
      inject(function($compile, $rootScope, _GamepadState_) {
        compile = $compile;
        scope = $rootScope.$new();
        return GamepadState = _GamepadState_;
      });
      button_bindings = {
        "Fake Gamepad #1": {
          fire: [7],
          thrust: [9],
          left: [1],
          right: [2]
        }
      };
      GamepadState.set_button_bindings(button_bindings);
      scope.gamepads = [
        {
          id: "Fake Gamepad #1",
          buttons: [
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            }
          ]
        }
      ];
      scope.gamepad_editor_visible = true;
      gamepad_editor = compile(angular.element("<gamepad-editor/>"))(scope)[0];
      return scope.$digest();
    });
    it("doesn't have the 'no gamepads' message", function() {
      return expect(gamepad_editor.textContent).not.toEqual("No Gamepads");
    });
    it("has the gamepad name displayed", function() {
      return expect(gamepad_editor.getElementsByClassName('gamepad-name')[0].textContent).toEqual("Fake Gamepad #1");
    });
    it("has the gamepad thrust button binding displayed");
    it("has the gamepad fire button binding displayed");
    it("has the gamepad left button binding displayed");
    return it("has the gamepad right button binding displayed");
  });

  describe("the gamepad editor display with two gamepads", function() {
    var compile, gamepad_editor, scope;
    scope = null;
    compile = null;
    gamepad_editor = null;
    beforeEach(function() {
      module("YASW");
      inject(function($compile, $rootScope) {
        compile = $compile;
        return scope = $rootScope.$new();
      });
      scope.gamepads = [
        {
          id: "Fake Gamepad #1",
          buttons: [
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            }
          ]
        },
        {
          id: "Fake Gamepad #2",
          buttons: [
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            },
            {
              pressed: false
            }
          ]
        }
      ];
      scope.gamepad_editor_visible = true;
      gamepad_editor = compile(angular.element("<gamepad-editor/>"))(scope)[0];
      return scope.$digest();
    });
    it("doesn't have the 'no gamepads' message", function() {
      return expect(gamepad_editor.textContent).not.toEqual("No Gamepads");
    });
    it("has the first gamepad name displayed", function() {
      return expect(gamepad_editor.getElementsByClassName('gamepad-name')[0].textContent).toEqual("Fake Gamepad #1");
    });
    return it("has the other gamepad name displayed", function() {
      return expect(gamepad_editor.getElementsByClassName('gamepad-name')[1].textContent).toEqual("Fake Gamepad #2");
    });
  });

}).call(this);
