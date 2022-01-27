(function() {
  var Game, Ship, player, yasw;

  yasw = require('./../../src/yasw_server');

  Ship = require('./../../src/ship').Ship;

  player = require('./../../src/player');

  Game = require('./../../src/game').Game;

  describe("connecting to the server", function() {
    var fake_socket, server;
    server = void 0;
    fake_socket = void 0;
    beforeEach(function() {
      server = yasw.createServer();
      spyOn(server.game.game_field, 'add_screen_object').andCallThrough();
      fake_socket = {};
      fake_socket.send = function() {};
      fake_socket.on = function() {};
      return server.on_new_websocket(fake_socket);
    });
    it("calls server#add_screen_object", function() {
      return expect(server.game.game_field.add_screen_object).toHaveBeenCalled();
    });
    it('associates ship with socket', function() {
      return expect(server.game.players[0].ship).toBeDefined();
    });
    return it('creates a player', function() {
      return expect(server.game.players[0].socket).toEqual(fake_socket);
    });
  });

  describe("connecting to the server twice", function() {
    var server, socket1, socket2;
    server = void 0;
    socket1 = void 0;
    socket2 = void 0;
    beforeEach(function() {
      var create_fake_socket;
      server = yasw.createServer();
      spyOn(server.game.game_field, 'add_screen_object').andCallThrough();
      create_fake_socket = function() {
        var fake_socket;
        fake_socket = {};
        fake_socket.send = function() {};
        fake_socket.on = function() {};
        server.on_new_websocket(fake_socket);
        return fake_socket;
      };
      socket1 = create_fake_socket();
      return socket2 = create_fake_socket();
    });
    it('has two ships', function() {
      return expect(server.game.game_field.ships().length).toEqual(2);
    });
    describe("the first ship", function() {
      return it(`is ${Game.player_colors[0]}`, function() {
        return expect(server.game.game_field.ships()[0].color()).toEqual(Game.player_colors[0]);
      });
    });
    describe("the second ship", function() {
      return it(`is ${Game.player_colors[1]}`, function() {
        return expect(server.game.game_field.ships()[1].color()).toEqual(Game.player_colors[1]);
      });
    });
    it("calls server#add_screen_object", function() {
      return expect(server.game.game_field.add_screen_object.callCount).toEqual(2);
    });
    it('associates ship with socket', function() {
      return expect(server.game.players[0].ship).toBeDefined();
    });
    it('associates ship with other socket', function() {
      return expect(server.game.players[1].ship).toBeDefined();
    });
    it('creates a player', function() {
      return expect(server.game.players[0].socket).toEqual(socket1);
    });
    return it('creates a player', function() {
      return expect(server.game.players[1].socket).toEqual(socket2);
    });
  });

}).call(this);
