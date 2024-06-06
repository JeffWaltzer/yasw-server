import Gamepad from "../gamePad";
import GamePadState from "../gamePadState";

const make_gamepad = (button_states, socket) => {
    const gamepad = new Gamepad(socket, button_states);
    jest.spyOn(gamepad.command_socket(), "send");
    return gamepad;
};

const stub_socket = {
    send: () => {
    }
};

describe("interpret_command", () => {
    it("updates the gamepad state", () => {
        const gamepad = make_gamepad({thrust: false}, stub_socket);
        const new_gamepad_state = new GamePadState({thrust: true});
        gamepad.interpret_command(new_gamepad_state);

        expect(gamepad._old_gamepad_state).toEqual(new_gamepad_state);
    });
});

describe("When thrust button is up and we receive up", () => {
    it("does not send", function () {
        const gamepad = make_gamepad({thrust: false}, stub_socket);
        gamepad.interpret_command(new GamePadState({thrust: false}));
        expect(gamepad.command_socket().send).not.toHaveBeenCalled();
    });
});

describe('When thrust button is down and we receive up', () => {
    it('sends thrust_off', function () {
        const gamepad = make_gamepad({thrust: true}, stub_socket);
        gamepad.interpret_command(new GamePadState({thrust: false}));
        expect(gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify(
            {command: 'thrust_off'}
        ));
    });
});

describe("for thrust_down events ", () => {
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

describe("Initial button states", function () {
    let gamepad;

    beforeEach(() => {
        gamepad = new Gamepad(stub_socket);
    });

    it("start fire up", function () {
        expect(gamepad._old_gamepad_state._fire).toBeFalsy();
    });

    it("start thrust up", function () {
        expect(gamepad._old_gamepad_state._thrust).toBeFalsy();
    });

    it("start rotate right up", function () {
        expect(gamepad._old_gamepad_state._right).toBeFalsy();
    });

    it("start rotate left up", function () {
        expect(gamepad._old_gamepad_state._left).toBeFalsy();
    });
});

describe(`When the fire button is up and we receive up`, () => {
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

describe(`When the fire button is down and we receive up`, () => {

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

    describe(`When the fire button is ${test_conditions.fire_button} and we receive down`, () => {
        let gamepad;

        beforeEach(() => {
            gamepad = make_gamepad(
                {
                    fire: test_conditions.fire_button == 'down'
                },
                stub_socket);
            gamepad.interpret_command(new GamePadState({
                fire: true
            }));
        });


        if (test_conditions.expected_sent) {
            it(`sends ${test_conditions.expected_sent}`, function () {
                expect(gamepad.command_socket().send).toHaveBeenCalledWith(JSON.stringify(
                    {command: test_conditions.expected_sent}
                ));
            });
        } else {
            it("does not send", function () {
                expect(gamepad.command_socket().send).not.toHaveBeenCalled();
            });
        }
    });
});

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
        new_right_button: "down",
        expected_sent: "rotate_stop"
    },

    {
        left_button: "down",
        right_button: "up",
        new_left_button: "down",
        new_right_button: "up",
        expected_sent: null
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
        new_right_button: "down",
        expected_sent: null
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
        new_right_button: "down",
        expected_sent: null
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
    {
        left_button: "up",
        right_button: "up",
        new_left_button: "up",
        new_right_button: "up",
        expected_sent: null
    }
];
sent_tests.forEach((test_conditions) => {
    describe(`When left button is ${test_conditions.left_button} and right button is ${test_conditions.right_button}`, () => {
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

        describe(`and we receive left ${test_conditions.new_left_button}, right ${test_conditions.new_right_button}`, () => {
            beforeEach(() => {
                let new_gamepad = new GamePadState({
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
