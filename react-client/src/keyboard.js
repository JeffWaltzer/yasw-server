 const THRUST_KEY = 40;
 const FIRE_KEY = 32;
 const LEFT_KEY = 37;
 const RIGHT_KEY = 39;
 const CLONE_KEY = "KeyS";

 class Keyboard {
  constructor(game_server) {
    this.left_key = "up";
    this.right_key = "up";
    this.thrust_key = "up";
    this.fire_key = "up";
    this.game_server = game_server;
  }

  onKeyUp(keycode) {
    if(keycode===THRUST_KEY){
      if(this.thrust_key==='down') {
        this.game_server.send('thrust_off');
      }
      this.thrust_key= "up";
    } else {
      this.fire_key= "up";
    }
    if (keycode===RIGHT_KEY) {
      if (this.left_key === "down" && this.right_key === "down")
        this.game_server.send("rotate_left");
      else if (this.left_key === "up" && this.right_key === "down")
        this.game_server.send("rotate_stop");
      this.right_key='up';
    }
    if (keycode===LEFT_KEY) {
      if (this.left_key === "down" && this.right_key === "down")
        this.game_server.send("rotate_right");
      else if (this.left_key === "down" && this.right_key === "up")
        this.game_server.send("rotate_stop");
      this.left_key='up';
    }
  }

  onKeyDown(key_code) {
    console.log(`onKeyDown(${key_code})`)
    if (key_code===THRUST_KEY) {
      if (this.thrust_key === 'up') {
        this.game_server.send("thrust_on");
        this.thrust_key = "down"
      }
    }
    if (key_code===FIRE_KEY) {
      if (this.fire_key === 'up') {
        this.game_server.send("fire");
        this.fire_key = "down"
      }

    }
    if (key_code===LEFT_KEY) {
      if (this.left_key === "up" && this.right_key === "down")
        this.game_server.send("rotate_stop");
      else if (this.left_key === "up" && this.right_key === "up") {
        this.game_server.send("rotate_left");
      }
      this.left_key = 'down';
    }

    if (key_code===CLONE_KEY) {
      console.log("CLONE KEY HIT");
      this.game_server.send("clone");
    }
    if (key_code===RIGHT_KEY) {
      if (this.left_key === "down" && this.right_key === "up")
        this.game_server.send("rotate_stop");
      else if (this.left_key === "up" && this.right_key === "up") {
        this.game_server.send("rotate_right");
      }
      this.right_key = 'down';
    }

  }
};

 export {Keyboard, THRUST_KEY,FIRE_KEY,LEFT_KEY,RIGHT_KEY,CLONE_KEY}
