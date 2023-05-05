class GameServer {
  constructor(websocket) {
    this.websocket = websocket;
    this.sid = null;
  }

  send(data) {
    data.sid = this.sid;
    this.websocket.send(data)
  }
};

export default GameServer;
