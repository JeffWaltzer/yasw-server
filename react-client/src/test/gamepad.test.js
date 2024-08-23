import Gamepad from "../gamePad";
import {FIRE_BUTTON, LEFT_BUTTON, RIGHT_BUTTON, THRUST_BUTTON} from "../gamePadState";
import GamePad from "../gamePad";
import {make_buttons} from "./make_buttons";
import {GamePads} from "../gamePads";

describe('Gamepad', () => {
  let gamepad;
  let buttons;

  beforeEach(() => {
    buttons = Array(50).fill('').map(() => {
      return {pressed: false};
    });
    gamepad = new Gamepad({buttons: buttons});
  });

  describe("a newly created GamePad", () => {
    const fake_socket = {'bogus': 'dude'};
    let real_location;

    beforeEach(() => {
      jest.spyOn(global, 'WebSocket');

      global.WebSocket = jest.fn();
      global.WebSocket.mockImplementation(function () {
        return fake_socket;
      });

      real_location = window.location;
      delete window.location;
      window.location = {
        hostname: "somewhere.over.com",
        port: 31416,
      };
    });

    afterEach(() => {
      window.location = real_location;
    });

    it('connects the new gamepad', () => {
      const new_gamepad = new GamePad({id: 'C', buttons: make_buttons()});
      new_gamepad.create_server_connection();
      expect(new_gamepad.server_connection().websocket()).toEqual(fake_socket);
    });

    it('saves game pad id', () => {
      const new_gamepad = new GamePad({id: 'C', buttons: make_buttons()});
      expect(new_gamepad.id()).toEqual('C');
    });

    it("sets the websocket's url correctly", () => {
      const new_gamepad = new GamePad({id: 'C', buttons: make_buttons()});
      new_gamepad.create_server_connection();
      new_gamepad.server_connection().websocket();
      expect(global.WebSocket).toHaveBeenCalledWith("ws://somewhere.over.com:31416/engine.io/?EIO=3&transport=websocket");
    });
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

