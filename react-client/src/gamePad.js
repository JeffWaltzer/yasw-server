import GamePadState from "./gamePadState";
import CommandTable from "./command_table";

const command_table = new CommandTable();

export default class GamePad {

  constructor(button_states = {}) {
    this._old_gamepad_state = new GamePadState(button_states);
  }

  interpret_command(new_gamepad_state) {
    command_table.interpret_command(this._old_gamepad_state, new_gamepad_state, this.send.bind(this));
    this._old_gamepad_state = new_gamepad_state;
  }

  send(command) {
    this.command_socket().send(`{\"command\":\"${command}\"}`);
  }

  command_socket() {
    return this._socket;
  }

  create_socket() {
    this._socket = new WebSocket("ws://example.com");
  }
}
