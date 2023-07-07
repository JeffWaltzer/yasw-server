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

  it("can be instantiated", () => {
    expect(new Application(fake_document, context_for_spyon.FakeWebSocket)).toBeDefined();
  });

  describe('#run', () => {

    it('catches errors', () => {
      jest.spyOn(application(), 'build_websocket').mockImplementation(() => {
        throw 'hell';
      })
      expect(() => application().run()).not.toThrow('hell')
    });
  });

  describe('#build_websocket', () => {
    it("creates a websocket", () => {
      jest.spyOn(context_for_spyon, 'FakeWebSocket');
      application().build_websocket();
      expect(context_for_spyon.FakeWebSocket).toHaveBeenCalled();
    });
  });
})
