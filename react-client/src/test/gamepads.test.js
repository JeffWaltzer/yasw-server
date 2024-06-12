import {GamePads} from "../gamePads";

describe('Gamepads', () => {
  it("starts with empty list of gamepads", () => {
    expect(GamePads._active).toEqual([])
  })

  describe("#poll", () => {
    beforeEach(() => {
      navigator.getGamepads = () => { throw "shouldn't happen; dummy function called"; };
    });

    it('does nothing if there are no DOM gamepads', () => {
      jest.spyOn(navigator,"getGamepads").mockImplementation(()=>{
        return [];
      })
      GamePads.poll();

      expect(GamePads._active.length).toEqual(0);
    });

    it('notices a new gamepad',()=>{
      jest.spyOn(navigator,"getGamepads").mockImplementation(()=>{
        return [{}];
      })
      GamePads.poll();

      expect(GamePads._active.length).toEqual(1)
    })

    it ('connects the new gamepad', () => {
      const fake_socket= {'bogus': 'dude'};

      jest.spyOn(navigator,"getGamepads").mockImplementation(() => {
        return [{}];
      });

      global.WebSocket = jest.fn();
      global.WebSocket.mockImplementation(function() { return fake_socket; });

      GamePads.poll();

      expect(GamePads._active[0].command_socket()).toEqual(fake_socket);
    });
  })

  describe('#start_polling', () => {
    beforeEach(() => {
      jest.useFakeTimers('legacy');
      const the_gamepads = new GamePads();
      the_gamepads.start_polling();
      jest.spyOn(window, "setInterval")
    })

    it('sets timer', () => {
      expect(window.setInterval).toHaveBeenCalledWith(GamePads.poll, 30);
    });
  })
})

