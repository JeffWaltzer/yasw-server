import GamePad from "./gamePad";

class CommandTable {
  commands = {
    'thrust_off': (old_state, new_state) =>    { return old_state._thrust && !new_state._thrust; },
    'thrust_on': (old_state, new_state) =>     { return !old_state._thrust && new_state._thrust; },
    'fire': (old_state, new_state) =>          { return !old_state._fire && new_state._fire; },
    'rotate_left': (old_state, new_state) =>   { return !old_state.rotating_left() && new_state.rotating_left(); },
    'rotate_right': (old_state, new_state) =>  { return !old_state.rotating_right() && new_state.rotating_right(); },
    'rotate_stop': (old_state, new_state) =>   { return !old_state.stopped() && new_state.stopped(); },
  };

  do(command, old_gamepad_state, new_gamepad_state, send_callback) {
    if (this.commands[command](old_gamepad_state, new_gamepad_state))
      send_callback(command);
  }

  interpret_command(old_gamepad_state, new_gamepad_state, send_callback) {
    Object.keys(command_table.commands).forEach((command) => {
      this.do(command, old_gamepad_state, new_gamepad_state, send_callback);
    });
  }

}

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
