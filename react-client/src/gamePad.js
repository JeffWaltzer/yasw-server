import GamePadState from "./gamePadState";

export default class GamePad {

  constructor(socket) {
    this._socket = socket;
    this._old_gamepad_state = new GamePadState({});
  }

  maybe_send(new_gamepad_state, command) {
    if (this[command](new_gamepad_state))
      this.sendCommand(`{\"command\":\"${command}\"}`);
  }

  interpret_command(new_gamepad_state) {
    this.maybe_send(new_gamepad_state, 'thrust_off');
    this.maybe_send(new_gamepad_state, 'thrust_on');
    this.maybe_send(new_gamepad_state, 'fire');
    this.maybe_send(new_gamepad_state, 'rotate_left');
    this.maybe_send(new_gamepad_state, 'rotate_right');
    this.maybe_send(new_gamepad_state, 'rotate_stop');

    this._old_gamepad_state = new_gamepad_state;
  }


  rotate_stop(new_gamepad_state) {
    return !this._old_gamepad_state.stopped() && new_gamepad_state.stopped();
  }

  rotate_right(new_gamepad_state) {
    return !this._old_gamepad_state.rotating_right() && new_gamepad_state.rotating_right();
  }

  rotate_left(new_gamepad_state) {
    return !this._old_gamepad_state.rotating_left() && new_gamepad_state.rotating_left();
  }

  fire(new_gamepad_state) {
    return !this._old_gamepad_state.fire() && new_gamepad_state.fire();
  }

  thrust_on(new_gamepad_state) {
    return !this._old_gamepad_state.thrust() && new_gamepad_state.thrust();
  }

  thrust_off(new_gamepad_state) {
    return this._old_gamepad_state.thrust() && !new_gamepad_state.thrust();
  }

  sendCommand(command) {
    this.command_socket().send(command)
  }

  command_socket() {
    return this._socket;
  }

}
