import {GamePads} from "../gamePads";
import GamePad from "../gamePad";

describe('Gamepads', () => {
  it("starts with empty list of gamepads", () => {
    expect(GamePads._active).toEqual([]);
  });

  describe("#poll", () => {
    beforeEach(() => {
      navigator.getGamepads = () => {
        throw "shouldn't happen; dummy function called";
      };
    });

    xdescribe("When we have a gamepad and lost it", () => {
      const fake_socket = {'bogus': 'dude'};
      beforeEach(()=>{
        jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
          return [];
        });

        global.WebSocket = jest.fn();
        global.WebSocket.mockImplementation(function () {
          return fake_socket;
        });
        GamePads._active=[new GamePad({})]
        GamePads.poll();
      });

      it('notices', () => {
        expect(GamePads._active.length).toEqual(0)
      });
    });

    xdescribe("When we have a gamepad and see a 2nd gamepad", () => {
      const fake_socket = {'bogus': 'dude'};
      beforeEach(()=>{
        jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
          return [{id: 'A'},{id: 'B'}];
        });

        global.WebSocket = jest.fn();
        global.WebSocket.mockImplementation(function () {
          return fake_socket;
        });
        GamePads._active=[new GamePad({})]
        GamePads.poll();
      });

      it('we see both gamepads', () => {
        expect(GamePads._active.length).toEqual(2);
      });
    });

    xdescribe("When we have no gamepads", () => {
      const fake_socket = {'bogus': 'dude'};
      beforeEach(()=>{
        jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
          return [{id: 'C'}];
        });
        global.WebSocket = jest.fn();
        global.WebSocket.mockImplementation(function () {
          return fake_socket;
        });
        GamePads.poll();
      });

      it('notices a new gamepad', () => {
        expect(GamePads._active.length).toEqual(1)
      });

      it('connects the new gamepad', () => {
        expect(GamePads._active[0].command_socket()).toEqual(fake_socket);
      });

      it('saves game pad id', () => {
        expect(GamePads._active[0].id()).toEqual('C');
      });
    });
  });

  describe('#start_polling', () => {
    beforeEach(() => {
      jest.useFakeTimers('legacy');
      const the_gamepads = new GamePads();
      the_gamepads.start_polling();
      jest.spyOn(window, "setInterval")
    });

    it('sets timer', () => {
      expect(window.setInterval).toHaveBeenCalledWith(GamePads.poll, 30);
    });
  });
});

