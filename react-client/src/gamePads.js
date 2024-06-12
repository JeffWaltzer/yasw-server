import GamePad from './gamePad.js';

export class GamePads {

  static _active = [];

  start_polling() {
    setInterval(GamePads.poll, 30)
  };

  static poll() {
    this._active = navigator.getGamepads().map((dom_gamepad) => {
      const new_gamepad = new GamePad(dom_gamepad);
      new_gamepad.create_socket();

      return new_gamepad;
    });
  }
}
