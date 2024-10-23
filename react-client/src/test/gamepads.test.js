import {GamePads} from "../gamePads";
import GamePad from "../gamePad";
import {make_buttons} from "./make_buttons";

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

      GamePads.on_gamepadconnected(connect_event);
    });

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
    beforeEach(() => {
      navigator.getGamepads = () => {
        throw "shouldn't happen(getGamepads); dummy function called";
      };
      navigator.WebSocket = () => {
        throw "shouldn't happen(WebSocket); dummy function called";
      };
    });

    const fake_socket = {
      send: () => {
      }
    };

    beforeEach(() => {
      global.WebSocket = jest.fn();
      global.WebSocket.mockImplementation(function () {
        return fake_socket;
      });
    });

    describe("When we have a gamepad and lost it", () => {
      beforeEach(() => {
        jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
          return [];
        });
        GamePads._active = [
          new GamePad({buttons: make_buttons()}),
        ];
      });

      it('notices', () => {
        expect(GamePads._active.length).toEqual(1);
        GamePads.poll();
        expect(GamePads._active.length).toEqual(0);
      });
    });

    describe("When we have a gamepad and see a 2nd gamepad", () => {
      beforeEach(() => {
        jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
          return [
            {id: 'A', buttons: make_buttons()},
            {id: 'B', buttons: make_buttons()}
          ];
        });

        GamePads._active = [new GamePad({buttons: make_buttons()})];
        GamePads.poll();
      });

      it('we see both gamepads', () => {
        expect(GamePads._active.length).toEqual(2);
      });
    });

    describe("When we have no gamepads", () => {
      const {real_location} = window;

      beforeEach(() => {
        delete window.location;
        window.location = {
          hostname: "somewhere.over.com",
          port: 31416,
        };
        jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
          return [{id: 'C', buttons: make_buttons()}];
        });
        jest.spyOn(navigator, 'WebSocket');
        GamePads.poll();
      });

      afterEach(() => {
        window.location = real_location;
      });

      it('notices a new gamepad', () => {
        expect(GamePads._active.length).toEqual(1);
      });
    });
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
