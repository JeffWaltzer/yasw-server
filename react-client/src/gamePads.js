export class GamePads {

  static _active = [];

  start_polling() {
    setInterval(GamePads.poll, 30)
  };

  static poll() {
  }
}
