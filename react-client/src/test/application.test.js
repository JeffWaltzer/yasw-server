import Application from '../application';

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

    })

  });

  describe('#build_websocket', () => {
    it("creates a websocket", () => {
      jest.spyOn(context_for_spyon, 'FakeWebSocket');
      application().build_websocket();
      expect(context_for_spyon.FakeWebSocket).toHaveBeenCalled();
    });
  });
})
