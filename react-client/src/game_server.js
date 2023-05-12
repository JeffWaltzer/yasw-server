class GameServer {
  constructor(websocket) {
    this.websocket = websocket;
    this.sid = null;
  }

  send(data) {
    const message = JSON.stringify(
      {
        sid: this.sid,
        command: data
      }
    )
    const packet_type = '4';
    this.websocket.send(packet_type + message)
  }
}

export default GameServer;
