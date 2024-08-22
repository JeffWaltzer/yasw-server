export class ServerConnection {
  constructor() {
    this._websocket = new global.WebSocket(this.url());
  }
  url(host = window.location.hostname, port = window.location.port) {
     return `ws://${window.location.hostname}:${port}/engine.io/?EIO=3&transport=websocket`;
  };

  send() {}
}