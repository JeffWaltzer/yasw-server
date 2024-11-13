import GamePad from './gamePad.js';
import {GamePadState} from "./gamePadState";

export class GamePads {
    static _active = [];

    start_polling() {
        setInterval(GamePads.poll, 30)
    };

    static poll() {
      console.log('poll')  //DEBUG DEBUG
      GamePads._active.forEach((gamepad, index) => {
        gamepad.update();
      });
    }

  static on_gamepad_connect(connect_event) {
    console.log('GamePads.active (S)', GamePads._active)
    GamePads._active.push(new GamePad(connect_event.gamepad));
    console.log('GamePads.active (E)', GamePads._active)
  }

  static on_gamepad_disconnect() {
  }
}
