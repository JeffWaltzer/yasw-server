import Message from "./message";
import GameServer from "./game_server";
import {Keyboard} from "./keyboard";

export default class Application {
  constructor(document) {
    this._document = document;
  }

  createWebsocket() {
    try {
      this._socket = new WebSocket(`ws://${window.location.host}/engine.io/?EIO=3&transport=websocket`);

      this._game_server = new GameServer(this._socket);
      this._keyboard_state = new Keyboard(this.game_server());

      this._keyboard_state.hookup();

      this._socket.onopen = (event) => {
        this._socket.onmessage = this.dispatch_message.bind(this);
      };

      this._socket.onerror = this.on_error;
      this._socket.onclose = this.on_close;

    } catch (e) {
      console.log(`error: ${e}`);
    }
  }

  socket() {
    return this._socket;
  }

  game_server() {
    return this._game_server;
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
