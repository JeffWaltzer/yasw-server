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
    this.root ||= this.create_root();
    this.render_payload(this.root,message);
  }

  create_root() {
    return ReactDOM.createRoot(document.getElementById('root'));
  }

  render_payload(root,payload) {
    if (payload) {
      root.render(
        <React.StrictMode>
          <Gameboard gameboard={payload}/>
        </React.StrictMode>
      );
    }
  }

  send(data) {
    const message = JSON.stringify(
      {
        command: data
      }
    )
    this.websocket.send(message)
  }
}

export default GameServer;
