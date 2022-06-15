(function() {
  describe("When we have a gamepad and see a new one with the same id", function() {
    var Gamepad, new_gamepad, original_gamepad;
    beforeEach(module("YASW"));
    original_gamepad = null;
    new_gamepad = null;
    Gamepad = null;
    beforeEach(inject(function(_Gamepad_) {
      Gamepad = _Gamepad_;
      original_gamepad = new Gamepad('us', {});
      Gamepad.gamepads.push(original_gamepad);
      Gamepad.dom_gamepads = function() {
        return [
          {
            id: 'us',
            buttons: [
              {
                pressed: true
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
            id: 'us',
            buttons: [
              {
                pressed: false
              },
              {
                pressed: true
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
              },
              {
                pressed: false
              }
            ]
          }
        ];
      };
      Gamepad.poll_gamepads();
      return new_gamepad = Gamepad.gamepads[1];
    }));
    it("updates the correct gamepad's state", function() {
      return expect(original_gamepad.last_gamepad_state.buttons[0].pressed).toBeTruthy();
    });
    it('creates a new gamepad', function() {
      return expect(new_gamepad).not.toBeNull();
    });
    return it('updates the new gamepad', function() {
      return expect(new_gamepad.last_gamepad_state.buttons[1].pressed).toBeTruthy();
    });
  });

  describe("When we see a new gamepad with a non-default id", function() {
    var Gamepad, GamepadState, new_gamepad;
    beforeEach(module("YASW"));
    new_gamepad = null;
    Gamepad = null;
    GamepadState = null;
    beforeEach(inject(function(_Gamepad_, _GamepadState_) {
      Gamepad = _Gamepad_;
      GamepadState = _GamepadState_;
      return GamepadState.set_button_bindings({
        'default': {
          fire: [7],
          thrust: [9],
          left: [1],
          right: [2]
        },
        'our-binding': {
          fire: [4, 1],
          thrust: [2],
          left: [3],
          right: [5]
        }
      });
    }));
    describe('When Button one is pressed', function() {
      beforeEach(inject(function(_Gamepad_, _GamepadState_) {
        Gamepad.dom_gamepads = function() {
          return [
            {
              id: 'our-binding',
              buttons: [
                {
                  pressed: false
                },
                {
                  pressed: true
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
        };
        Gamepad.poll_gamepads();
        return new_gamepad = Gamepad.gamepads[0];
      }));
      return it("updates the fire state", function() {
        return expect(new_gamepad.last_gamepad_state.fire()).toBeTruthy();
      });
    });
    return describe('When Button four is pressed', function() {
      beforeEach(inject(function(_Gamepad_, _GamepadState_) {
        Gamepad.dom_gamepads = function() {
          return [
            {
              id: 'our-binding',
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
                  pressed: true
                },
                {
                  pressed: false
                }
              ]
            }
          ];
        };
        Gamepad.poll_gamepads();
        return new_gamepad = Gamepad.gamepads[0];
      }));
      return it("updates the fire state", function() {
        return expect(new_gamepad.last_gamepad_state.fire()).toBeTruthy();
      });
    });
  });

}).call(this);
