  // describe("ShipCommandController", function() {
  //   var $location, Gamepad, GamepadState, createController, fire_down_sent_tests, fire_down_state_tests, fire_up_sent_tests, fire_up_state_tests, game_server, make_fake_gamepad, scope, sent_tests, the_gamepad, thrust_down_sent_tests, thrust_down_state_tests, thrust_up_sent_tests, thrust_up_state_tests;
  //   beforeEach(module("YASW"));
  //   scope = void 0;
  //   $location = void 0;
  //   createController = void 0;
  //   game_server = void 0;
  //   Gamepad = void 0;
  //   GamepadState = void 0;
  //   the_gamepad = void 0;
  //   make_fake_gamepad = function(button_values) {
  //     var return_value;
  //     return_value = new GamepadState();
  //     _(button_values).each(function(value, key) {
  //       return return_value[key](value);
  //     });
  //     return return_value;
  //   };
  //   beforeEach(inject(function($rootScope, $controller, _$location_, _game_server_, _Gamepad_, _GamepadState_) {
  //     $location = _$location_;
  //     scope = $rootScope.$new();
  //     createController = function() {
  //       return $controller("ShipCommandController", {
  //         $scope: scope
  //       });
  //     };
  //     game_server = _game_server_;
  //     Gamepad = _Gamepad_;
  //     GamepadState = _GamepadState_;
  //     return the_gamepad = new Gamepad('id', {
  //       send: function() {}
  //     });
  //   }));

    describe("Initial button states", function() {
      let gamepad;

      beforeEach(() => {
        gamepad = new Gamepad();
      });

      it("start fire up", function() {
        expect(gamepad.last_gamepad_state.fire()).toBeFalsy();
      });

      it("start thrust up", function() {
        expect(gamepad.last_gamepad_state.thrust()).toBeFalsy();
      });
    });

  //   fire_up_sent_tests = [
  //     {
  //       buttons: {
  //         fire: 'up'
  //       },
  //       expected_sent: null
  //     },
  //     {
  //       buttons: {
  //         fire: 'down'
  //       },
  //       expected_sent: null
  //     }
  //   ];
  //   _.each(fire_up_sent_tests, function(test_conditions) {
  //     return describe(`When the fire button is ${test_conditions.buttons.fire}`, function() {
  //       beforeEach(function() {
  //         createController();
  //         the_gamepad.last_gamepad_state.fire(test_conditions.buttons.fire === 'down');
  //         return spyOn(the_gamepad.command_socket(), "send");
  //       });
  //       return describe(" and we receive up", function() {
  //         beforeEach(function() {
  //           return the_gamepad.interpret_command(make_fake_gamepad({
  //             fire: false
  //           }));
  //         });
  //         if (test_conditions.expected_sent) {
  //           return it(`sends ${test_conditions.expected_sent}`, function() {
  //             return expect(the_gamepad.command_socket().send).toHaveBeenCalledWith(test_conditions.expected_sent);
  //           });
  //         } else {
  //           return it("does not send", function() {
  //             return expect(the_gamepad.command_socket().send).not.toHaveBeenCalled();
  //           });
  //         }
  //       });
  //     });
  //   });
  //   fire_down_sent_tests = [
  //     {
  //       fire_button: "up",
  //       expected_sent: "fire"
  //     },
  //     {
  //       fire_button: "down",
  //       expected_sent: null
  //     }
  //   ];
  //   _.each(fire_down_sent_tests, function(test_conditions) {
  //     return describe(`When fire button is ${test_conditions.fire_button}`, function() {
  //       beforeEach(function() {
  //         createController();
  //         the_gamepad.last_gamepad_state.fire(test_conditions.fire_button === 'down');
  //         return spyOn(the_gamepad.command_socket(), "send");
  //       });
  //       return describe(" and we receive down", function() {
  //         beforeEach(function() {
  //           return the_gamepad.interpret_command(make_fake_gamepad({
  //             fire: true
  //           }));
  //         });
  //         if (test_conditions.expected_sent) {
  //           return it(`sends ${test_conditions.expected_sent}`, function() {
  //             return expect(the_gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify({
  //               command: test_conditions.expected_sent
  //             }));
  //           });
  //         } else {
  //           return it("does not send", function() {
  //             return expect(the_gamepad.command_socket().send).not.toHaveBeenCalled();
  //           });
  //         }
  //       });
  //     });
  //   });
  //   fire_up_state_tests = [
  //     {
  //       fire_button: "up",
  //       expected_state: "up"
  //     },
  //     {
  //       fire_button: "down",
  //       expected_state: "up"
  //     }
  //   ];
  //   _.each(fire_up_state_tests, function(test_conditions) {
  //     return describe(`When fire button is ${test_conditions.fire_button}`, function() {
  //       beforeEach(function() {
  //         createController();
  //         return the_gamepad.last_gamepad_state.fire(test_conditions.fire_button === 'down');
  //       });
  //       return describe(" and we receive up", function() {
  //         beforeEach(function() {
  //           return the_gamepad.interpret_command(make_fake_gamepad({
  //             fire: false
  //           }));
  //         });
  //         return it(`fire button is ${test_conditions.expected_state}`, function() {
  //           return expect(the_gamepad.last_gamepad_state.fire()).toEqual(test_conditions.expected_state === 'down');
  //         });
  //       });
  //     });
  //   });
  //   fire_down_state_tests = [
  //     {
  //       fire_button: "up",
  //       expected_state: "down"
  //     },
  //     {
  //       fire_button: "down",
  //       expected_state: "down"
  //     }
  //   ];
  //   _.each(fire_down_state_tests, function(test_conditions) {
  //     return describe(`When fire button is ${test_conditions.fire_button}`, function() {
  //       beforeEach(function() {
  //         createController();
  //         return the_gamepad.last_gamepad_state.fire(test_conditions.fire_button === 'down');
  //       });
  //       return describe(" and we receive button_down", function() {
  //         beforeEach(function() {
  //           return the_gamepad.interpret_command(make_fake_gamepad({
  //             fire: true
  //           }));
  //         });
  //         return it(`fire button is ${test_conditions.expected_state}`, function() {
  //           return expect(the_gamepad.last_gamepad_state.fire()).toEqual(test_conditions.expected_state === 'down');
  //         });
  //       });
  //     });
  //   });
  //   thrust_up_sent_tests = [
  //     {
  //       thrust_button: "up",
  //       expected_sent: null
  //     },
  //     {
  //       thrust_button: "down",
  //       expected_sent: 'thrust_off'
  //     }
  //   ];
  //   _.each(thrust_up_sent_tests, function(test_conditions) {
  //     return describe(`When thrust button is ${test_conditions.thrust_button}`, function() {
  //       beforeEach(function() {
  //         createController();
  //         the_gamepad.last_gamepad_state.thrust(test_conditions.thrust_button === 'down');
  //         return spyOn(the_gamepad.command_socket(), "send");
  //       });
  //       return describe(" and we receive up", function() {
  //         beforeEach(function() {
  //           return the_gamepad.interpret_command(make_fake_gamepad({
  //             thrust: false
  //           }));
  //         });
  //         if (test_conditions.expected_sent) {
  //           return it(`sends ${test_conditions.expected_sent}`, function() {
  //             return expect(the_gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify({
  //               command: test_conditions.expected_sent
  //             }));
  //           });
  //         } else {
  //           return it("does not send", function() {
  //             return expect(the_gamepad.command_socket().send).not.toHaveBeenCalled();
  //           });
  //         }
  //       });
  //     });
  //   });
  //   thrust_down_sent_tests = [
  //     {
  //       thrust_button: "up",
  //       expected_sent: 'thrust_on'
  //     },
  //     {
  //       thrust_button: "down",
  //       expected_sent: null
  //     }
  //   ];
  //   _.each(thrust_down_sent_tests, function(test_conditions) {
  //     return describe(`When thrust button is ${test_conditions.thrust_button}`, function() {
  //       beforeEach(function() {
  //         createController();
  //         the_gamepad.last_gamepad_state.thrust(test_conditions.thrust_button === 'down');
  //         return spyOn(the_gamepad.command_socket(), "send");
  //       });
  //       return describe(" and we receive down", function() {
  //         beforeEach(function() {
  //           return the_gamepad.interpret_command(make_fake_gamepad({
  //             thrust: true
  //           }));
  //         });
  //         if (test_conditions.expected_sent) {
  //           return it(`sends ${test_conditions.expected_sent}`, function() {
  //             return expect(the_gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify({
  //               command: test_conditions.expected_sent
  //             }));
  //           });
  //         } else {
  //           return it("does not send", function() {
  //             return expect(the_gamepad.command_socket().send).not.toHaveBeenCalled();
  //           });
  //         }
  //       });
  //     });
  //   });
  //   thrust_up_state_tests = [
  //     {
  //       thrust_button: "up",
  //       expected_state: "up"
  //     },
  //     {
  //       thrust_button: "down",
  //       expected_state: "up"
  //     }
  //   ];
  //   _.each(thrust_up_state_tests, function(test_conditions) {
  //     return describe(`When thrust button is ${test_conditions.thrust_button}`, function() {
  //       beforeEach(function() {
  //         createController();
  //         return the_gamepad.last_gamepad_state.thrust(test_conditions.thrust_button === 'down');
  //       });
  //       return describe(" and we receive up", function() {
  //         beforeEach(function() {
  //           return the_gamepad.interpret_command(make_fake_gamepad({
  //             thrust: false
  //           }));
  //         });
  //         return it(`thrust button is ${test_conditions.expected_state}`, function() {
  //           return expect(the_gamepad.last_gamepad_state.thrust()).toEqual(test_conditions.expected_state === 'down');
  //         });
  //       });
  //     });
  //   });
  //   thrust_down_state_tests = [
  //     {
  //       thrust_button: "up",
  //       expected_state: "down"
  //     },
  //     {
  //       thrust_button: "down",
  //       expected_state: "down"
  //     }
  //   ];
  //   _.each(thrust_down_state_tests, function(test_conditions) {
  //     return describe(`When thrust button is ${test_conditions.thrust_button}`, function() {
  //       beforeEach(function() {
  //         createController();
  //         return the_gamepad.last_gamepad_state.thrust(test_conditions.thrust_button === 'down');
  //       });
  //       return describe(" and we receive button_down", function() {
  //         beforeEach(function() {
  //           return the_gamepad.interpret_command(make_fake_gamepad({
  //             thrust: true
  //           }));
  //         });
  //         return it(`thrust button is ${test_conditions.expected_state}`, function() {
  //           return expect(the_gamepad.last_gamepad_state.thrust()).toEqual(test_conditions.expected_state === 'down');
  //         });
  //       });
  //     });
  //   });
  //   sent_tests = [
  //     {
  //       left_button: "down",
  //       right_button: "down",
  //       new_left_button: "down",
  //       new_right_button: "down",
  //       expected_sent: null
  //     },
  //     {
  //       left_button: "down",
  //       right_button: "down",
  //       new_left_button: "down",
  //       new_right_button: "up",
  //       expected_sent: "rotate_left"
  //     },
  //     {
  //       left_button: "down",
  //       right_button: "down",
  //       new_left_button: "up",
  //       new_right_button: "down",
  //       expected_sent: "rotate_right"
  //     },
  //     {
  //       left_button: "down",
  //       right_button: "down",
  //       new_left_button: "up",
  //       new_right_button: "up",
  //       expected_sent: null
  //     },
  //     {
  //       left_button: "down",
  //       right_button: "up",
  //       new_left_button: "down",
  //       new_right_button: "down",
  //       expected_sent: "rotate_stop"
  //     },
  //     {
  //       left_button: "down",
  //       right_button: "up",
  //       new_left_button: "down",
  //       new_right_button: "up",
  //       expected_sent: null
  //     },
  //     {
  //       left_button: "down",
  //       right_button: "up",
  //       new_left_button: "up",
  //       new_right_button: "down",
  //       expected_sent: "rotate_right"
  //     },
  //     {
  //       left_button: "down",
  //       right_button: "up",
  //       new_left_button: "up",
  //       new_right_button: "up",
  //       expected_sent: "rotate_stop"
  //     },
  //     {
  //       left_button: "up",
  //       right_button: "down",
  //       new_left_button: "down",
  //       new_right_button: "down",
  //       expected_sent: "rotate_stop"
  //     },
  //     {
  //       left_button: "up",
  //       right_button: "down",
  //       new_left_button: "down",
  //       new_right_button: "up",
  //       expected_sent: "rotate_left"
  //     },
  //     {
  //       left_button: "up",
  //       right_button: "down",
  //       new_left_button: "up",
  //       new_right_button: "down",
  //       expected_sent: null
  //     },
  //     {
  //       left_button: "up",
  //       right_button: "down",
  //       new_left_button: "up",
  //       new_right_button: "up",
  //       expected_sent: "rotate_stop"
  //     },
  //     {
  //       left_button: "up",
  //       right_button: "up",
  //       new_left_button: "down",
  //       new_right_button: "down",
  //       expected_sent: null
  //     },
  //     {
  //       left_button: "up",
  //       right_button: "up",
  //       new_left_button: "down",
  //       new_right_button: "up",
  //       expected_sent: "rotate_left"
  //     },
  //     {
  //       left_button: "up",
  //       right_button: "up",
  //       new_left_button: "up",
  //       new_right_button: "down",
  //       expected_sent: "rotate_right"
  //     },
  //     {
  //       left_button: "up",
  //       right_button: "up",
  //       new_left_button: "up",
  //       new_right_button: "up",
  //       expected_sent: null
  //     }
  //   ];
  //   return _.each(sent_tests, function(test_conditions) {
  //     return describe(`When left button is ${test_conditions.left_button} and right button is ${test_conditions.right_button}`, function() {
  //       var controller;
  //       controller = void 0;
  //       beforeEach(function() {
  //         controller = createController();
  //         the_gamepad.last_gamepad_state.left(test_conditions.left_button === 'down');
  //         the_gamepad.last_gamepad_state.right(test_conditions.right_button === 'down');
  //         return spyOn(the_gamepad.command_socket(), "send");
  //       });
  //       return describe(`and we receive left ${test_conditions.new_left_button}, right ${test_conditions.new_right_button}`, function() {
  //         beforeEach(function() {
  //           var new_gamepad;
  //           new_gamepad = make_fake_gamepad({
  //             left: test_conditions.new_left_button === 'down',
  //             right: test_conditions.new_right_button === 'down'
  //           });
  //           return the_gamepad.interpret_command(new_gamepad);
  //         });
  //         if (test_conditions.expected_sent) {
  //           return it(`sends ${test_conditions.expected_sent}`, function() {
  //             return expect(the_gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify({
  //               command: test_conditions.expected_sent
  //             }));
  //           });
  //         } else {
  //           return it("does not send", function() {
  //             return expect(the_gamepad.command_socket().send).not.toHaveBeenCalled();
  //           });
  //         }
  //       });
  //     });
  //   });
  // });
