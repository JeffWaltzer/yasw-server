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

    it ("calls update on the gamepad", () => {
      const gamepad = add_gamepad();
      jest.spyOn(gamepad, "update").mockReturnValue(null);

      const fake_dom_gamepad = {buttons: make_buttons()};
      fake_dom_gamepads = [fake_dom_gamepad];
      const expected_gamepad_state = new GamePadState(fake_dom_gamepad);

      GamePads.poll();

      expect(gamepad.update).toHaveBeenCalled();
    });
});

  describe("On gamepad connected", () => {
    let fake_dom_gamepad;

    beforeEach(() => {
      GamePads._active = [];
      fake_dom_gamepad = {
        index: 0,
        id: 'Fake Gamepad',
        buttons: make_buttons(),
        axes: []
      };
      GamePads.on_gamepad_connect({gamepad: fake_dom_gamepad});
    });

    it('connects new gamepad', () => {
      expect(GamePads._active[0]).toBeInstanceOf(GamePad);
    });

    it('sets correct id', () => {
      expect(GamePads._active[0].id()).toEqual('Fake Gamepad');
    });

    it('remembers its DOM gamepad', () => {
      expect(GamePads._active[0].dom_gamepad()).toEqual(fake_dom_gamepad);
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
