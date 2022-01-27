(function() {
  var Game, Vector;

  Game = require('../../src/game').Game;

  Vector = require('../../src/vector').Vector;

  describe("sending a game board when our player doesn't have a ship", function() {
    var fake_socket, game, message, sent_data;
    message = null;
    game = null;
    fake_socket = null;
    sent_data = null;
    beforeEach(function() {
      var the_player;
      fake_socket = {
        send: function(data) {
          return sent_data = JSON.parse(data);
        }
      };
      game = new Game();
      the_player = game.add_player();
      the_player.socket = fake_socket;
      return game.send_game_board({});
    });
    it("has screen objects", function() {
      return expect(sent_data.polygons).toEqual([]);
    });
    return it("has field size", function() {
      return expect(sent_data.field_size).toEqual([800, 600]);
    });
  });

  describe("sending the field size", function() {
    var fake_socket, game, message, sent_data;
    message = null;
    game = null;
    fake_socket = null;
    sent_data = null;
    beforeEach(function() {
      var the_player;
      fake_socket = {
        send: function(data) {
          return sent_data = JSON.parse(data);
        }
      };
      game = new Game({
        field_size: new Vector([1001, 1002])
      });
      // Smell: shouldn't need player
      the_player = game.add_player();
      the_player.socket = fake_socket;
      return game.send_game_board({});
    });
    return it("has field size", function() {
      return expect(sent_data.field_size).toEqual([1001, 1002]);
    });
  });

  describe("sending a game board when our player has a ship", function() {
    var fake_socket, game, message, sent_data, the_player, the_ship;
    message = null;
    game = null;
    fake_socket = null;
    sent_data = null;
    the_player = null;
    the_ship = null;
    beforeEach(function() {
      fake_socket = {
        send: function(data) {
          return sent_data = JSON.parse(data);
        }
      };
      game = new Game();
      the_player = game.add_player();
      the_player.socket = fake_socket;
      the_ship = game.game_field.add_ship({
        position: [201, 303]
      });
      game.connect_ship(the_player, the_ship);
      return game.send_game_board(game.game_field.game_board());
    });
    it("has one screen object", function() {
      return expect(sent_data.polygons.length).toEqual(1);
    });
    return describe("the first screen object", function() {
      var screen_object_json;
      screen_object_json = null;
      beforeEach(function() {
        return screen_object_json = sent_data.polygons[0];
      });
      it("has outline", function() {
        return expect(screen_object_json.wireframe[0].points).toEqual([[191, 313], [221, 303], [191, 293], [201, 303]]);
      });
      it("has position", function() {
        return expect(screen_object_json.position).toEqual([201, 303]);
      });
      it("has score", function() {
        return expect(screen_object_json.score).toEqual(0);
      });
      return it("is green", function() {
        return expect(screen_object_json.wireframe[0].color).toEqual('green');
      });
    });
  });

}).call(this);
