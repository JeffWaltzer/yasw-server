// import {render} from '@testing-library/react'
// import '@testing-library/jest-dom'
import GameServer from '../game_server'

describe('GameServer', () => {
  it('can be instantiated', () => {
    const game_server = new GameServer();

    expect(game_server).not.toBeNull();
  });

  describe('#send', () => {
    var data_sent = "not the data you're looking for";

    it('sends the data to the web socket', () => {
      const fake_web_socket= {send: (data) => { data_sent = data; }};
      const game_server = new GameServer(fake_web_socket);
      game_server.send("some data");

      expect(data_sent).toEqual("some data");
    });
  });
});

