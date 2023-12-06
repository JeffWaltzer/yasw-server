import {GamePads} from "../gamePads";

describe('Gamepads', () => {
  describe('#start_polling', () => {

    beforeEach(()=>{
      jest.useFakeTimers('legacy');
      const the_gamepads = new GamePads();
      the_gamepads.start_polling();
      jest.spyOn(window, "setInterval")
    })
    it('sets timer', () => {
      expect(window.setInterval).toHaveBeenCalledWith(GamePads.poll,30);
    });

  })
})