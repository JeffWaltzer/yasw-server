export class ServerConnection {
  url(host = window.location.hostname) {
    return `ws://${host}/engine.io/?EIO=3&transport=websocket`;
  };
}


