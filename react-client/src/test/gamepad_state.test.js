import Gamepad from "../gamePad";
import GamePadState from "../gamePadState";

const make_gamepad = (buttons, socket) => {
  const gamepad = new Gamepad({buttons: buttons});
  
  global.WebSocket = jest.fn();
  global.WebSocket.mockImplementation(function() { return socket; });

  gamepad.create_socket();
  
  jest.spyOn(gamepad.command_socket(), "send");
  return gamepad;
};

const stub_socket = {
  send: () => {
  }
};

const make_buttons = (n = 50) => {
  return Array(n).fill(0).map(() => { return {pressed: false}; });
}

const make_gamepad_state= (buttons_to_press = []) => {
  const buttons = make_buttons();
  buttons_to_press.forEach((button_index) => {
    buttons[button_index].pressed= true;
  });
  return new GamePadState({buttons: buttons});
}

const exercise_gamepad= (buttons_initially_down, buttons_to_press, stub_socket) => {
  const initial_buttons = make_buttons();
  buttons_initially_down.forEach((button_index) => {
    initial_buttons[button_index].pressed = true;
  });
  const gamepad = make_gamepad(initial_buttons, stub_socket);
  const new_gamepad_state = make_gamepad_state(buttons_to_press);
  gamepad.interpret_command(new_gamepad_state);

  return gamepad;
};

describe("interpret_command", () => {
  it("updates the gamepad state", () => {
    const gamepad = make_gamepad(make_buttons(), stub_socket);
    const new_gamepad_state = make_gamepad_state();
    gamepad.interpret_command(new_gamepad_state);

    expect(gamepad._old_gamepad_state).toEqual(new_gamepad_state);
  });
});

describe("When thrust button is up and we receive up", () => {
  it("does not send", function () {
    // const gamepad = make_gamepad(make_buttons(), stub_socket);
    // const new_gamepad_state = make_gamepad_state();
    // gamepad.interpret_command(new_gamepad_state);
          
    const gamepad= exercise_gamepad([], [], stub_socket);

    expect(gamepad.command_socket().send).not.toHaveBeenCalled();
  });
});

xdescribe('When thrust button is down and we receive up', () => {
  it('sends thrust_off', function () {
    const gamepad = make_gamepad({thrust: true}, stub_socket);
    gamepad.interpret_command(new GamePadState({thrust: false}));
    expect(gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify(
      {command: 'thrust_off'}
    ));
  });
});

xdescribe("for thrust_down events ", () => {
  it(`When thrust button is up and we receive down sends thrust_on`, function () {
    let gamepad = make_gamepad({thrust: false}, stub_socket);
    gamepad.interpret_command(new GamePadState({thrust: true}));
    expect(gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify(
      {command: 'thrust_on'}
    ));
  });

  it("When thrust button is down and we receive down does not send", function () {
    let gamepad = make_gamepad({thrust: true}, stub_socket);
    gamepad.interpret_command(new GamePadState({thrust: true}));
    expect(gamepad.command_socket().send).not.toHaveBeenCalled();
  });
});


xdescribe(`When the fire button is up and we receive up`, () => {
  let gamepad;
  beforeEach(function () {
    gamepad = make_gamepad(
      {fire: false},
      stub_socket);
    gamepad.interpret_command(new GamePadState({
      fire: false
    }));
  });

  it("does not send", function () {
    expect(gamepad.command_socket().send).not.toHaveBeenCalled();
  });
})

xdescribe(`When the fire button is down and we receive up`, () => {

  let gamepad;
  beforeEach(function () {
    gamepad = make_gamepad(
      {fire: true},
      stub_socket);
    gamepad.interpret_command(new GamePadState({
      fire: false
    }));
  });

  it("does not send", function () {
    expect(gamepad.command_socket().send).not.toHaveBeenCalled();
  });
});

xdescribe(`When the fire button is up and we receive down`, () => {
  let gamepad;

  beforeEach(() => {
    gamepad = make_gamepad(
      {
        fire: false
      },
      stub_socket);
    gamepad.interpret_command(new GamePadState({
      fire: true
    }));
  });


  it(`sends fire`, function () {
    expect(gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify(
      {command: 'fire'}
    ));
  });
})

xdescribe(`When the fire button is down and we receive down`, () => {
  let gamepad;

  beforeEach(() => {
    gamepad = make_gamepad(
      {
        fire: true
      },
      stub_socket);
    gamepad.interpret_command(new GamePadState({
      fire: true
    }));
  });


  it("does not send", function () {
    expect(gamepad.command_socket().send).not.toHaveBeenCalled();
  });
});

[
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
    new_left_button: "up",
    new_right_button: "up",
    expected_sent: null
  },
  {
    left_button: "down",
    right_button: "up",
    new_left_button: "down",
    new_right_button: "up",
    expected_sent: null
  },
  {
    left_button: "up",
    right_button: "down",
    new_left_button: "up",
    new_right_button: "down",
    expected_sent: null
  },
  {
    left_button: "up",
    right_button: "up",
    new_left_button: "down",
    new_right_button: "down",
    expected_sent: null
  },
  {
    left_button: "up",
    right_button: "up",
    new_left_button: "up",
    new_right_button: "up",
    expected_sent: null
  }
].forEach((test_conditions) => {
  xdescribe(`When left button is ${test_conditions.left_button} ` +
    `and right button is ${test_conditions.right_button}` +
    ` and we receive left ${test_conditions.new_left_button}, right ${test_conditions.new_right_button}`, () =>{
      let gamepad;

      beforeEach(() => {
        gamepad =
                make_gamepad(
                  {
                    left: test_conditions.left_button === 'down',
                    right: test_conditions.right_button === 'down'
                  },
                  stub_socket);

        const new_gamepad_state = new GamePadState({
          left: test_conditions.new_left_button === 'down',
          right: test_conditions.new_right_button === 'down'
        });
        gamepad.interpret_command(new_gamepad_state);
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it("does not send", () => {
        expect(gamepad.command_socket().send).not.toHaveBeenCalled();
      });
    });
});


[
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
  {
    left_button: "down",
    right_button: "up",
    new_left_button: "down",
    new_right_button: "down",
    expected_sent: "rotate_stop"
  },
  {
    left_button: "down",
    right_button: "up",
    new_left_button: "up",
    new_right_button: "down",
    expected_sent: "rotate_right"
  },
  {
    left_button: "down",
    right_button: "up",
    new_left_button: "up",
    new_right_button: "up",
    expected_sent: "rotate_stop"
  },
  {
    left_button: "up",
    right_button: "down",
    new_left_button: "down",
    new_right_button: "down",
    expected_sent: "rotate_stop"
  },
  {
    left_button: "up",
    right_button: "down",
    new_left_button: "down",
    new_right_button: "up",
    expected_sent: "rotate_left"
  },
  {
    left_button: "up",
    right_button: "down",
    new_left_button: "up",
    new_right_button: "up",
    expected_sent: "rotate_stop"
  },
  {
    left_button: "up",
    right_button: "up",
    new_left_button: "down",
    new_right_button: "up",
    expected_sent: "rotate_left"
  },
  {
    left_button: "up",
    right_button: "up",
    new_left_button: "up",
    new_right_button: "down",
    expected_sent: "rotate_right"
  },
].forEach((test_conditions) => {
  xdescribe(`When left button is ${test_conditions.left_button} ` +
    `and right button is ${test_conditions.right_button} ` +
    `and we receive left ${test_conditions.new_left_button}, right ${test_conditions.new_right_button}`, () => {
      let gamepad;

      beforeEach(() => {
        gamepad =
                make_gamepad(
                  {
                    left: test_conditions.left_button === 'down',
                    right: test_conditions.right_button === 'down'
                  },
                  stub_socket);

        const new_gamepad_state = new GamePadState({
          left: test_conditions.new_left_button === 'down',
          right: test_conditions.new_right_button === 'down'
        });
        gamepad.interpret_command(new_gamepad_state);
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it(`sends ${test_conditions.expected_sent}`, () => {
        expect(gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify({
          command: test_conditions.expected_sent
        }));
      });
    });
});
