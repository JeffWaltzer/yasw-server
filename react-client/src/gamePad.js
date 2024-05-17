import GamePadState from "./gamePadState";

export default class GamePad {

  constructor(socket) {
    this._socket = socket;
    this._old_gamepad_state = new GamePadState({});
  }

  interpret_command(new_gamepad_state) {
    this._old_gamepad_state.interpret_command(
      new_gamepad_state,
      this.send.bind(this)
    );
    this._old_gamepad_state = new_gamepad_state;
  }

  send(command) {
    this.command_socket().send(`{\"command\":\"${command}\"}`);
  }

  command_socket() {
    return this._socket;
  }
}
