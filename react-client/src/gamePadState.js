export default class GamePad {

  constructor(socket) {
    this._socket = socket;
    this._thrust = false;
    this._old_gamepad_state =
      {
        thrust: false,
      };
  }

  interpret_command(new_gamepad_state) {
    if (this._old_gamepad_state) {
      if (this._old_gamepad_state.thrust && !new_gamepad_state.thrust())
        this.sendCommand("{\"command\":\"thrust_off\"}");
      if (!this._old_gamepad_state.thrust && new_gamepad_state.thrust())
        this.sendCommand("{\"command\":\"thrust_on\"}")
    }
    this._old_gamepad_state.thrust = new_gamepad_state.thrust();
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