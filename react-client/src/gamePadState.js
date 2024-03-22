import GamePad from "./gamePad";

export default class GamePadState {

  constructor(args) {
    this._thrust = args.thrust === undefined ? false : args.thrust;
    this._fire = args.fire === undefined ? false : args.fire;
    this._right = args.right === undefined ? false : args.right;
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
    // return this._right;
  }
}