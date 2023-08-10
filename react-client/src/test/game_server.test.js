import GameServer from '../game_server'

describe('GameServer', () => {

  describe('#render_payload', () => {
    it('calls render on root', () => {
      const game_server = new GameServer({})

      const root = {render: () =>{}}
      const payload = {}

      jest.spyOn(root,'render')

      game_server.render_payload(root, payload)
      expect(root.render).toHaveBeenCalled()
    })
  })


  describe('#send', () => {


    it('sends the data to the web socket', () => {
      let data_sent = "not the data you're looking for";
      const fake_web_socket = {
        send: (data) => {
          data_sent = data;
        }
      };
      const game_server = new GameServer(fake_web_socket);
      game_server.sid('fakesid');
      game_server.send("some data");

      expect(data_sent).toEqual('4{"sid":"fakesid","command":"some data"}');
    });
  });
});
