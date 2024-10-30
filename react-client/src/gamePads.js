import GamePad from './gamePad.js';
import {GamePadState} from "./gamePadState";

export class GamePads {
    static _active = [];

    start_polling() {
        setInterval(GamePads.poll, 30)
    };

    static poll() {
      const dom_gamepads = navigator.getGamepads();

      console.log(`dom_gamepads: ${dom_gamepads}`);
      console.log(`GamePads._active: ${GamePads._active}`);

      this._active.forEach((gamepad, index) => {
        gamepad.interpret_command(new GamePadState((dom_gamepads[index])));
      });
    }

  static on_gamepad_connect(connect_event) {
    this._active.push(new GamePad(connect_event.gamepad));
  }

  static on_gamepad_disconnect() {
  }
}
