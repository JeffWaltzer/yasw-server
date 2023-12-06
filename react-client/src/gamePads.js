export class GamePads {
  start_polling() {
    setInterval(GamePads.poll, 30)
  };

  static poll() {
  }
}
