export class ServerConnection {
  url(host = window.location.hostname, port = window.location.port) {
    return `ws://${window.location.hostname}:${port}/engine.io/?EIO=3&transport=websocket`;
  };

  websocket() {
    if (!this._websocket) {
      this._websocket = new global.WebSocket(this.url());
    }
    return this._websocket;
  }

  send() {
  }
}