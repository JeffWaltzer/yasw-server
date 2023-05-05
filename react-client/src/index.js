import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Gameboard from './Gameboard';
import GameServer from './game_server.js';
import {Keyboard} from './keyboard.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const game_server = new GameServer(exampleSocket);
const keyboard_state = new Keyboard(game_server);

function on_error(error) {
  console.log("error: ", error);
};

function on_close(event) {
  console.log("close:", event);
};

function message_type(the_message) {
  the_message.data.slice(0,1)
}

function message_payload(the_message) {
  return the_message.data.slice(1)
};

function render_gameboard(the_message) {
  const message_json = message_payload(the_message);

  switch (message_type(the_message) ) {
    case '0':
      game_server.sid = JSON.parse(message_json).sid
      console.log("got sid: ", game_server.sid);
      break;

    case '4':
      {
        if (message_json) {
          root.render(
            <React.StrictMode>
              <Gameboard gameboard={message_json}/>
            </React.StrictMode>
          );
        }
      }
      break;
  }
};


let exampleSocket;
try {
  exampleSocket = new WebSocket(`ws://${window.location.host}/engine.io/?EIO=3&transport=websocket`);

  exampleSocket.onopen = (event) => {
    exampleSocket.onmessage = render_gameboard;
  };

  exampleSocket.onerror = on_error;
  exampleSocket.onclose = on_close;
}
catch (e) {
  console.log(`error: ${e}`);
}

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
