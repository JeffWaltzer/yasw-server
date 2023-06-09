import React from 'react';
import './index.css';
import GameServer from './game_server.js';
import {Keyboard} from './keyboard.js';
import Message from './message'
import Application from "./application";

let application = new Application();
application.createWebsocket(on_close,on_error);
const game_server = new GameServer(application.socket());
const keyboard_state = new Keyboard(game_server);



function onKeyDown(event) {
  keyboard_state.onKeyDown(event.code);
}

function onKeyUp(event) {
  keyboard_state.onKeyUp(event.code);
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
