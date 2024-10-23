import GamePad from './gamePad.js';

export class GamePads {
    static _active = [];

    start_polling() {
        setInterval(GamePads.poll, 30)
    };

    static poll() {
        this._active = navigator.getGamepads().map((dom_gamepad) => {
            const new_gamepad = new GamePad(dom_gamepad);
            new_gamepad.server_connection();

            return new_gamepad;
        });
    }

  static on_gamepadconnected(connect_event) {
    this._active.push(new GamePad(connect_event.gamepad));
  }

  static on_gamepad_disconnect() {
  }
}
