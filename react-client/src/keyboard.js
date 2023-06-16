 const THRUST_KEY = "ArrowDown";
 const FIRE_KEY = "Space";
 const LEFT_KEY = "ArrowLeft";
 const RIGHT_KEY = "ArrowRight";
 const CLONE_KEY = "KeyS";

 class Keyboard {
  constructor(game_server) {
    this.left_key = "up";
    this.right_key = "up";
    this.thrust_key = "up";
    this.fire_key = "up";
    this.game_server = game_server;
  }

  onKeyUp(event) {
    const keycode = event.code
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

  onKeyDown(event) {
    const keycode = event.code
    if (keycode===THRUST_KEY) {
      if (this.thrust_key === 'up') {
        this.game_server.send("thrust_on");
        this.thrust_key = "down"
      }
    }
    if (keycode===FIRE_KEY) {
      if (this.fire_key === 'up') {
        this.game_server.send("fire");
        this.fire_key = "down"
      }

    }
    if (keycode===LEFT_KEY) {
      if (this.left_key === "up" && this.right_key === "down")
        this.game_server.send("rotate_stop");
      else if (this.left_key === "up" && this.right_key === "up") {
        this.game_server.send("rotate_left");
      }
      this.left_key = 'down';
    }

    if (keycode===CLONE_KEY) {
      this.game_server.send("clone");
    }
    if (keycode===RIGHT_KEY) {
      if (this.left_key === "down" && this.right_key === "up")
        this.game_server.send("rotate_stop");
      else if (this.left_key === "up" && this.right_key === "up") {
        this.game_server.send("rotate_right");
      }
      this.right_key = 'down';
    }

  }

   hookup() {
     document.addEventListener('keydown', (event)=>{
       this.onKeyDown(event.code)
     });
     document.addEventListener('keyup',  (event)=> {
       this.onKeyUp(event.code)
     })
   }

}

 export {Keyboard, THRUST_KEY,FIRE_KEY,LEFT_KEY,RIGHT_KEY,CLONE_KEY}
