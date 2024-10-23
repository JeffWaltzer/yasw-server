import {ServerConnection} from "../server_connection";

describe("ServerConnection", () => {
  let real_location;

  beforeEach(() => {
    real_location = window.location;
    delete window.location;
    window.location = {
      hostname: "somewhere.over.com",
      port: 31416,
    };
  });

  afterEach(() => {
    window.location = real_location;
  });

  describe("#url()", () => {
    it("sets the websocket's url correctly", () => {
      expect(new ServerConnection().url()).toEqual("ws://somewhere.over.com:31416/engine.io/?EIO=3&transport=websocket");
    });
  });

  describe("#send", () => {
    it("sends the message to the websocket", () => {
      let fake_websocket = {
        send: () => {}
      };

      jest.spyOn(fake_websocket, 'send').mockImplementation(() => {});

      const connection = new ServerConnection();
      connection._websocket = fake_websocket;
      connection.send("something");
      expect(fake_websocket.send).toHaveBeenCalledWith("something");
    });
  });

  describe("#stop_updates", () => {
    it("sends the message to the websocket", () => {
      let fake_websocket = {
        send: () => {}
      };

      jest.spyOn(fake_websocket, 'send').mockImplementation(() => {});

      const connection = new ServerConnection();
      connection._websocket = fake_websocket;

      connection.stop_updates();

      expect(fake_websocket.send).toHaveBeenCalledWith("stop-screen-updates");
    });
  });

  describe("#websocket", () => {
    const fake_socket = {}

    beforeEach(() => {
      jest.spyOn(global, 'WebSocket');

      global.WebSocket = jest.fn();
      global.WebSocket.mockImplementation(function () {
        return fake_socket;
      });
    });

    it("sets the  url correctly", () => {
      const server_connection = new ServerConnection()
      server_connection.websocket();
      expect(global.WebSocket).toHaveBeenCalledWith("ws://somewhere.over.com:31416/engine.io/?EIO=3&transport=websocket");
    });
  });

  describe("#stop_updates", () => {
    beforeEach(() => {
      const fake_socket = { send: () => {}}

      jest.spyOn(global, 'WebSocket');

      global.WebSocket = jest.fn();
      global.WebSocket.mockImplementation(function () {
        return fake_socket;
      });
    });

    it("sends stop-screen-updates", () => {
      const server_connection = new ServerConnection();
      jest.spyOn(server_connection, "send");
      server_connection.stop_updates();

      expect(server_connection.send).toHaveBeenCalledWith('stop-screen-updates')
    })
  });
});
