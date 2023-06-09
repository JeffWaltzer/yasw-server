import './index.css';
import {Keyboard} from './keyboard.js';
import Application from "./application";

let application = new Application();
application.createWebsocket();
const keyboard_state = new Keyboard(application.game_server());

function onKeyDown(event) {
  keyboard_state.onKeyDown(event.code);
}

function onKeyUp(event) {
  keyboard_state.onKeyUp(event.code);
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
