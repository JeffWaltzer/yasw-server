import GamePadState from "./gamePadState";

export default class GamePad {

  constructor(socket) {
    this._socket = socket;
    this._old_gamepad_state = new GamePadState({});
  }

  interpret_command(new_gamepad_state) {
    if (this.stop_thrust(new_gamepad_state))
      this.sendCommand("{\"command\":\"thrust_off\"}");

    if (this.start_thrust(new_gamepad_state))
      this.sendCommand("{\"command\":\"thrust_on\"}")

    if (this.fire(new_gamepad_state))
      this.sendCommand("{\"command\":\"fire\"}");

    if (this.start_rotating_left(new_gamepad_state))
      this.sendCommand("{\"command\":\"rotate_left\"}");

    if (this.start_rotating_right(new_gamepad_state))
      this.sendCommand("{\"command\":\"rotate_right\"}");

    if (this.stop_rotating(new_gamepad_state))
      this.sendCommand("{\"command\":\"rotate_stop\"}");

    this._old_gamepad_state = new_gamepad_state;
  }


  stop_rotating(new_gamepad_state) {
    return !this._old_gamepad_state.stopped() && new_gamepad_state.stopped();
  }

  start_rotating_right(new_gamepad_state) {
    return !this._old_gamepad_state.rotating_right() && new_gamepad_state.rotating_right();
  }

  start_rotating_left(new_gamepad_state) {
    return !this._old_gamepad_state.rotating_left() && new_gamepad_state.rotating_left();
  }

  fire(new_gamepad_state) {
    return !this._old_gamepad_state.fire() && new_gamepad_state.fire();
  }

  start_thrust(new_gamepad_state) {
    return !this._old_gamepad_state.thrust() && new_gamepad_state.thrust();
  }

  stop_thrust(new_gamepad_state) {
    return this._old_gamepad_state.thrust() && !new_gamepad_state.thrust();
  }

  sendCommand(command) {
    this.command_socket().send(command)
  }

  command_socket() {
    return this._socket;
  }

}
