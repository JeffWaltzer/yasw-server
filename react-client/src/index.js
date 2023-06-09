import './index.css';
import {Keyboard} from './keyboard.js';
import Application from "./application";

let application = new Application(document);
application.createWebsocket();
