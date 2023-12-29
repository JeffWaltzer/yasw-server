export default class GamePad {

  constructor(socket) {
    this._socket = socket;
    this._thrust = false;
    this._last_gamepad_state =
      {
        thrust: false,
      };
  }

  interpret_command(new_gamepad) {
    if (this._last_gamepad_state) {
      if (this._last_gamepad_state.thrust && !new_gamepad.thrust())
        this.sendCommand("{\"command\":\"thrust_off\"}");
      if (!this._last_gamepad_state.thrust && new_gamepad.thrust())
        this.sendCommand("{\"command\":\"thrust_on\"}")
    }
    this._last_gamepad_state.thrust = new_gamepad.thrust();
  }

  sendCommand(command) {
    this.command_socket().send(command)
  }

  command_socket() {
    return this._socket;
  }

  thrust(new_value = undefined) {
    if (new_value !== undefined)
      this._thrust = new_value;
    return this._thrust;
  }
}