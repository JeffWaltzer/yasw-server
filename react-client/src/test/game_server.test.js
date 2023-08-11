import GameServer from '../game_server'

describe('GameServer', () => {
  describe('#render_gameboard', () => {
    let game_server;
    let fake_root;
    let fake_payload;
    let fake_message;

    beforeEach(() => {
      game_server = new GameServer({})
      fake_root = {
        render: () => {
          return {}
        }
      };
      fake_payload = {};

      fake_message = {
        payload: () => {
          return fake_payload
        }
      }
      jest.spyOn(game_server, 'create_root').mockImplementation(() => {
        return fake_root;
      })

      jest.spyOn(game_server, 'render_payload').mockImplementation(() => {
      })

      game_server.render_gameboard(fake_message);
    })

    it('calls create_root ', () => {
      expect(game_server.root).toBe(fake_root)
    })

    it('calls render_payload ', () => {
      expect(game_server.render_payload).toHaveBeenCalledWith(fake_root, fake_payload)
    })
  })

  describe('#render_payload', () => {
    it('calls render on root', () => {
      const game_server = new GameServer({})

      const root = {
        render: () => {
        }
      }
      const payload = {}

      jest.spyOn(root, 'render')

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
