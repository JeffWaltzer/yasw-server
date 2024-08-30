import Gamepad from "../gamePad";
import {FIRE_BUTTON, LEFT_BUTTON, RIGHT_BUTTON, THRUST_BUTTON} from "../gamePadState";
import GamePad from "../gamePad";
import {make_buttons} from "./make_buttons";
import {ServerConnection} from "../server_connection";

describe('Gamepad', () => {
  let gamepad;
  let buttons;

  beforeEach(() => {
    buttons = Array(50).fill('').map(() => {
      return {pressed: false};
    });
    gamepad = new Gamepad({buttons: buttons});
  });

  describe("#create_server_connection", () => {

    const fake_server_connection = {'bogus': 'dude'};

    beforeEach(() => {
      global.ServerConnection = jest.fn();
      global.ServerConnection.mockImplementation(function () {
        return fake_server_connection;
      });
    });

    it('connects the new gamepad', () => {
      gamepad.create_server_connection();
      expect(gamepad.server_connection()).toBeInstanceOf(ServerConnection);
    });

    it('turns off drawing updates', ()=>{
      let server_connection={
        stop_updates: () => {}
      };

      jest.spyOn(server_connection,"stop_updates")

      ServerConnection = jest.fn();
      ServerConnection.mockImplementation(function () {
        return fake_server_connection;
      });

      gamepad.create_server_connection();

      expect(server_connection.stop_updates).toHaveBeenCalled();
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

