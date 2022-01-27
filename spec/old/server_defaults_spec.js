(function() {
  var ship, yasw;

  yasw = require('./../../src/yasw_server');

  ship = require('./../../src/ship');

  describe("server initialization", function() {
    var server;
    server = void 0;
    beforeEach(function() {
      return server = yasw.createServer();
    });
    it("sets the ship_rotation_rate", function() {
      return expect(ship.Ship.rotation_rate).toEqual(Math.PI);
    });
    it("sets the tick_rate", function() {
      return expect(server.tick_rate).toEqual(1);
    });
    it("sets the acceleration_rate", function() {
      return expect(ship.Ship.acceleration_rate).toEqual(1);
    });
    it("sets the top_edge", function() {
      return expect(server.field_size.y()).toEqual(600);
    });
    it("sets the right_edge", function() {
      return expect(server.field_size.x()).toEqual(800);
    });
    it("sets the bullet_speed", function() {
      return expect(ship.Ship.bullet_speed).toEqual(10);
    });
    it("sets bullet life time", function() {
      return expect(ship.Ship.bullet_lifetime).toEqual(4);
    });
    return afterEach(function() {
      return server = void 0;
    });
  });

}).call(this);
