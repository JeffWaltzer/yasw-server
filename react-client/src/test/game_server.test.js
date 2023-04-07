import GameServer from '../game_server'

describe('GameServer', () => {
  describe('#send', () => {
    it('sends the data to the web socket', () => {
      var data_sent = "not the data you're looking for";
      const fake_web_socket= {send: (data) => { data_sent = data; }};
      const game_server = new GameServer(fake_web_socket);
      game_server.send("some data");

      expect(data_sent).toEqual("some data");
    });
  });
});

