import {ServerConnection} from "../server_connection";
import {make_buttons} from "./make_buttons";
import {GamePads} from "../gamePads";
import GamePad from "../gamePad";

describe("ServerConnection", () => {
  describe("#url()", () => {
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

    it("sets the websocket's url correctly", () => {
      expect(new ServerConnection().url()).toEqual("ws://somewhere.over.com:31416/engine.io/?EIO=3&transport=websocket");
    });
  });

  describe("#send", () => {
    it("sends the message to the websocket", () => {
      let fake_websocket = {send: () => {}};
      jest.spyOn(fake_websocket, 'send').mockImplementation(() => {});

      const connection = new ServerConnection();
      connection._websocket = fake_websocket;
      connection.send("something");
      expect(fake_websocket.send).toHaveBeenCalledWith("something");
    });
  });

  describe("websocket", () => {

    const fake_socket = {

    }

    let real_location;

    beforeEach(() => {
      jest.spyOn(global, 'WebSocket');

      global.WebSocket = jest.fn();
      global.WebSocket.mockImplementation(function () {
        return fake_socket;
      });

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

    it("sets the  url correctly", () => {
      const server_connection = new ServerConnection()
      server_connection.websocket();
      expect(global.WebSocket).toHaveBeenCalledWith("ws://somewhere.over.com:31416/engine.io/?EIO=3&transport=websocket");
    });

  })

});
