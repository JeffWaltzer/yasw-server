import ReactDOM from "react-dom/client";
import React from 'react';
import './index.css';
import Gameboard from './Gameboard';

class GameServer {
  constructor(websocket) {
    this.websocket = websocket;
    this._sid = null;
  }

  sid(new_value) {
    if (new_value)
      this._sid = new_value;
    return this._sid;
  }

  render_gameboard(message) {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    if (message.payload()) {
      root.render(
        <React.StrictMode>
          <Gameboard gameboard={message.payload()}/>
        </React.StrictMode>
      );
    }
  }


  send(data) {
    const message = JSON.stringify(
      {
        sid: this.sid(),
        command: data
      }
    )
    const packet_type = '4';
    this.websocket.send(packet_type + message)
  }
}

export default GameServer;
