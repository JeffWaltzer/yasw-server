import Message from "./message";
import GameServer from "./game_server";
import {Keyboard} from "./keyboard";

export default class Application {
  constructor(document, websocket_implementation) {
    this._document = document;
		this._websocket_implementation = websocket_implementation;
  }

  run() {
    try {
      this._socket = this.build_websocket();
      this._game_server = new GameServer(this._socket);
      this._keyboard_state = new Keyboard(this.game_server());
      this._keyboard_state.hookup();
    } catch (e) {
      console.log(`error: ${e}`);
    }
  }

  build_websocket() {
    const web_socket = new this._websocket_implementation(`ws://${window.location.host}/engine.io/?EIO=3&transport=websocket`);
    web_socket.onopen = (event) => {
      web_socket.onmessage = this.dispatch_message.bind(this);
    };
    web_socket.onerror = this.on_error;
    web_socket.onclose = this.on_close;

    return web_socket;
  }

  socket() {
    return this._socket;
  }

  game_server() {
    return this._game_server;
  }

  dispatch_message(the_message) {
    const message = new Message(the_message);

    switch (message.type()) {
      case '0':
        this._game_server.sid(JSON.parse(message.payload()).sid);
        console.log("got sid: ", this._game_server.sid());
        break;

      case '4':
        this._game_server.render_gameboard(message);
        break;

      default:
        console.log("We can't be here");
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
