import GameServer from "./game_server";
import {Keyboard} from "./keyboard";
import {GamePads} from "./gamePads";
import {ServerConnection} from "./server_connection"

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
      window.addEventListener("gamepadconnected", GamePads.on_gamepad_connect)
      window.addEventListener("gamepaddisconnected", GamePads.on_gamepad_disconnect)
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
    const web_socket = new this._websocket_implementation(new ServerConnection().url());
    web_socket.onopen = (event) => {
      web_socket.onmessage = (function (the_message) {
        this._game_server.render_gameboard(the_message.data);
      }).bind(this);
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
  on_error(error) {
    console.log("error: ", error);
  }

  on_close(event) {
    console.log("close:", event);
  }

}
