import Message from "./message";

export default class Application {
  constructor(game_server) {
    this._game_server = game_server;
  }

  createWebsocket() {
    try {
      this._socket = new WebSocket(`ws://${window.location.host}/engine.io/?EIO=3&transport=websocket`);

      this._socket.onopen = (event) => {
        this._socket.onmessage = this.dispatch_message;
      };

      this._socket.onerror = this.on_error;
      this._socket.onclose = this.on_close;
      return this._socket;
    } catch (e) {
      console.log(`error: ${e}`);
    }
  }

  socket() {
    return this._socket;
  }

  dispatch_message(the_message) {
    const message = new Message(the_message)

    switch (message.type()) {
      case '0':
        this._game_server.sid(JSON.parse(message.payload()).sid);
        console.log("got sid: ", this._game_server.sid());
        break;

      case '4':
        this._game_server.render_gameboard(message);
        break;
    }
  }

  on_error(error) {
    console.log("error: ", error);
  }

  on_close(event) {
    console.log("close:", event);
  }
}
