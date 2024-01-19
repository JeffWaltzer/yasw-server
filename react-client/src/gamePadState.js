import GamePad from "./gamePad";

export default class GamePadState {

  constructor(args) {
    this._thrust = args.thrust === undefined ? false : args.thrust;
  }

  thrust() {
    return this._thrust;
  }
}