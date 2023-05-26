class GameboardUpdater {
  constructor(websocket) {
    this._websocket = websocket;
    websocket.onmessage = () => {};
  }

  sid() {
    this._sid;
  }
}

export default GameboardUpdater;
