import GamePad from "../gamePad";
import Gamepad from "../gamePad";

describe('Gamepad', () => {


  describe("Initial button states", function () {
    let gamepad;
    let buttons;

    beforeEach(() => {
      buttons = Array(50).map(() => { return {pressed: false}; });
      gamepad = new Gamepad({buttons: buttons});
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

  describe("Initial button states", function () {
    beforeEach(() => {
      buttons = Array(50).map(() => { return {pressed: false}; });
      gamepad = new Gamepad({buttons: buttons});
    });
    
   xit("start fire down", function () {
      const gamepad = new Gamepad({buttons: [{pressed: true},{pressed: false},{pressed: false},{pressed: false}]});
      expect(gamepad._old_gamepad_state._fire).toBeTruthy();
    });

    xit("start thrust down", function () {
      const gamepad = new Gamepad({buttons: [{pressed: false},{pressed: true},{pressed: false},{pressed: false}]});
      expect(gamepad._old_gamepad_state._thrust).toBeTruthy();
    });

    xit("start rotate right down", function () {
      const gamepad = new Gamepad({buttons: [{pressed: false},{pressed: false},{pressed: true},{pressed: false}]});
      expect(gamepad._old_gamepad_state._right).toBeTruthy();
    });

    xit("start rotate left down", function () {
      const gamepad = new Gamepad({buttons: [{pressed: false},{pressed: false},{pressed: false},{pressed: true}]});
      expect(gamepad._old_gamepad_state._left).toBeTruthy();
    });
  });



})

