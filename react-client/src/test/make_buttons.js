function make_buttons(buttons_to_press=[]) {
  return Array(50).fill(0).map((button, index) => {
    return {pressed: buttons_to_press.includes(index)};
  });
}

export { make_buttons };
