import GamePad from "./gamePad";

export default class GamePadState {

  constructor(args) {
    this._thrust = args.thrust === undefined ? false : args.thrust;
    this._fire = args.fire === undefined ? false : args.fire;
    this._right = args.right === undefined ? false : args.right;
    this._left = args.left === undefined ? false : args.left;
  }

  thrust() {
    return this._thrust;
  }

  fire_down() {
    return this._fire;
  }

  right() {
    return this._right;
  }

  left() {
    return this._left;
  }

  rotating_left() {
    return this.left() && !this.right();
  }

  rotating_right() {
    return !this.left() && this.right();
  }

  stopped() {
    return this.left() === this.right();
  }

  inner_interpret_command(new_gamepad_state, send_callback) {
    this._new_gamepad_state = new_gamepad_state;

    [
      'thrust_off',
      'thrust_on',
      'fire',
      'rotate_left',
      'rotate_right',
      'rotate_stop',
    ].forEach((command) => {
      send_callback(command);
    });
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
    return !this.fire_down() && this._new_gamepad_state.fire_down();
  }

  thrust_on() {
    return !this.thrust() && this._new_gamepad_state.thrust();
  }

  thrust_off() {
    return this.thrust() && !this._new_gamepad_state.thrust();
  }
}
