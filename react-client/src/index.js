import React from 'react';
import './index.css';
import GameServer from './game_server.js';
import {Keyboard} from './keyboard.js';
import Message from './message'

function createWebsocket() {
  try {
    const new_socket = new WebSocket(`ws://${window.location.host}/engine.io/?EIO=3&transport=websocket`);

    new_socket.onopen = (event) => {
      new_socket.onmessage = dispatch_message;
    };

    new_socket.onerror = on_error;
    new_socket.onclose = on_close;
    return new_socket;
  } catch (e) {
    console.log(`error: ${e}`);
  }
}

let exampleSocket = createWebsocket();
const game_server = new GameServer(exampleSocket);
const keyboard_state = new Keyboard(game_server);

function on_error(error) {
  console.log("error: ", error);
};

function on_close(event) {
  console.log("close:", event);
};


function dispatch_message(the_message) {
  const message = new Message(the_message)

  switch (message.type() ) {
    case '0':
      game_server.sid( JSON.parse(message.payload()).sid);
      console.log("got sid: ", game_server.sid());
      break;

    case '4':
      game_server.render_gameboard(message);
      break;
  }
};


function onKeyDown(event) {
  keyboard_state.onKeyDown(event.code);
}

function onKeyUp(event) {
  keyboard_state.onKeyUp(event.code);
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
