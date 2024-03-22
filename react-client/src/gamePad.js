import GamePadState from "./gamePadState";

export default class GamePad {

  constructor(socket) {
    this._socket = socket;
    this._old_gamepad_state = new GamePadState({});
  }

  interpret_command(new_gamepad_state) {
    if (this._old_gamepad_state) {
      if (this._old_gamepad_state.thrust() && !new_gamepad_state.thrust())
        this.sendCommand("{\"command\":\"thrust_off\"}");
      if (!this._old_gamepad_state.thrust() && new_gamepad_state.thrust())
        this.sendCommand("{\"command\":\"thrust_on\"}")
      if (!this._old_gamepad_state.fire() && new_gamepad_state.fire())
        this.sendCommand("{\"command\":\"fire\"}");
      if (this._old_gamepad_state.right() && !new_gamepad_state.right() )
        this.sendCommand("{\"command\":\"rotate_left\"}");
    }
    this._old_gamepad_state = new_gamepad_state;
  }

  sendCommand(command) {
    this.command_socket().send(command)
  }

  command_socket() {
    return this._socket;
  }

}