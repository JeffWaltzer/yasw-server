class GameboardUpdater {
  constructor(websocket, game_server) {
    this._websocket = websocket;
    this._game_server = game_server;
    websocket.onmessage = this.on_message.bind(this);
  }

  on_message(message) {
    const message_json = message.data.slice(1);
    this._game_server.sid(JSON.parse(message_json).sid);
  }
}

export default GameboardUpdater;
