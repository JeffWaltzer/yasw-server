import GameboardUpdater from '../gameboard_updater';
import GameServer from '../game_server';

describe("GameboardUpdater", () => {
  it("sets an onmessage callback on the websocket", () => {
    const fake_websocket = {};
    const gameboard_updater = new GameboardUpdater(fake_websocket);

    expect(fake_websocket.onmessage).toBeDefined();
    expect(fake_websocket.onmessage.toString()).toEqual(gameboard_updater.on_message.bind(gameboard_updater).toString());
  });

  it("sets the sid from the first message", () => {
    const fake_websocket = {
    };

    const game_server = new GameServer(fake_websocket);
    const updater = new GameboardUpdater(fake_websocket, game_server);

    fake_websocket.onmessage({data: "0{\"sid\": 31416}"});

    expect(game_server.sid()).toEqual("31416");
  });

});
