import {GamePads} from "../gamePads";

describe('Gamepads', () => {
  describe('#start_polling', () => {
    it('sets timer', () => {
      jest.useFakeTimers('legacy');
      const the_gamepads = new GamePads();
      the_gamepads.start_polling();
      jest.spyOn(window, "setInterval")
      expect(window.setInterval).toHaveBeenCalled();
    });

  })
})