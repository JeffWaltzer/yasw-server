export default class GamePad {

  constructor(socket) {
    this._socket=socket;
    this._thrust=false;
    this._last_gamepad_state =
      {
        thrust: false,
      };
  }

  interpret_command(new_gamepad) {
    if (this._last_gamepad_state && this._last_gamepad_state.thrust && !new_gamepad.thrust())
      this.command_socket().send("{\"command\":\"thrust_off\"}")
    this._last_gamepad_state.thrust = new_gamepad.thrust();
  }

  command_socket() {
    return this._socket;
  }

  thrust(new_value=undefined) {
    if (new_value !== undefined)
      this._thrust = new_value;
    return this._thrust;
  }
}