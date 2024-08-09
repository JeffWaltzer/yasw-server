import {GamePadState} from "./gamePadState";
import CommandTable from "./command_table";

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
    this.command_socket().send(`{\"command\":\"${command}\"}`);
  }

  command_socket() {
    return this._socket;
  }

  create_socket() {
    const url = `ws://${window.location.hostname}:${window.location.port}/engine.io/?EIO=3&transport=websocket`;
    this._socket = new WebSocket(url);
  }

  id() {
    return this._id;
  }
}
