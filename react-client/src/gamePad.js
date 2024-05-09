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


      const new_left = new_gamepad_state.left();
      const new_right = new_gamepad_state.right();
      const old_left = this._old_gamepad_state.left();
      const old_right = this._old_gamepad_state.right();

      if (old_left !== new_left || old_right !== new_right) {
        if (!old_left && old_right && new_left && !new_right) {
          this.sendCommand("{\"command\":\"rotate_left\"}");
        }

        if (old_left && old_right && new_left && !new_right) {
          this.sendCommand("{\"command\":\"rotate_left\"}");
        }

        if (old_left &&               !new_left && new_right)
          this.sendCommand("{\"command\":\"rotate_right\"}");



        if (old_left && !old_right && new_left && new_right)
          this.sendCommand("{\"command\":\"rotate_stop\"}");

        if (old_left && !old_right && !new_left && !new_right)
          this.sendCommand("{\"command\":\"rotate_stop\"}");

        if (!old_left && old_right && new_left && new_right)
          this.sendCommand("{\"command\":\"rotate_stop\"}");

        if (!old_left && old_right && !new_left && !new_right)
          this.sendCommand("{\"command\":\"rotate_stop\"}");

      }


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
