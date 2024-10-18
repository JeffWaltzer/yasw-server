function make_buttons(buttons_to_press=[]) {
  const buttons = Array(50).fill(0).map(() => {
    return {pressed: false};
  });
  buttons_to_press.forEach((button, button_index) => {
    buttons[button_index].pressed = true;
  });
  return buttons;
}

export { make_buttons };
