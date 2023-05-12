class GameServer {
  constructor(websocket) {
    this.websocket = websocket;
    this.sid = null;
  }

  send(data) {
    const send_value =  JSON.stringify(
      {
        sid:    this.sid      ,
        command: data
      }
      )
    this.websocket.send('4'+send_value)
  }
};

export default GameServer;
