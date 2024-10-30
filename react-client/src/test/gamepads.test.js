import {GamePads} from "../gamePads";
import GamePad from "../gamePad";
import {make_buttons} from "./make_buttons";
import {FIRE_BUTTON, GamePadState} from "../gamePadState";

describe('Gamepads', () => {
  it("starts with empty list of gamepads", () => {
    expect(GamePads._active).toEqual([]);
  });

  describe("#on_gamepadconnected", () => {
    let browser_gamepad;
    let connect_event;

    beforeEach(() => {
      browser_gamepad = {
        index: 0,
        id: 'Our fake gamepad',
        buttons: make_buttons(),
        axes: [],
      };

      connect_event = {
        gamepad: browser_gamepad
      };

      GamePads.on_gamepad_connect(connect_event);
    });

    afterEach(() => {
      GamePads._active = [];
    })

    it("adds the new gamepad", () => {
      expect(GamePads._active.length).toEqual(1);
    });

    describe("the new gamepad", () => {
      let new_gamepad;

      beforeEach(() => {
        new_gamepad = GamePads._active[0];
      })

      it("has the correct id", () => {
        expect(new_gamepad.id()).toEqual('Our fake gamepad')
      });

      it("saves the DOM gamepad", () => {
        expect(new_gamepad._dom_gamepad).toEqual(browser_gamepad)
      })
    });
  })

  describe("#poll", () => {
    let fake_dom_gamepads = [];

    beforeEach(() => {
      navigator.getGamepads = () => {
        throw "shouldn't happen(getGamepads); dummy function called";
      };
      jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
        return fake_dom_gamepads;
      })
    });

    afterEach(() => {
      GamePads._active = [];
    })

    function add_gamepad() {
      const gamepad = new GamePad({buttons: make_buttons()});
      GamePads._active.push(gamepad);
      return gamepad;
    }

    it ("calls interpret_command on the gamepad", () => {
      const gamepad = add_gamepad();
      jest.spyOn(gamepad, "interpret_command").mockReturnValue(null);

      const fake_dom_gamepad = {buttons: make_buttons()};
      fake_dom_gamepads = [fake_dom_gamepad];
      const expected_gamepad_state = new GamePadState(fake_dom_gamepad);

      GamePads.poll();

      expect(gamepad.interpret_command).toHaveBeenCalledWith(expected_gamepad_state);
    })

    it ("calls interpret_command on the correct gamepad", () => {
      const first_gamepad = add_gamepad();
      jest.spyOn(first_gamepad, "interpret_command").mockReturnValue(null);

      const second_gamepad = add_gamepad();
      jest.spyOn(second_gamepad, "interpret_command").mockReturnValue(null);

      const first_fake_dom_gamepad = {buttons: make_buttons()};
      const second_fake_dom_gamepad = {buttons: make_buttons([FIRE_BUTTON])};

      fake_dom_gamepads = [first_fake_dom_gamepad, second_fake_dom_gamepad];

      const first_expected_gamepad_state = new GamePadState(first_fake_dom_gamepad);
      const second_expected_gamepad_state = new GamePadState(second_fake_dom_gamepad);

      GamePads.poll();

      expect(first_gamepad.interpret_command).toHaveBeenCalledWith(first_expected_gamepad_state);
      expect(second_gamepad.interpret_command).toHaveBeenCalledWith(second_expected_gamepad_state)
    })
});

  describe("On gamepad connected", () => {
    beforeEach(() => {
      GamePads._active = [];
      const gamepad = {
        index: 0,
        id: 'Fake Gamepad',
        buttons: make_buttons(),
        axes: []
      };
      GamePads.on_gamepad_connect({gamepad: gamepad});
    });

    it('connects new gamepad', () => {
      expect(GamePads._active[0]).toBeInstanceOf(GamePad);
    });

    it('sets correct id', () => {
      expect(GamePads._active[0].id()).toEqual('Fake Gamepad');
    });
  });


  describe('#start_polling', () => {
    beforeEach(() => {
      jest.useFakeTimers('legacy');
      const the_gamepads = new GamePads();
      the_gamepads.start_polling();
      jest.spyOn(window, "setInterval");
    });

    it('sets timer', () => {
      expect(window.setInterval).toHaveBeenCalledWith(GamePads.poll, 30);
    });
  });
});
