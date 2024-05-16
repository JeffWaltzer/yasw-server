import GamePadState from "./gamePadState";

export default class GamePad {

  constructor(socket) {
    this._socket = socket;
    this._old_gamepad_state = new GamePadState({});
  }

  interpret_command(new_gamepad_state) {
    this._new_gamepad_state = new_gamepad_state;

    [
      'thrust_off',
      'thrust_on',
      'fire',
      'rotate_left',
      'rotate_right',
      'rotate_stop',
    ].forEach((command) => {
      this.maybe_send(command);
    });

    this._old_gamepad_state = new_gamepad_state;
  }


  maybe_send(command) {
    if (this[command]())
      this.sendCommand(`{\"command\":\"${command}\"}`);
  }

  rotate_stop() {
    return !this._old_gamepad_state.stopped() && this._new_gamepad_state.stopped();
  }

  rotate_right() {
    return !this._old_gamepad_state.rotating_right() && this._new_gamepad_state.rotating_right();
  }

  rotate_left() {
    return !this._old_gamepad_state.rotating_left() && this._new_gamepad_state.rotating_left();
  }

  fire() {
    return !this._old_gamepad_state.fire() && this._new_gamepad_state.fire();
  }

  thrust_on() {
    return !this._old_gamepad_state.thrust() && this._new_gamepad_state.thrust();
  }

  thrust_off() {
    return this._old_gamepad_state.thrust() && !this._new_gamepad_state.thrust();
  }

  sendCommand(command) {
    this.command_socket().send(command)
  }

  command_socket() {
    return this._socket;
  }

}
