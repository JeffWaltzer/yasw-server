import GamePad from "./gamePad";

export default class GamePadState {
  thrust(new_value) {
    if (new_value !== undefined)
      this._thrust = new_value;
    return this._thrust;
  }
}