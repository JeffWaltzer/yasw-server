export default class CommandTable {
  interpret_command(old_gamepad_state, new_gamepad_state, send_callback) {
    [
      'thrust_off',
      'thrust_on',
      'fire',
      'rotate_left',
      'rotate_right',
      'rotate_stop',
    ].forEach((command) => {
      this.do(command, old_gamepad_state, new_gamepad_state, send_callback);
    });
  }

  do(command, old_gamepad_state, new_gamepad_state, send_callback) {
    if (this[command](old_gamepad_state, new_gamepad_state))
      send_callback(command);
  }

  thrust_off(old_state, new_state) {
    return old_state._thrust && !new_state._thrust;
  }
  
  thrust_on(old_state, new_state)
  {
    return !old_state._thrust && new_state._thrust;
  }
  
  fire(old_state, new_state)
  {
    return !old_state._fire && new_state._fire;
  }
  
  rotate_left(old_state, new_state){
    return !old_state.rotating_left() && new_state.rotating_left();
  }
  
  rotate_right(old_state, new_state) {
    return !old_state.rotating_right() && new_state.rotating_right();
  }
  
  rotate_stop(old_state, new_state) {
    return !old_state.stopped() && new_state.stopped();
  }
}

