import {Keyboard, THRUST_KEY, FIRE_KEY, RIGHT_KEY, LEFT_KEY, CLONE_KEY} from '../keyboard';
import GameServer from '../game_server';

describe("Keyboard", () => {
  let game_server;
  let keyboard;

  beforeEach(() => {
    game_server = new GameServer()
    jest.spyOn(game_server, 'send');
    keyboard = new Keyboard(game_server);
  });

  describe("Initial key states", () => {
    it("start left up", () => {
      expect(keyboard.left_key).toBe("up");
    });
    it("start right up", () => {
      expect(keyboard.right_key).toBe("up");
    });
    it("start thrust up", () => {
      expect(keyboard.thrust_key).toBe("up");
    });
    it("start fire up", () => {
      expect(keyboard.fire_key).toBe("up");
    });
  });

  const fire_up_sent_tests = [
    {
      fire_key: "up",
      expected_sent: null
    },
    {
      fire_key: "down",
      expected_sent: null
    }
  ];
  fire_up_sent_tests.forEach(function (test_conditions) {
    describe(`When fire key is ${test_conditions.fire_key}`, () => {
      describe(" and we receive up", () => {
        if (test_conditions.expected_sent) {
          it(`sends ${test_conditions.expected_sent}`, () => {
            expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
          });
        } else {
          it("does not send", () => {
            expect(game_server.send).not.toHaveBeenCalled();
          });
        }
      });
    });
  });

  const fire_down_sent_tests = [
    {
      fire_key: "up",
      expected_sent: 'fire'
    },
    {
      fire_key: "down",
      expected_sent: null
    }
  ];
  fire_down_sent_tests.forEach(function (test_conditions) {
    describe(`When fire key is ${test_conditions.fire_key}`, () => {
      describe(" and we receive down", () => {
        beforeEach(() => {
          keyboard.fire_key = test_conditions.fire_key;
          keyboard.onKeyDown(FIRE_KEY);
        });
        if (test_conditions.expected_sent) {
          it(`sends ${test_conditions.expected_sent}`, () => {
            expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
          });
        } else {
          it("does not send", () => {
            expect(game_server.send).not.toHaveBeenCalled();
          });
        }
      });
    });
  });

  const fire_up_state_tests = [
    {
      fire_key: "up",
      expected_state: "up"
    },
    {
      fire_key: "down",
      expected_state: "up"
    }
  ];
  fire_up_state_tests.forEach(function (test_conditions) {
    describe(`When fire key is ${test_conditions.fire_key}`, () => {
      describe(" and we receive up", () => {
        beforeEach(() => {
          keyboard.fire_key = test_conditions.fire_key;
          keyboard.onKeyUp(FIRE_KEY);
        });
        it(`fire key is ${test_conditions.expected_state}`, () => {
          expect(keyboard.fire_key).toEqual(test_conditions.expected_state);
        });
      });
    });
  });
  const fire_down_state_tests = [
    {
      fire_key: "up",
      expected_state: "down"
    },
    {
      fire_key: "down",
      expected_state: "down"
    }
  ];
  fire_down_state_tests.forEach(function (test_conditions) {
    describe(`When fire key is ${test_conditions.fire_key}`, () => {
      describe(" and we receive key_down", () => {

        beforeEach(() => {
          keyboard.fire_key = test_conditions.fire_key;
          keyboard.onKeyDown(FIRE_KEY);
        })

        it(`fire key is ${test_conditions.expected_state}`, () => {
          expect(keyboard.fire_key).toEqual(test_conditions.expected_state);
        });
      });
    });
  });
  const thrust_up_sent_tests = [
    {
      thrust_key: "up",
      expected_sent: null
    },
    {
      thrust_key: "down",
      expected_sent: 'thrust_off'
    }
  ];
  thrust_up_sent_tests.forEach(function (test_conditions) {
    describe(`When thrust key is ${test_conditions.thrust_key}`, () => {
      describe(" and we receive up", () => {
        beforeEach(() => {
          keyboard.thrust_key = test_conditions.thrust_key;
          keyboard.onKeyUp(THRUST_KEY);
        })
        if (test_conditions.expected_sent) {
          it(`sends ${test_conditions.expected_sent}`, () => {
            expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
          });
        } else {
          it("does not send", () => {
            expect(game_server.send).not.toHaveBeenCalled();
          });
        }
      });
    });
  });
  const thrust_down_sent_tests = [
    {
      thrust_key: "up",
      expected_sent: 'thrust_on'
    },
    {
      thrust_key: "down",
      expected_sent: null
    }
  ];
  thrust_down_sent_tests.forEach(function (test_conditions) {
    describe(`When thrust key is ${test_conditions.thrust_key}`, () => {
      describe(" and we receive down", () => {
        beforeEach(() => {
          keyboard.thrust_key = test_conditions.thrust_key;
          keyboard.onKeyDown(THRUST_KEY);
        })
        if (test_conditions.expected_sent) {
          it(`sends ${test_conditions.expected_sent}`, () => {
            expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
          });
        } else {
          it("does not send", () => {
            expect(game_server.send).not.toHaveBeenCalled();
          });
        }
      });
    });
  });
  const thrust_up_state_tests = [
    {
      thrust_key: "up",
      expected_state: "up"
    },
    {
      thrust_key: "down",
      expected_state: "up"
    }
  ];
  thrust_up_state_tests.forEach(function (test_conditions) {
    describe(`When thrust key is ${test_conditions.thrust_key}`, () => {
      describe(" and we receive up", () => {
        beforeEach(() => {
          keyboard.thrust_key = test_conditions.thrust_key;
          keyboard.onKeyUp(THRUST_KEY);
        })
        it(`thrust key is ${test_conditions.expected_state}`, () => {
          expect(keyboard.thrust_key).toEqual(test_conditions.expected_state);
        });
      });
    });
  });
  const thrust_down_state_tests = [
    {
      thrust_key: "up",
      expected_state: "down"
    },
    {
      thrust_key: "down",
      expected_state: "down"
    }
  ];
  thrust_down_state_tests.forEach(function (test_conditions) {
    describe(`When thrust key is ${test_conditions.thrust_key}`, () => {
      describe(" and we receive key_down", () => {
        beforeEach(() => {
          keyboard.thrust_key = test_conditions.thrust_key;
          keyboard.onKeyDown(THRUST_KEY);
        })

        it(`thrust key is ${test_conditions.expected_state}`, () => {
          expect(keyboard.thrust_key).toEqual(test_conditions.expected_state);
        });
      });
    });
  });
  const up_sent_tests = [
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
  up_sent_tests.forEach(function (test_conditions) {
    describe(`When left key is ${test_conditions.left_key}`, () => {
      describe(` and right key is ${test_conditions.right_key}`, () => {
        describe(` and we receive ${test_conditions.event} up`, () => {
          beforeEach(() => {
            keyboard.left_key = test_conditions.left_key;
            keyboard.right_key = test_conditions.right_key;
            keyboard.onKeyUp(test_conditions.event === 'left' ? LEFT_KEY : RIGHT_KEY);
          })

          if (test_conditions.expected_sent) {
            it(`sends ${test_conditions.expected_sent}`, () => {
              expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
            });
          } else {
            it("does not send", () => {
              expect(game_server.send).not.toHaveBeenCalled();
            });
          }
        });
      });
    });
  });
  const down_sent_tests = [
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
  down_sent_tests.forEach(function (test_conditions) {
    describe(`When left key is ${test_conditions.left_key}`, () => {
      describe(` and right key is ${test_conditions.right_key}`, () => {
        describe(` and we receive ${test_conditions.event}`, () => {

          beforeEach(() => {
            keyboard.left_key = test_conditions.left_key;
            keyboard.right_key = test_conditions.right_key;
            keyboard.onKeyDown(test_conditions.event === 'left' ? LEFT_KEY : RIGHT_KEY);
          })

          if (test_conditions.expected_sent) {
            it(`sends ${test_conditions.expected_sent}`, () => {
              expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
            });
          } else {
            it("does not send", () => {
              expect(game_server.send).not.toHaveBeenCalled();
            });
          }
        });
      });
    });
  });
  const up_state_tests = [
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
  up_state_tests.forEach(function (test_conditions) {
    describe(`When left key is ${test_conditions.left_key}`, () => {
      describe(` and right key is ${test_conditions.right_key}`, () => {
        describe(` and we receive ${test_conditions.event}`, () => {
          beforeEach(() => {
            keyboard.left_key = test_conditions.left_key;
            keyboard.right_key = test_conditions.right_key;
            keyboard.onKeyUp(test_conditions.event === 'left' ? LEFT_KEY : RIGHT_KEY);
          })
          it(`right key is ${test_conditions.expected_right_key_state}`, () => {
            expect(keyboard.right_key).toEqual(test_conditions.expected_right_key_state);
          });
          it(`left key is ${test_conditions.expected_left_key_state}`, () => {
            expect(keyboard.left_key).toEqual(test_conditions.expected_left_key_state);
          });
        });
      });
    });
  });
  const down_state_tests = [
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
  down_state_tests.forEach(function (test_conditions) {
    describe(`When left key is ${test_conditions.left_key}`, () => {
      describe(` and right key is ${test_conditions.right_key}`, () => {
        describe(` and we receive ${test_conditions.event}`, () => {

          beforeEach(() => {
            keyboard.left_key = test_conditions.left_key;
            keyboard.right_key = test_conditions.right_key;
            keyboard.onKeyDown(test_conditions.event === 'left' ? LEFT_KEY : RIGHT_KEY);
          })

          it(`right key is ${test_conditions.expected_right_key_state}`, () => {
            expect(keyboard.right_key).toEqual(test_conditions.expected_right_key_state);
          });
          it(`left key is ${test_conditions.expected_left_key_state}`, () => {
            expect(keyboard.left_key).toEqual(test_conditions.expected_left_key_state);
          });
        });
      });
    });
  });
  describe("we receive clone_key_down", () => {

    beforeEach(() => {
      keyboard.onKeyDown(CLONE_KEY);
    })

    it("sends 'clone'", () => {
      expect(game_server.send).toHaveBeenCalledWith('clone');
    });
  });
});
