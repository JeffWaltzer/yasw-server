import GameboardUpdater from '../gameboard_updater';

describe("GameboardUpdater", () => {
  it("sets an onmessage callback on the websocket", () => {
    const fake_websocket = {
    };

    const websocket = new GameboardUpdater(fake_websocket);

    expect(fake_websocket.onmessage).toBeDefined();
  });

  xit("sets the sid from the first message", () => {
    const fake_websocket = {
    };

    const updater = new GameboardUpdater(fake_websocket);

    fake_websocket.onmessage("0{\"sid\": 31416}");

    expect(updater.sid()).toEqual("31416");
  });

});
