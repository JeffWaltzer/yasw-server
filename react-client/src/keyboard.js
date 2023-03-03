export default class Keyboard {
  constructor(game_server) {
    this.left_key = "up";
    this.right_key = "up";
    this.thrust_key = "up";
    this.fire_key = "up";
    this.game_server = game_server;
  }

  onKeyUp(keycode) {
    if(keycode===40){
      if(this.thrust_key==='down') {
        this.game_server.send('thrust_off');
      }
      this.thrust_key= "up";
    } else {
      this.fire_key= "up";
    }

  }

  onKeyDown(key_code) {
    if (this.fire_key === 'up') {
      this.game_server.send("fire");
      this.fire_key ="down"
    }
  }
};
