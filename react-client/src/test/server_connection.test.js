import {ServerConnection} from "../server_connection";
import {make_buttons} from "./make_buttons";
import {GamePads} from "../gamePads";

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
});
