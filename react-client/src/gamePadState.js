import GamePad from "./gamePad";

const THRUST_BUTTON= 4;
const FIRE_BUTTON= 5;
const LEFT_BUTTON= 2;
const RIGHT_BUTTON= 1;

class GamePadState {
  constructor(args) {
    this._fire = args.buttons[FIRE_BUTTON].pressed;
    this._thrust = args.buttons[THRUST_BUTTON].pressed;
    this._right = args.buttons[RIGHT_BUTTON].pressed;
    this._left = args.buttons[LEFT_BUTTON].pressed;
  }

  rotating_left() {
    return this._left && !this._right;
  }

  rotating_right() {
    return !this._left && this._right;
  }

  stopped() {
    return this._left === this._right;
  }
}

export {THRUST_BUTTON, FIRE_BUTTON, LEFT_BUTTON, RIGHT_BUTTON, GamePadState}
