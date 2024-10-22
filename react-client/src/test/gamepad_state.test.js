import Gamepad from "../gamePad";
import {FIRE_BUTTON, GamePadState, LEFT_BUTTON, RIGHT_BUTTON, THRUST_BUTTON} from "../gamePadState";
import {make_buttons} from "./make_buttons";


function make_gamepad(buttons, socket) {
  const gamepad = new Gamepad({buttons: buttons});
  
  global.WebSocket = jest.fn();
  global.WebSocket.mockImplementation(function() { return socket; });

  gamepad.server_connection({
    send: ()=>{},
    stop_updates: ()=>{}
  });
  
  jest.spyOn(gamepad.server_connection(), "send");
  return gamepad;
};

const stub_socket = {
  send: () => {
  }
};

function make_gamepad_state(buttons_to_press = []) {
  return new GamePadState({buttons: make_buttons(buttons_to_press)});
}

function exercise_gamepad (buttons_initially_down, buttons_to_press, stub_socket)  {
  const initial_buttons = make_buttons();
  buttons_initially_down.forEach((button_index) => {
    initial_buttons[button_index].pressed = true;
  });
  const gamepad = make_gamepad(initial_buttons, stub_socket);
//  const new_gamepad_state = make_gamepad_state(buttons_to_press);
  gamepad._dom_gamepad.

  gamepad.interpret_command();

  return gamepad;
};

describe("interpret_command", () => {
  it("sends nothing if we do nothing", () => {
    const gamepad = make_gamepad(make_buttons(), stub_socket);
    gamepad.send_commands();

    expect(gamepad.server_connection().send).not.toHaveBeenCalled();
  });
});

xdescribe("When thrust button is up and we receive up", () => {
  it("does not send", function () {
    // const gamepad = make_gamepad(make_buttons(), stub_socket);
    // const new_gamepad_state = make_gamepad_state();
    // gamepad.interpret_command(new_gamepad_state);
          
    const gamepad= exercise_gamepad([], [], stub_socket);

    expect(gamepad.server_connection().send).not.toHaveBeenCalled();
  });
});

describe('When thrust button is down and we receive up', () => {
  it('sends thrust_off', function () {
    const new_gamepad_state = make_gamepad_state(make_buttons([THRUST_BUTTON]));
    const gamepad = make_gamepad( make_buttons([]),{})
    gamepad.interpret_command(new_gamepad_state)

    expect(gamepad.server_connection().send).toHaveBeenCalledWith(JSON.stringify(
      {command: 'thrust_off'}
    ));
  });
});

xdescribe("for thrust_down events ", () => {
  it(`When thrust button is up and we receive down sends thrust_on`, function () {
    const gamepad = make_gamepad(make_buttons(), stub_socket);
    const new_gamepad_state = make_gamepad_state( [THRUST_BUTTON]);
    gamepad.interpret_command(new_gamepad_state);

    expect(gamepad.server_connection().send).toHaveBeenCalledWith(JSON.stringify(
      {command: 'thrust_on'}
    ));
  });

  it("When thrust button is down and we receive down does not send", function () {
    const gamepad = make_gamepad(make_buttons([THRUST_BUTTON]), stub_socket);
    const new_gamepad_state = make_gamepad_state( [THRUST_BUTTON]);
    gamepad.interpret_command(new_gamepad_state);

    expect(gamepad.server_connection().send).not.toHaveBeenCalled();
  });
});


xdescribe(`When the fire button is up and we receive up`, () => {
  it("does not send", function () {
    const gamepad = make_gamepad(make_buttons(), stub_socket);
    const new_gamepad_state = make_gamepad_state();
    gamepad.interpret_command(new_gamepad_state);

    expect(gamepad.server_connection().send).not.toHaveBeenCalled();
  });
})

xdescribe(`When the fire button is down and we receive up`, () => {

  it("does not send", function () {
    const gamepad = make_gamepad(make_buttons([FIRE_BUTTON]), stub_socket);
    const new_gamepad_state = make_gamepad_state();
    gamepad.interpret_command(new_gamepad_state);

    expect(gamepad.server_connection().send).not.toHaveBeenCalled();
  });
});

xdescribe(`When the fire button is up and we receive down`, () => {
  it(`sends fire`, function () {
    const gamepad = make_gamepad(make_buttons(), stub_socket);
    const new_gamepad_state = make_gamepad_state([FIRE_BUTTON]);
    gamepad.interpret_command(new_gamepad_state);

    expect(gamepad.server_connection().send).toHaveBeenCalledWith(JSON.stringify(
      {command: 'fire'}
    ));
  });
})

xdescribe(`When the fire button is down and we receive down`, () => {
  it("does not send", function () {
    const gamepad = make_gamepad(make_buttons([FIRE_BUTTON]), stub_socket);
    const new_gamepad_state = make_gamepad_state([FIRE_BUTTON]);
    gamepad.interpret_command(new_gamepad_state);
    expect(gamepad.server_connection().send).not.toHaveBeenCalled();
  });
});

function rotate_buttons_from_test_conditions(leftButton, rightButton) {
  const pressed_buttons = [];
  if (leftButton === "down")
    pressed_buttons.push(LEFT_BUTTON);
  if (rightButton === "down")
    pressed_buttons.push(RIGHT_BUTTON);
  return pressed_buttons;
}

[
  {
    left_button: "down",
    right_button: "down",
    new_left_button: "down",
    new_right_button: "down",
  },
  {
    left_button: "down",
    right_button: "down",
    new_left_button: "up",
    new_right_button: "up",
  },
  {
    left_button: "down",
    right_button: "up",
    new_left_button: "down",
    new_right_button: "up",
  },
  {
    left_button: "up",
    right_button: "down",
    new_left_button: "up",
    new_right_button: "down",
  },
  {
    left_button: "up",
    right_button: "up",
    new_left_button: "down",
    new_right_button: "down",
  },
  {
    left_button: "up",
    right_button: "up",
    new_left_button: "up",
    new_right_button: "up",
  }
].forEach((test_conditions) => {
  xdescribe(`When left button is ${test_conditions.left_button} ` +
    `and right button is ${test_conditions.right_button}` +
    ` and we receive left ${test_conditions.new_left_button}, right ${test_conditions.new_right_button}`, () =>{
      afterEach(() => {
        jest.clearAllMocks();
      });

      it("does not send", () => {
        const initially_pressed_buttons = rotate_buttons_from_test_conditions(
            test_conditions.left_button,
            test_conditions.right_button);
        const pressed_buttons = rotate_buttons_from_test_conditions(
            test_conditions.new_left_button,
            test_conditions.new_right_button)

        const gamepad = make_gamepad(make_buttons(initially_pressed_buttons), stub_socket);
        const new_gamepad_state = make_gamepad_state(pressed_buttons);

        gamepad.interpret_command(new_gamepad_state);

        expect(gamepad.server_connection().send).not.toHaveBeenCalled();
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

      afterEach(() => {
        jest.clearAllMocks();
      });

      it(`sends ${test_conditions.expected_sent}`, () => {
        const initially_pressed_buttons = rotate_buttons_from_test_conditions(
            test_conditions.left_button,
            test_conditions.right_button);
        const pressed_buttons = rotate_buttons_from_test_conditions(
            test_conditions.new_left_button,
            test_conditions.new_right_button)

        const gamepad = make_gamepad(make_buttons(initially_pressed_buttons), stub_socket);
        const new_gamepad_state = make_gamepad_state(pressed_buttons);

        gamepad.interpret_command(new_gamepad_state);

        expect(gamepad.server_connection().send).toHaveBeenCalledWith(JSON.stringify({
          command: test_conditions.expected_sent
        }));
      });
    });
});
