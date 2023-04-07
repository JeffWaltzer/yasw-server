import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Gameboard from './Gameboard';
import GameServer from './game_server.js';
import Keyboard from './keyboard.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function on_error(error) {
  console.log(`error: ${error}`);
};

function gameboard_json(the_message) {
  return the_message.data.slice(1)
};

function render_gameboard(the_message) {
  root.render(
    <React.StrictMode>
      <Gameboard gameboard={gameboard_json(the_message)}/>
    </React.StrictMode>
  );
};


let exampleSocket;
try {
  exampleSocket = new WebSocket(`ws://${window.location.host}/engine.io/?EIO=3&transport=websocket`);

  exampleSocket.onopen = (event) => {
    exampleSocket.onmessage = render_gameboard;
  };

  exampleSocket.onerror = on_error;
}
catch (e) {
  console.log(`error: ${e}`);
}

const game_server = new GameServer(exampleSocket);
const keyboard_state = new Keyboard(game_server);

function onKeyDown(event) {
  keyboard_state.onKeyDown(event.key_code);
}

function onKeyUp(event) {
  keyboard_state.onKeyUp(event.key_code);
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
