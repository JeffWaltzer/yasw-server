import GamePad from './gamePad.js';
import {GamePadState} from "./gamePadState";

export class GamePads {
    static _active = [];

    start_polling() {
        setInterval(GamePads.poll, 30)
    };

    static poll() {
      GamePads._active.forEach((gamepad) => {
        gamepad.update();
      });
    }

  static on_gamepad_connect(connect_event) {
    GamePads._active.push(new GamePad(connect_event.gamepad));
  }

  static on_gamepad_disconnect() {
  }
}
