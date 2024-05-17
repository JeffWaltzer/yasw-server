import GamePad from "./gamePad";

export default class GamePadState {

  constructor(args) {
    this._thrust = args.thrust === undefined ? false : args.thrust;
    this._fire = args.fire === undefined ? false : args.fire;
    this._right = args.right === undefined ? false : args.right;
    this._left = args.left === undefined ? false : args.left;
  }

  interpret_command(new_gamepad_state, send_callback) {
    this._new_gamepad_state = new_gamepad_state;

    [
      'thrust_off',
      'thrust_on',
      'fire',
      'rotate_left',
      'rotate_right',
      'rotate_stop',
    ].forEach((command) => {
      if (this[command]())
        send_callback(command);
    });
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


  rotate_stop() {
    return !this.stopped() && this._new_gamepad_state.stopped();
  }

  rotate_right() {
    return !this.rotating_right() && this._new_gamepad_state.rotating_right();
  }

  rotate_left() {
    return !this.rotating_left() && this._new_gamepad_state.rotating_left();
  }

  fire() {
    return !this._fire && this._new_gamepad_state._fire;
  }

  thrust_on() {
    return !this._thrust && this._new_gamepad_state._thrust;
  }

  thrust_off() {
    return this._thrust && !this._new_gamepad_state._thrust;
  }
}
