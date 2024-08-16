export class ServerConnection {
  url(host = window.location.hostname, port = window.location.port) {
    return `ws://${window.location.hostname}:${port}/engine.io/?EIO=3&transport=websocket`;
  };
}