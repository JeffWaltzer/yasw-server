import Gamepad from "../gamePad";
import {FIRE_BUTTON, LEFT_BUTTON, RIGHT_BUTTON, THRUST_BUTTON} from "../gamePadState";
import GamePad from "../gamePad";
import {make_buttons} from "./make_buttons";
import {ServerConnection} from "../server_connection";

describe('Gamepad', () => {
  let gamepad;
  let buttons;
  let fake_socket = { send: () => {} }

  beforeEach(() => {
    buttons = Array(50).fill('').map(() => {
      return {pressed: false};
    });
    gamepad = new Gamepad({buttons: buttons});
  });

  describe("#server_connection", () => {

    let fake_server_connection = {'bogus': 'dude'};

    beforeEach(() => {
      jest.spyOn(global, 'WebSocket');

      global.WebSocket = jest.fn();
      global.WebSocket.mockImplementation(function () {
        return fake_socket;
      });

      global.ServerConnection = jest.fn();
      global.ServerConnection.mockImplementation(function () {
        console.log("returning fake server connection");
        return fake_server_connection;
      });
    });

    it('connects the new gamepad', () => {
      let server_connection={
        stop_updates: () => {}
      };
      gamepad.server_connection(server_connection);
      expect(gamepad.server_connection()).toEqual(server_connection);
    });

    it('turns off drawing updates', ()=>{
      fake_server_connection= {
        stop_updates: () => {}
      };

      jest.spyOn(server_connection,"stop_updates")

      gamepad.server_connection(server_connection);

      expect(fake_server_connection.stop_updates).toHaveBeenCalled();
    });

  })

  describe("a newly created GamePad", () => {
    it('saves game pad id', () => {
      const new_gamepad = new GamePad({id: 'C', buttons: make_buttons()});
      expect(new_gamepad.id()).toEqual('C');
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

