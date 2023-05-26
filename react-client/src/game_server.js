class GameServer {
  constructor(websocket) {
    this.websocket = websocket;
    this._sid = null;
  }

  sid(new_value) {
    if (new_value)
      this._sid = new_value;
    return this._sid;
  }

  send(data) {
    const message = JSON.stringify(
      {
        sid: this.sid(),
        command: data
      }
    )
    const packet_type = '4';
    this.websocket.send(packet_type + message)
  }
}

export default GameServer;
