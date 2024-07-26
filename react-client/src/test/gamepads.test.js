import {GamePads} from "../gamePads";
import GamePad from "../gamePad";
import {make_buttons} from "./make_buttons";

describe('Gamepads', () => {
  it("starts with empty list of gamepads", () => {
    expect(GamePads._active).toEqual([]);
  });

  describe("#poll", () => {
    beforeEach(() => {
      navigator.getGamepads = () => {
        throw "shouldn't happen; dummy function called";
      };
    });

   const fake_socket = {'bogus': 'dude'};

   beforeEach(() => {
     global.WebSocket = jest.fn();
     global.WebSocket.mockImplementation(function () {
       return fake_socket;
     });
   });

   describe("When we have a gamepad and lost it", () => {
     beforeEach(()=>{
       jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
         return [];
       });
       GamePads._active= [
           new GamePad({buttons: make_buttons()}),
       ];
     });

     it('notices', () => {
       expect(GamePads._active.length).toEqual(1);
       GamePads.poll();
       expect(GamePads._active.length).toEqual(0);
     });
   });

   describe("When we have a gamepad and see a 2nd gamepad", () => {
     beforeEach(()=>{
       jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
           return [
                {id: 'A', buttons: make_buttons()},
                {id: 'B', buttons: make_buttons()}
            ];
        });

        GamePads._active=[new GamePad({buttons: make_buttons()})];
        GamePads.poll();
      });

      it('we see both gamepads', () => {
        expect(GamePads._active.length).toEqual(2);
      });
    });

    describe("When we have no gamepads", () => {
      beforeEach(()=>{
        jest.spyOn(navigator, "getGamepads").mockImplementation(() => {
          return [{id: 'C', buttons: make_buttons()}];
        });
        jest.spyOn(navigator, 'WebSocket');
        GamePads.poll();
      });

      it('notices a new gamepad', () => {
        expect(GamePads._active.length).toEqual(1);
      });

      it('connects the new gamepad', () => {
        expect(GamePads._active[0].command_socket()).toEqual(fake_socket);
      });

      it('saves game pad id', () => {
        expect(GamePads._active[0].id()).toEqual('C');
      });

      it("sets the websocket's url correctly", () => {
        expect(global.WebSocket).toHaveBeenCalledWith("something or other");
      });
    });
  });

  describe('#start_polling', () => {
    beforeEach(() => {
      jest.useFakeTimers('legacy');
      const the_gamepads = new GamePads();
      the_gamepads.start_polling();
      jest.spyOn(window, "setInterval");
    });

    it('sets timer', () => {
      expect(window.setInterval).toHaveBeenCalledWith(GamePads.poll, 30);
    });
  });
});

