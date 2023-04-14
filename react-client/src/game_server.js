class GameServer {
  constructor(websocket) {
    this.websocket = websocket;
  }

  send(data) {
    console.log(data);
    this.websocket.send(data)
  }
};

export default GameServer;
