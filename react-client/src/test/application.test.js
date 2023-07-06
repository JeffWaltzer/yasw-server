import Application from '../application';


const context_for_spyon = {
  FakeWebSocket: () => {
  }
};

describe('Application', () => {
  it("can be instantiated", () => {
    let fake_document = {};
    expect(new Application(fake_document, context_for_spyon.FakeWebSocket)).toBeDefined();
  });

  describe('#run', () => {
    it('catches errors', () => {
      let fake_document = {};
      const application = new Application(fake_document, context_for_spyon.FakeWebSocket);
      jest.spyOn(application, 'build_websocket').mockImplementation(()=> {
        throw 'hell';
      })
      expect(() => application.run()).not.toThrow('hell')
    });
  });

  describe('#build_websocket', () => {
    it("creates a websocket", () => {
      let fake_document = {};
      jest.spyOn(context_for_spyon, 'FakeWebSocket');
      (new Application(fake_document, context_for_spyon.FakeWebSocket)).build_websocket();

      expect(context_for_spyon.FakeWebSocket).toHaveBeenCalled();
    });
  });
})
