import {GamePads} from "../gamePads";

describe('Gamepads', () => {
  it("starts with empty list of gamepads", () => {
    expect(GamePads._active).toEqual([])
  })

  describe("#poll", () => {
    beforeEach(() => {
      navigator.getGamepads = () => { throw "shouldn't happen; dummy function called"; };
    });

    it('notices new gamepad',()=>{
      jest.spyOn(navigator,"getGamepads").mockImplementation(()=>{
        return [{}]
      })
      GamePads.poll()
      expect(GamePads._active.length).toEqual(1)
    })
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
