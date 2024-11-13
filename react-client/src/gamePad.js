import {GamePadState} from "./gamePadState";
import CommandTable from "./command_table";
import {ServerConnection} from "./server_connection";

const command_table = new CommandTable();

export default class GamePad {

  constructor(dom_gamepad = {}) {
    console.log('GamePad:constructor', dom_gamepad);
    this._dom_gamepad = dom_gamepad;
    this._old_gamepad_state = new GamePadState(dom_gamepad);
  }

  update() {
    console.log('GamePad:update', this._dom_gamepad)
    const new_state = new GamePadState(this.dom_gamepad());
    this.interpret_command(new_state);
  }

  interpret_command(new_gamepad_state) {
    command_table.interpret_command(this._old_gamepad_state, new_gamepad_state, this.send.bind(this));
    this._old_gamepad_state = new_gamepad_state;
  }

  send(command) {
    this.server_connection().send(`{\"command\":\"${command}\"}`);
  }

  server_connection(serverConnection) {
    if(serverConnection) {
      this._server_connection = serverConnection;
      this._server_connection.stop_updates();
    }
    return this._server_connection;
  }

  create_server_connection() {
    this._server_connection = new ServerConnection();
    this._server_connection.stop_updates();
  }

  id() {
    return this._dom_gamepad.id;
  }

  dom_gamepad() {
    return this._dom_gamepad;
  }
}
