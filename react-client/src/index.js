import React from 'react';
import './index.css';
import Gameboard from './Gameboard';
import GameServer from './game_server.js';
import {Keyboard} from './keyboard.js';
import reportWebVitals from './reportWebVitals';
import Message from './message'


let exampleSocket;
try {
  exampleSocket = new WebSocket(`ws://${window.location.host}/engine.io/?EIO=3&transport=websocket`);

  exampleSocket.onopen = (event) => {
    exampleSocket.onmessage = dispatch_message;
  };

  exampleSocket.onerror = on_error;
  exampleSocket.onclose = on_close;
}
catch (e) {
  console.log(`error: ${e}`);
}

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
