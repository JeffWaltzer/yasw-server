import Application from '../application';
import Message from '../message';

const context_for_spyon = {
  FakeWebSocket: () => {
  }
};

describe('Application', () => {
  let fake_document;
  let application;

  beforeEach(() => {
    fake_document = {}
    application = () => new Application(fake_document, context_for_spyon.FakeWebSocket);
  })

  describe('#run', () => {
    //TODO make a non negative version of this test.
    it('catches errors', () => {
      const application1 = application();
      jest.spyOn(application1, 'build_websocket').mockImplementation(() => {
        throw 'hell';
      })
      expect(() => application1.run()).not.toThrow('hell')
    });

    describe('sets up application', () => {
      let the_application;
      let fake_keyboard;

      beforeEach(() => {
        the_application = application();
        jest.spyOn(the_application, 'build_websocket').mockImplementation(() => {
        })
        jest.spyOn(the_application, 'build_game_server')
        fake_keyboard = {
          hookup: () => {
          }
        };
        jest.spyOn(the_application, 'build_keyboard').mockImplementation(() => {
          return fake_keyboard;
        })
        jest.spyOn(fake_keyboard, 'hookup')

        jest.spyOn(the_application, 'build_gamepads');

        the_application.run()
      })

      it('calls build_websocket', () => {
        expect(the_application.build_websocket).toHaveBeenCalled();
      });

      it('calls build_websocket', () => {
        expect(the_application.build_game_server).toHaveBeenCalled();
      });

      it('calls build_websocket', () => {
        expect(the_application.build_keyboard).toHaveBeenCalled();
      });

      it('calls build_websocket', () => {
        expect(fake_keyboard.hookup).toHaveBeenCalled();
      });

      it('calls build_gamepads', () => {
        expect(the_application.build_gamepads).toHaveBeenCalled();
      });
    })

  });

  describe('#build_websocket', () => {
    it("creates a websocket", () => {
      jest.spyOn(context_for_spyon, 'FakeWebSocket');
      application().build_websocket();
      expect(context_for_spyon.FakeWebSocket).toHaveBeenCalled();
    });
  });

    describe('#dispatch_message', () => {
      describe('a type 0 message', () => {
        let the_application;
        let the_game_server;

        beforeEach(() => {
          const raw_message = {
            data: '0' + JSON.stringify({
              sid: 'this is a fine sid',
            }),
          };

          the_application = application();
          the_application._game_server = the_application.build_game_server();
          the_game_server = the_application.game_server();
          the_application.dispatch_message(raw_message);
        });

        it('sets the game server sid', () => {
          expect(the_game_server.sid()).toEqual('this is a fine sid');
        });
      });

      describe('a type 4 message', () => {
        let the_application;
        let the_game_server;
        let message;

        beforeEach(() => {
          const raw_message = {
            data: '4' + JSON.stringify({
            }),
          };
          message = new Message(raw_message);

          the_application = application();
          the_application._game_server = the_application.build_game_server();
          the_game_server = the_application.game_server();
          jest.spyOn(the_game_server, 'render_gameboard').mockImplementation(() => {});

          the_application.dispatch_message(raw_message);
        });

        it('renders the gameboard', () => {
          expect(the_game_server.render_gameboard).toHaveBeenCalledWith(message);
        });
      });
    });
})
