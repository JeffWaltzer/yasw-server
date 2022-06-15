(function() {
  describe("ShipCommandController", function() {
    var $location, createController, down_sent_tests, down_state_tests, fire_down_sent_tests, fire_down_state_tests, fire_up_sent_tests, fire_up_state_tests, game_server, keyboard, scope, thrust_down_sent_tests, thrust_down_state_tests, thrust_up_sent_tests, thrust_up_state_tests, up_sent_tests, up_state_tests;
    beforeEach(module("YASW"));
    scope = void 0;
    $location = void 0;
    createController = void 0;
    game_server = void 0;
    keyboard = void 0;
    beforeEach(inject(function($rootScope, $controller, _$location_, _game_server_, _keyboard_) {
      $location = _$location_;
      scope = $rootScope.$new();
      createController = function() {
        return $controller("ShipCommandController", {
          $scope: scope
        });
      };
      game_server = _game_server_;
      return keyboard = _keyboard_;
    }));
    describe("Initial key states", function() {
      var controller;
      controller = void 0;
      beforeEach(function() {
        return controller = createController();
      });
      it("start left up", function() {
        return expect(keyboard.left_key).toBe("up");
      });
      it("start right up", function() {
        return expect(keyboard.right_key).toBe("up");
      });
      it("start thrust up", function() {
        return expect(keyboard.thrust_key).toBe("up");
      });
      return it("start fire up", function() {
        return expect(keyboard.fire_key).toBe("up");
      });
    });
    fire_up_sent_tests = [
      {
        fire_key: "up",
        expected_sent: null
      },
      {
        fire_key: "down",
        expected_sent: null
      }
    ];
    _.each(fire_up_sent_tests, function(test_conditions) {
      return describe(`When fire key is ${test_conditions.fire_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          keyboard.fire_key = test_conditions.fire_key;
          return spyOn(game_server, "send");
        });
        return describe(" and we receive up", function() {
          beforeEach(function() {
            return scope.onKeyUp({
              keyCode: 32
            });
          });
          if (test_conditions.expected_sent) {
            return it(`sends ${test_conditions.expected_sent}`, function() {
              return expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
            });
          } else {
            return it("does not send", function() {
              return expect(game_server.send).not.toHaveBeenCalled();
            });
          }
        });
      });
    });
    fire_down_sent_tests = [
      {
        fire_key: "up",
        expected_sent: 'fire'
      },
      {
        fire_key: "down",
        expected_sent: null
      }
    ];
    _.each(fire_down_sent_tests, function(test_conditions) {
      return describe(`When fire key is ${test_conditions.fire_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          keyboard.fire_key = test_conditions.fire_key;
          return spyOn(game_server, "send");
        });
        return describe(" and we receive down", function() {
          beforeEach(function() {
            return scope.onKeyDown({
              keyCode: 32
            });
          });
          if (test_conditions.expected_sent) {
            return it(`sends ${test_conditions.expected_sent}`, function() {
              return expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
            });
          } else {
            return it("does not send", function() {
              return expect(game_server.send).not.toHaveBeenCalled();
            });
          }
        });
      });
    });
    fire_up_state_tests = [
      {
        fire_key: "up",
        expected_state: "up"
      },
      {
        fire_key: "down",
        expected_state: "up"
      }
    ];
    _.each(fire_up_state_tests, function(test_conditions) {
      return describe(`When fire key is ${test_conditions.fire_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          return keyboard.fire_key = test_conditions.fire_key;
        });
        return describe(" and we receive up", function() {
          beforeEach(function() {
            return scope.onKeyUp({
              keyCode: 32
            });
          });
          return it(`fire key is ${test_conditions.expected_state}`, function() {
            return expect(keyboard.fire_key).toEqual(test_conditions.expected_state);
          });
        });
      });
    });
    fire_down_state_tests = [
      {
        fire_key: "up",
        expected_state: "down"
      },
      {
        fire_key: "down",
        expected_state: "down"
      }
    ];
    _.each(fire_down_state_tests, function(test_conditions) {
      return describe(`When fire key is ${test_conditions.fire_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          return keyboard.fire_key = test_conditions.fire_key;
        });
        return describe(" and we receive key_down", function() {
          beforeEach(function() {
            return scope.onKeyDown({
              keyCode: 32
            });
          });
          return it(`fire key is ${test_conditions.expected_state}`, function() {
            return expect(keyboard.fire_key).toEqual(test_conditions.expected_state);
          });
        });
      });
    });
    thrust_up_sent_tests = [
      {
        thrust_key: "up",
        expected_sent: null
      },
      {
        thrust_key: "down",
        expected_sent: 'thrust_off'
      }
    ];
    _.each(thrust_up_sent_tests, function(test_conditions) {
      return describe(`When thrust key is ${test_conditions.thrust_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          keyboard.thrust_key = test_conditions.thrust_key;
          return spyOn(game_server, "send");
        });
        return describe(" and we receive up", function() {
          beforeEach(function() {
            return scope.onKeyUp({
              keyCode: 40
            });
          });
          if (test_conditions.expected_sent) {
            return it(`sends ${test_conditions.expected_sent}`, function() {
              return expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
            });
          } else {
            return it("does not send", function() {
              return expect(game_server.send).not.toHaveBeenCalled();
            });
          }
        });
      });
    });
    thrust_down_sent_tests = [
      {
        thrust_key: "up",
        expected_sent: 'thrust_on'
      },
      {
        thrust_key: "down",
        expected_sent: null
      }
    ];
    _.each(thrust_down_sent_tests, function(test_conditions) {
      return describe(`When thrust key is ${test_conditions.thrust_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          keyboard.thrust_key = test_conditions.thrust_key;
          return spyOn(game_server, "send");
        });
        return describe(" and we receive down", function() {
          beforeEach(function() {
            return scope.onKeyDown({
              keyCode: 40
            });
          });
          if (test_conditions.expected_sent) {
            return it(`sends ${test_conditions.expected_sent}`, function() {
              return expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
            });
          } else {
            return it("does not send", function() {
              return expect(game_server.send).not.toHaveBeenCalled();
            });
          }
        });
      });
    });
    thrust_up_state_tests = [
      {
        thrust_key: "up",
        expected_state: "up"
      },
      {
        thrust_key: "down",
        expected_state: "up"
      }
    ];
    _.each(thrust_up_state_tests, function(test_conditions) {
      return describe(`When thrust key is ${test_conditions.thrust_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          return keyboard.thrust_key = test_conditions.thrust_key;
        });
        return describe(" and we receive up", function() {
          beforeEach(function() {
            return scope.onKeyUp({
              keyCode: 40
            });
          });
          return it(`thrust key is ${test_conditions.expected_state}`, function() {
            return expect(keyboard.thrust_key).toEqual(test_conditions.expected_state);
          });
        });
      });
    });
    thrust_down_state_tests = [
      {
        thrust_key: "up",
        expected_state: "down"
      },
      {
        thrust_key: "down",
        expected_state: "down"
      }
    ];
    _.each(thrust_down_state_tests, function(test_conditions) {
      return describe(`When thrust key is ${test_conditions.thrust_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          return keyboard.thrust_key = test_conditions.thrust_key;
        });
        return describe(" and we receive key_down", function() {
          beforeEach(function() {
            return scope.onKeyDown({
              keyCode: 40
            });
          });
          return it(`thrust key is ${test_conditions.expected_state}`, function() {
            return expect(keyboard.thrust_key).toEqual(test_conditions.expected_state);
          });
        });
      });
    });
    up_sent_tests = [
      {
        left_key: "down",
        right_key: "down",
        event: "right",
        expected_sent: "rotate_left"
      },
      {
        left_key: "down",
        right_key: "down",
        event: "left",
        expected_sent: "rotate_right"
      },
      {
        left_key: "up",
        right_key: "down",
        event: "right",
        expected_sent: "rotate_stop"
      },
      {
        left_key: "down",
        right_key: "up",
        event: "left",
        expected_sent: "rotate_stop"
      },
      {
        left_key: "up",
        right_key: "up",
        event: "left",
        expected_sent: null
      },
      {
        left_key: "up",
        right_key: "down",
        event: "left",
        expected_sent: null
      },
      {
        left_key: "up",
        right_key: "up",
        event: "right",
        expected_sent: null
      },
      {
        left_key: "down",
        right_key: "up",
        event: "right",
        expected_sent: null
      }
    ];
    _.each(up_sent_tests, function(test_conditions) {
      return describe(`When left key is ${test_conditions.left_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          keyboard.left_key = test_conditions.left_key;
          return spyOn(game_server, "send");
        });
        return describe(` and right key is ${test_conditions.right_key}`, function() {
          beforeEach(function() {
            return keyboard.right_key = test_conditions.right_key;
          });
          return describe(` and we receive ${test_conditions.event}`, function() {
            beforeEach(function() {
              var key_code;
              if (test_conditions.event === 'left') {
                key_code = 37;
              } else {
                key_code = 39;
              }
              return scope.onKeyUp({
                keyCode: key_code
              });
            });
            if (test_conditions.expected_sent) {
              return it(`sends ${test_conditions.expected_sent}`, function() {
                return expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
              });
            } else {
              return it("does not send", function() {
                return expect(game_server.send).not.toHaveBeenCalled();
              });
            }
          });
        });
      });
    });
    down_sent_tests = [
      {
        left_key: "up",
        right_key: "up",
        event: "left",
        expected_sent: "rotate_left"
      },
      {
        left_key: "up",
        right_key: "up",
        event: "right",
        expected_sent: "rotate_right"
      },
      {
        left_key: "up",
        right_key: "down",
        event: "left",
        expected_sent: "rotate_stop"
      },
      {
        left_key: "down",
        right_key: "up",
        event: "right",
        expected_sent: "rotate_stop"
      },
      {
        left_key: "up",
        right_key: "down",
        event: "right",
        expected_sent: null
      },
      {
        left_key: "down",
        right_key: "up",
        event: "left",
        expected_sent: null
      },
      {
        left_key: "down",
        right_key: "down",
        event: "left",
        expected_sent: null
      },
      {
        left_key: "down",
        right_key: "down",
        event: "right",
        expected_sent: null
      }
    ];
    _.each(down_sent_tests, function(test_conditions) {
      return describe(`When left key is ${test_conditions.left_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          keyboard.left_key = test_conditions.left_key;
          return spyOn(game_server, "send");
        });
        return describe(` and right key is ${test_conditions.right_key}`, function() {
          beforeEach(function() {
            return keyboard.right_key = test_conditions.right_key;
          });
          return describe(` and we receive ${test_conditions.event}`, function() {
            beforeEach(function() {
              var key_code;
              if (test_conditions.event === 'left') {
                key_code = 37;
              } else {
                key_code = 39;
              }
              return scope.onKeyDown({
                keyCode: key_code
              });
            });
            if (test_conditions.expected_sent) {
              return it(`sends ${test_conditions.expected_sent}`, function() {
                return expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
              });
            } else {
              return it("does not send", function() {
                return expect(game_server.send).not.toHaveBeenCalled();
              });
            }
          });
        });
      });
    });
    up_state_tests = [
      {
        left_key: "up",
        right_key: "up",
        event: "left",
        expected_left_key_state: "up",
        expected_right_key_state: "up"
      },
      {
        left_key: "up",
        right_key: "up",
        event: "right",
        expected_left_key_state: "up",
        expected_right_key_state: "up"
      },
      {
        left_key: "up",
        right_key: "down",
        event: "left",
        expected_left_key_state: "up",
        expected_right_key_state: "down"
      },
      {
        left_key: "up",
        right_key: "down",
        event: "right",
        expected_left_key_state: "up",
        expected_right_key_state: "up"
      },
      {
        left_key: "down",
        right_key: "up",
        event: "left",
        expected_left_key_state: "up",
        expected_right_key_state: "up"
      },
      {
        left_key: "down",
        right_key: "up",
        event: "right",
        expected_left_key_state: "down",
        expected_right_key_state: "up"
      },
      {
        left_key: "down",
        right_key: "down",
        event: "left",
        expected_left_key_state: "up",
        expected_right_key_state: "down"
      },
      {
        left_key: "down",
        right_key: "down",
        event: "right",
        expected_left_key_state: "down",
        expected_right_key_state: "up"
      }
    ];
    _.each(up_state_tests, function(test_conditions) {
      return describe(`When left key is ${test_conditions.left_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          return keyboard.left_key = test_conditions.left_key;
        });
        return describe(` and right key is ${test_conditions.right_key}`, function() {
          beforeEach(function() {
            return keyboard.right_key = test_conditions.right_key;
          });
          return describe(` and we receive ${test_conditions.event}`, function() {
            beforeEach(function() {
              var key_code;
              if (test_conditions.event === 'left') {
                key_code = 37;
              } else {
                key_code = 39;
              }
              return scope.onKeyUp({
                keyCode: key_code
              });
            });
            it(`right key is ${test_conditions.expected_right_key_state}`, function() {
              return expect(keyboard.right_key).toEqual(test_conditions.expected_right_key_state);
            });
            return it(`left key is ${test_conditions.expected_left_key_state}`, function() {
              return expect(keyboard.left_key).toEqual(test_conditions.expected_left_key_state);
            });
          });
        });
      });
    });
    down_state_tests = [
      {
        left_key: "up",
        right_key: "up",
        event: "left",
        expected_left_key_state: "down",
        expected_right_key_state: "up"
      },
      {
        left_key: "up",
        right_key: "up",
        event: "right",
        expected_left_key_state: "up",
        expected_right_key_state: "down"
      },
      {
        left_key: "up",
        right_key: "down",
        event: "left",
        expected_left_key_state: "down",
        expected_right_key_state: "down"
      },
      {
        left_key: "up",
        right_key: "down",
        event: "right",
        expected_left_key_state: "up",
        expected_right_key_state: "down"
      },
      {
        left_key: "down",
        right_key: "up",
        event: "left",
        expected_left_key_state: "down",
        expected_right_key_state: "up"
      },
      {
        left_key: "down",
        right_key: "up",
        event: "right",
        expected_left_key_state: "down",
        expected_right_key_state: "down"
      },
      {
        left_key: "down",
        right_key: "down",
        event: "left",
        expected_left_key_state: "down",
        expected_right_key_state: "down"
      },
      {
        left_key: "down",
        right_key: "down",
        event: "right",
        expected_left_key_state: "down",
        expected_right_key_state: "down"
      }
    ];
    _.each(down_state_tests, function(test_conditions) {
      return describe(`When left key is ${test_conditions.left_key}`, function() {
        var controller;
        controller = void 0;
        beforeEach(function() {
          controller = createController();
          return keyboard.left_key = test_conditions.left_key;
        });
        return describe(` and right key is ${test_conditions.right_key}`, function() {
          beforeEach(function() {
            return keyboard.right_key = test_conditions.right_key;
          });
          return describe(` and we receive ${test_conditions.event}`, function() {
            beforeEach(function() {
              var key_code;
              if (test_conditions.event === 'left') {
                key_code = 37;
              } else {
                key_code = 39;
              }
              return scope.onKeyDown({
                keyCode: key_code
              });
            });
            it(`right key is ${test_conditions.expected_right_key_state}`, function() {
              return expect(keyboard.right_key).toEqual(test_conditions.expected_right_key_state);
            });
            return it(`left key is ${test_conditions.expected_left_key_state}`, function() {
              return expect(keyboard.left_key).toEqual(test_conditions.expected_left_key_state);
            });
          });
        });
      });
    });
    return describe("we receive clone_key_down", function() {
      var controller;
      controller = void 0;
      beforeEach(function() {
        controller = createController();
        spyOn(game_server, "send");
        return scope.onKeyDown({
          keyCode: 83
        });
      });
      return it("sends 'clone'", function() {
        return expect(game_server.send).toHaveBeenCalledWith('clone');
      });
    });
  });

}).call(this);
