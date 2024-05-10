import GamePad from "./gamePad";

export default class GamePadState {

  constructor(args) {
    this._thrust = args.thrust === undefined ? false : args.thrust;
    this._fire = args.fire === undefined ? false : args.fire;
    this._right = args.right === undefined ? false : args.right;
    this._left = args.left === undefined ? false : args.left;
  }

  thrust() {
    return this._thrust;
  }

  fire() {
    return this._fire;
  }

  right() {
    return this._right;
  }

  left() {
    return this._left;
  }

  rotating_left() {
    return this.left() && !this.right();
  }

  rotating_right() {
    return !this.left() && this.right();
  }

  stopped() {
    return this.left() === this.right();
  }

}