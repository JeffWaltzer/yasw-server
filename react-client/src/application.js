import Message from "./message";
import GameServer from "./game_server";
import {Keyboard} from "./keyboard";
import {GamePads} from "./gamePads";

export default class Application {
  constructor(document, websocket_implementation) {
  this._document = document;
  this._websocket_implementation = websocket_implementation;
  this._gamepads = this.build_gamepads();
  }

  run() {
    try {
      this._socket = this.build_websocket();
      this._game_server = this.build_game_server();
      this._keyboard_state = this.build_keyboard();
      this._keyboard_state.hookup();
      this._gamepads.start_polling();
    } catch (e) {
      console.log(`error: ${e}`);
    }
  }

  build_keyboard() {
    return new Keyboard(this.game_server());
  }

  build_game_server() {
    return new GameServer(this._socket);
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

  build_gamepads() {
    return new GamePads();
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
