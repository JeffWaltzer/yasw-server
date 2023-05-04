class GameServer {
  constructor(websocket) {
    this.websocket = websocket;
  }

  send(data) {
    this.websocket.send(data)
  }
};

export default GameServer;
