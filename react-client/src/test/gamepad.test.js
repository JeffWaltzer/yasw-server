import Gamepad from "../gamePad";
import {FIRE_BUTTON, LEFT_BUTTON, RIGHT_BUTTON, THRUST_BUTTON} from "../gamePadState";

describe('Gamepad', () => {
  let gamepad;
  let buttons;

  beforeEach(() => {
    buttons = Array(50).fill('').map(() => { return {pressed: false}; });
    gamepad = new Gamepad({buttons: buttons});
  });

  describe("Initial button states", function () {
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

  describe("Initial button states", function () {
    it("start fire down", function () {
      buttons[FIRE_BUTTON] = {pressed: true};
      
      const gamepad = new Gamepad({buttons: buttons});
      expect(gamepad._old_gamepad_state._fire).toBeTruthy();
    });

    it("start thrust down", function () {
      buttons[THRUST_BUTTON] = {pressed: true};

      const gamepad = new Gamepad({buttons: buttons});
      expect(gamepad._old_gamepad_state._thrust).toBeTruthy();
    });

    it("start rotate right down", function () {
      buttons[RIGHT_BUTTON] = {pressed: true};

      const gamepad = new Gamepad({buttons: buttons});
      expect(gamepad._old_gamepad_state._right).toBeTruthy();
    });

    it("start rotate left down", function () {
      buttons[LEFT_BUTTON] = {pressed: true};
      
      const gamepad = new Gamepad({buttons: buttons});
      expect(gamepad._old_gamepad_state._left).toBeTruthy();
    });
  });



})

