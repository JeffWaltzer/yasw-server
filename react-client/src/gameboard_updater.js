class GameboardUpdater {
  constructor(websocket) {
    this._websocket = websocket;
    websocket.onmessage = this.on_message;

    console.log(`GameboardUpdater: this: ${JSON.stringify(this, null, 4)}`);
  }

  sid() {
    this._sid;
  }

  on_message() {
  }
}

export default GameboardUpdater;
