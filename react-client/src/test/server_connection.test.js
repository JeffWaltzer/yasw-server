import {ServerConnection} from "../server_connection";
import {make_buttons} from "./make_buttons";
import {GamePads} from "../gamePads";

describe("ServerConnection", () => {
  let real_location;

  beforeEach(()=>{
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
