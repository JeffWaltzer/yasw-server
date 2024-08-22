import {GamePadState} from "./gamePadState";
import CommandTable from "./command_table";
import {ServerConnection} from "./server_connection";

const command_table = new CommandTable();

export default class GamePad {

  constructor(dom_gamepad = {}) {
    this._old_gamepad_state = new GamePadState(dom_gamepad);
    this._id = dom_gamepad.id;
  }

  interpret_command(new_gamepad_state) {
    command_table.interpret_command(this._old_gamepad_state, new_gamepad_state, this.send.bind(this));
    this._old_gamepad_state = new_gamepad_state;
  }

  send(command) {
    this.server_connection().send(`{\"command\":\"${command}\"}`);
  }

  server_connection() {
      return this._socket;
  }

  create_socket() {
    this._socket = new ServerConnection();
  }

  id() {
    return this._id;
  }
}
