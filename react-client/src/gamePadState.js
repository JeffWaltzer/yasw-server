import GamePad from "./gamePad";
import CommandTable from "./command_table";

const command_table = new CommandTable();

export default class GamePadState {
  constructor(args) {
    this._thrust = args.thrust === undefined ? false : args.thrust;
    this._fire = args.fire === undefined ? false : args.fire;
    this._right = args.right === undefined ? false : args.right;
    this._left = args.left === undefined ? false : args.left;
  }

  interpret_command(new_gamepad_state, send_callback) {
    command_table.interpret_command(this, new_gamepad_state, send_callback);
  }

  rotating_left() {
    return this._left && !this._right;
  }

  rotating_right() {
    return !this._left && this._right;
  }

  stopped() {
    return this._left === this._right;
  }
}
