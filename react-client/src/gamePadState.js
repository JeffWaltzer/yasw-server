import GamePad from "./gamePad";

export default class GamePadState {

  constructor(args) {
    this._thrust = args.thrust === undefined ? false : args.thrust;
    this._fire = args.fire === undefined ? false : args.fire;
  }

  thrust() {
    return this._thrust;
  }

  fire() {
    return this._fire;
  }
}