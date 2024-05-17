import GamePadState from "./gamePadState";

export default class GamePad {

  constructor(socket) {
    this._socket = socket;
    this._old_gamepad_state = new GamePadState({});
  }

  interpret_command(new_gamepad_state) {
    this._old_gamepad_state.inner_interpret_command(new_gamepad_state, this.maybe_send.bind(this));
    this._old_gamepad_state = new_gamepad_state;
  }


  maybe_send(command) {
    if (this._old_gamepad_state[command]())
      this.sendCommand(`{\"command\":\"${command}\"}`);
  }

  sendCommand(command) {
    this.command_socket().send(command)
  }

  command_socket() {
    return this._socket;
  }

}
