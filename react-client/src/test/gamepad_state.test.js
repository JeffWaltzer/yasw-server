import Gamepad from "../gamePad";
import GamePadState from "../gamePadState";

const make_gamepad_state = (button_states) => {
  const fake_gamepad_state = new GamePadState(button_states);
  return fake_gamepad_state;
}

const make_gamepad = (button_states, socket) => {
  const gamepad = new Gamepad(socket);
  gamepad._old_gamepad_state = new GamePadState(button_states);
  jest.spyOn(gamepad.command_socket(), "send");
  return gamepad;
};

const should_send = (expected_sent) => {
  if (expected_sent) {
    it(`sends ${expected_sent}`, function () {
      expect(gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify(
        { command: expected_sent }
      ));
    });
  } else {
    it("does not send", function () {
      expect(gamepad.command_socket().send).not.toHaveBeenCalled();
    });
  }
}

const stub_socket = { send: () => {} };

let gamepad;

describe("interpret_command", ()=> {
  it("updates the gamepad state", () => {
    const gamepad = make_gamepad({thrust: false}, stub_socket);
    const new_gamepad_state = make_gamepad_state({thrust: true});
    gamepad.interpret_command(new_gamepad_state);

    expect(gamepad._old_gamepad_state).toEqual(new_gamepad_state);
  });
});

describe("sent tests", () => {
  describe("for thrust_up events", () => {
    const thrust_up_sent_tests = [
      {
        thrust_button: "up",
        expected_sent: null
      },
      {
        thrust_button: "down",
        expected_sent: 'thrust_off'
      }
    ];

    thrust_up_sent_tests.forEach((test_conditions) => {
      describe(`When thrust button is ${test_conditions.thrust_button}`, function () {
        beforeEach(() => {
          gamepad = make_gamepad({thrust: test_conditions.thrust_button === 'down'}, stub_socket);
        });

        describe(" and we receive up", () => {
          beforeEach(() => {
            gamepad.interpret_command(make_gamepad_state({thrust: false}));
          });

          should_send(test_conditions.expected_sent);
        });
      });
    });
  });

  describe("for thrust_down events", () => {
    const thrust_down_sent_tests = [
      {
        thrust_button: "up",
        expected_sent: 'thrust_on'
      },
      {
        thrust_button: "down",
        expected_sent: null
      }
    ];
    thrust_down_sent_tests.forEach((test_conditions) => {
      describe(`When thrust button is ${test_conditions.thrust_button}`, function () {
        beforeEach(() => {
          gamepad = make_gamepad({thrust: test_conditions.thrust_button === 'down'}, stub_socket);
        });

        describe(" and we receive down", function () {
          beforeEach(function () {
            let new_gamepad_state = make_gamepad_state({thrust: true});
            gamepad.interpret_command(new_gamepad_state);
          });

          should_send(test_conditions.expected_sent);
        });
      });
    });
  });
});

describe("Initial button states", function () {
  beforeEach(() => {
    gamepad = new Gamepad(stub_socket);
  });

  it("start fire up", function () {
    expect(gamepad._old_gamepad_state.fire()).toBeFalsy();
  });

  it("start thrust up", function () {
    expect(gamepad._old_gamepad_state.thrust()).toBeFalsy();
  });

  it("start rotate right up", function () {
    expect(gamepad._old_gamepad_state.right()).toBeFalsy();
  });

  it("start rotate left up", function () {
    expect(gamepad._old_gamepad_state.left()).toBeFalsy();
  });
});

const fire_up_sent_tests = [
  {
    buttons: {
      fire: 'up'
    },
    expected_sent: null
  },
  {
    buttons: {
      fire: 'down'
    },
    expected_sent: null
  }
];
fire_up_sent_tests.forEach((test_conditions) => {
  describe(`When the fire button is ${test_conditions.buttons.fire}`, () => {
    beforeEach(() => {
      gamepad._old_gamepad_state.fire(test_conditions.buttons.fire === 'down');
    });

    describe(" and we receive up", function() {
      beforeEach(function() {
        gamepad.interpret_command(make_gamepad_state({
          fire: false
        }));
      });

      if (test_conditions.expected_sent) {
        it(`sends ${test_conditions.expected_sent}`, function() {
          expect(gamepad.command_socket().send).
            toHaveBeenCalledWith(test_conditions.expected_sent);
        });
      } else {
        it("does not send", function() {
          expect(gamepad.command_socket().send).not.toHaveBeenCalled();
        });
      }
    });
  });
});


const fire_down_sent_tests = [
    {
      fire_button: "up",
      expected_sent: 'fire'
    },
    {
      fire_button: "down",
      expected_sent: null
    }
  ];

fire_down_sent_tests.forEach((test_conditions) => {
  describe(`When the fire button is ${test_conditions.fire_button}`, () => {
    beforeEach(() => {
      gamepad._old_gamepad_state.fire(test_conditions.fire_button === 'down');
    });

    describe(" and we receive down", function() {
      beforeEach(function() {
        gamepad.interpret_command(make_gamepad_state({
          fire: true
        }));
      });
      should_send(test_conditions.expected_sent);

    });
  });
})


const sent_tests = [
  {
    left_button: "down",
    right_button: "down",
    new_left_button: "down",
    new_right_button: "down",
    expected_sent: null
  },
  {
    left_button: "down",
    right_button: "down",
    new_left_button: "down",
    new_right_button: "up",
    expected_sent: "rotate_left"
  },
  {
    left_button: "down",
    right_button: "down",
    new_left_button: "up",
    new_right_button: "down",
    expected_sent: "rotate_right"
  },
  // {
  //   left_button: "down",
  //   right_button: "down",
  //   new_left_button: "up",
  //   new_right_button: "up",
  //   expected_sent: null
  // },
  // {
  //   left_button: "down",
  //   right_button: "up",
  //   new_left_button: "down",
  //   new_right_button: "down",
  //   expected_sent: "rotate_stop"
  // },
  // {
  //   left_button: "down",
  //   right_button: "up",
  //   new_left_button: "down",
  //   new_right_button: "up",
  //   expected_sent: null
  // },
  // {
  //   left_button: "down",
  //   right_button: "up",
  //   new_left_button: "up",
  //   new_right_button: "down",
  //   expected_sent: "rotate_right"
  // },
  // {
  //   left_button: "down",
  //   right_button: "up",
  //   new_left_button: "up",
  //   new_right_button: "up",
  //   expected_sent: "rotate_stop"
  // },
  // {
  //   left_button: "up",
  //   right_button: "down",
  //   new_left_button: "down",
  //   new_right_button: "down",
  //   expected_sent: "rotate_stop"
  // },
  // {
  //   left_button: "up",
  //   right_button: "down",
  //   new_left_button: "down",
  //   new_right_button: "up",
  //   expected_sent: "rotate_left"
  // },
  // {
  //   left_button: "up",
  //   right_button: "down",
  //   new_left_button: "up",
  //   new_right_button: "down",
  //   expected_sent: null
  // },
  // {
  //   left_button: "up",
  //   right_button: "down",
  //   new_left_button: "up",
  //   new_right_button: "up",
  //   expected_sent: "rotate_stop"
  // },
  // {
  //   left_button: "up",
  //   right_button: "up",
  //   new_left_button: "down",
  //   new_right_button: "down",
  //   expected_sent: null
  // },
  // {
  //   left_button: "up",
  //   right_button: "up",
  //   new_left_button: "down",
  //   new_right_button: "up",
  //   expected_sent: "rotate_left"
  // },
  // {
  //   left_button: "up",
  //   right_button: "up",
  //   new_left_button: "up",
  //   new_right_button: "down",
  //   expected_sent: "rotate_right"
  // },
  // {
  //   left_button: "up",
  //   right_button: "up",
  //   new_left_button: "up",
  //   new_right_button: "up",
  //   expected_sent: null
  // }
];
sent_tests.forEach((test_conditions) => {
  describe(`When left button is ${test_conditions.left_button} and right button is ${test_conditions.right_button}`, () => {
    beforeEach(() => {

      const gamepad = make_gamepad(
        {
          left: test_conditions.left_button === 'down',
          right: test_conditions.right_button === 'down'
        }, stub_socket);

      const new_gamepad_state = make_gamepad_state(
        {
          left: test_conditions.new_left_button === 'down',
          right: test_conditions.new_right_button === 'down'
        });
      gamepad.interpret_command(new_gamepad_state);

      jest.spyOn(gamepad.command_socket(), "send");
    });
    describe(`and we receive left ${test_conditions.new_left_button}, right ${test_conditions.new_right_button}`, () => {
      beforeEach(() => {
        let new_gamepad = make_gamepad_state({
          left: test_conditions.new_left_button === 'down',
          right: test_conditions.new_right_button === 'down'
        });
        gamepad.interpret_command(new_gamepad);
      });
      if (test_conditions.expected_sent) {
        it(`sends ${test_conditions.expected_sent}`, () => {
          expect(gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify({
            command: test_conditions.expected_sent
          }));
        });
      } else {
        it("does not send", () => {
          expect(gamepad.command_socket().send).not.toHaveBeenCalled();
        });
      }
    });
  });
});

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
//         gamepad.last_gamepad_state.left(test_conditions.left_button === 'down');
//         gamepad.last_gamepad_state.right(test_conditions.right_button === 'down');
//         return spyOn(gamepad.command_socket(), "send");
//       });
//       return describe(`and we receive left ${test_conditions.new_left_button}, right ${test_conditions.new_right_button}`, function() {
//         beforeEach(function() {
//           var new_gamepad;
//           new_gamepad = make_fake_gamepad({
//             left: test_conditions.new_left_button === 'down',
//             right: test_conditions.new_right_button === 'down'
//           });
//           return gamepad.interpret_command(new_gamepad);
//         });
//         if (test_conditions.expected_sent) {
//           return it(`sends ${test_conditions.expected_sent}`, function() {
//             return expect(gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify({
//               command: test_conditions.expected_sent
//             }));
//           });
//         } else {
//           return it("does not send", function() {
//             return expect(gamepad.command_socket().send).not.toHaveBeenCalled();
//           });
//         }
//       });
//     });
//   });
// });
